<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
    <el-button class="btn" type="primary">添加角色</el-button>

    <el-table :data="roles" style="width: 100%" height="400px">
      <el-table-column type="expand" label="#" width="80">
        <template slot-scope="scope">
          <!-- 行列布局 -->
          <!-- 一级 -->
          <el-row class="level1" v-for="(item1,i) in scope.row.children" :key="item1.id">
            <el-col :span="4">
              <el-tag
                @close="deleRights(scope.row,item1)"
                closable
                type="success"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 二级 -->
            <el-col :span="20">
              <el-row class="level2" v-for="(item2,i) in item1.children" :key="item2.id">
                <el-col :span="4">
                  <el-tag
                    @close="deleRights(scope.row,item2)"
                    closable
                    type="warning"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <!-- 三级 -->
                  <el-tag
                    @close="deleRights(scope.row,item3)"
                    closable
                    type="info"
                    v-for="(item3,i) in item2.children"
                    :key="item3.id"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 如果没有权限 -->
          <el-row v-if="scope.row.children.length===0">
            <el-col>
              <span>没有权限的小垃圾~~~</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>

      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" circle plain></el-button>
          <!-- 删除按钮 -->
          <el-button type="delete" icon="el-icon-delete" size="mini" plain circle></el-button>
          <!-- 对勾按钮 -->
          <el-button
            @click="showDiaSetrights(scope.row)"
            type="success"
            icon="el-icon-check"
            size="mini"
            p
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <!-- 树形 -->
      <el-tree
        :data="treelist"
        show-checkbox
        node-key="id"
        :default-expanded-keys="arrExpand"
        :default-checked-keys="arrCheck"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      treelist: [],
      arrCheck: [],
      arrExpand: [],
      defaultProps: {
        label: "authName",
        children: "children"
      },
      dialogFormVisible: false
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    //取消权限
    async deleRights(role, rights) {
      const res = await this.$http.delete(
        `roles/${role.id}/rights/${rights.id}`
      );
      // console.log(res)
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.$message.success("删除成功");
        // this.getRoles()
        role.children = data;
      }
    },
    // 分配权限中的打开对话框
    async showDiaSetrights() {
      // 获取数据
      const res = await this.$http.get(`rights/tree`);
      console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.treelist = data;
      };
      this.dialogFormVisible = true;
    },

    async getRoles() {
      const res = await this.$http.get(`roles`);
      // console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.roles = data;
      }
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.btn {
  margin-top: 20px;
}
.level1 {
  margin-bottom: 20px;
}
.level2 {
}
</style>
