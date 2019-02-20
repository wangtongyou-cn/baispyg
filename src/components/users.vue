<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜素 -->
    <el-row class="search">
      <el-col>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="searchInput"
          clearable
          @clear="getAllUser()"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
        </el-input>
        <el-button type="success" plain @click="showDiaAddUser()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格部分 -->
    <!-- el-table 表格 data 绑定数据[]
    el-table-column 控制的是列-->
    <el-table :data="list" style="width: 100%" height="350px">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <!-- 单元格内容不是prop的值  slot-scope -->
      <el-table-column label="创建日期" width="140">
        <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column prop="address" label="用户状态" width="140">
        <template slot-scope="scope">
          <!-- 开关 -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            plain
            @click="showDiaEditUser(scope.row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="delete"
            icon="el-icon-delete"
            size="mini"
            @click="showMsgBoxDele(scope.row)"
            plain
            circle
          ></el-button>
          <!-- 对勾按钮 -->
          <el-button
            @click="showDiaSetRole(scope.row)"
            type="success"
            icon="el-icon-check"
            size="mini"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2,3,4,6,8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input disabled v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="formdata">
        <el-form-item label="用户名">{{formdata.username}}</el-form-item>
        <el-form-item label="角色">
          <!-- {{selectVal}} -->
          <el-select v-model="selectVal" placeholder="请选择角色">
            <el-option label="请选择" :value="1" disabled></el-option>

            <!-- 下拉框 -->
            <el-option
              v-for="(item,i) in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: -1,
      // 下拉框用的数据
      selectVal: -1,
      currentUserid: -1,
      roles: [],
      //   表格数据
      list: [],
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      formdata: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  created () {
    this.getTableDate()
  },
  methods: {
    async setRole () {
      const res = await this.$http.put(`users/${this.currentUserid}/role`, {
        rid: this.selectVal
      })
      const {
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        this.dialogFormVisibleRole = false
      }
    },
    async showDiaSetRole (user) {
      this.currentUserid = user.id
      this.dialogFormVisibleRole = true
      this.formdata = user
      const res = await this.$http.get(`roles`)
      this.roles = res.data.data
      const res2 = await this.$http.get(`users/${user.id}`)
      this.selectVal = res2.data.data.rid
    },
    // 开关按钮修改状态
    async changeState (user) {
      // console.log(user)
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      )
      // console.log(res);
    },
    // 编辑用户
    async editUser () {
      const res = await this.$http.put(
        `users/${this.formdata.id}`,
        this.formdata
      )
      const {
        meta: { msg, status }
      } = res.data
      this.dialogFormVisibleEdit = false
      this.getTableDate()
    },
    async showDiaEditUser (user) {
      // 获取用户数据
      // this.formdata = user
      const res = await this.$http.get(`users/${user.id}`);
      this.formdata = res.data.data;
      
      this.dialogFormVisibleEdit = true
    },

    // 删除
    showMsgBoxDele (user) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${user.id}`)
          const {
            meta: { msg, status }
          } = res.data
          if (status === 200) {
            this.$message.success(msg)
            this.getTableDate()
            this.pagenum = 1
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },

    // 添加
    async addUser () {
      const res = await this.$http.post(`users`, this.formdata)
      const {
        meta: { msg, status }
      } = res.data
      if (status === 201) {
        this.dialogFormVisibleAdd = false
        this.getTableDate()
      }
    },
    // 添加用户-打开对话框
    showDiaAddUser () {
      this.dialogFormVisibleAdd = true
      this.formdata = {}
    },
    // 搜索
    getAllUser () {
      this.getTableDate()
    },
    searchUser () {
      this.pagenum = 1
      this.getTableDate()
    },
    async getTableDate () {
      // 登录请求之外的请求都需要授权,发请求之前需要设置请求头
      // ContentType:text/html;
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      )
      // console.log(res);
      // 渲染数据
      const {
        data,
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        this.list = data.users
        this.total = data.total
      }
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagenum = 1
      this.pagesize = val
      this.getTableDate()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getTableDate()
    }
  }
}
</script>

<style>
.page {
  margin-top: 20px;
}
.box {
  height: 100%;
}
.search {
  margin-top: 20px;
}
.searchInput {
  width: 350px;
}
</style>
]
