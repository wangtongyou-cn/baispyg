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
      <el-rol>
        <el-input placeholder="请输入内容" v-model="query" class="searchInput">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-rol>
    </el-row>
    <!-- 表格部分 -->
    <!-- el-table 表格 data 绑定数据[]
    el-table-column 控制的是列 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="usename" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="140"></el-table-column>
      <el-table-column prop="address" label="用户状态" width="140"></el-table-column>
      <el-table-column prop="address" label="操作" width="200"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: "",
      pagesize: "",
    //   表格数据
      list: []
    };
  },
  created() {
    this.getTableDate();
  },
  methods: {
    async getTableDate() {
      const res =await this.$http.get(`users?query=this.${query}&pagenum=this.${pagenum}&pagesize=this.${pagesize}`)
    }
  }
};
</script>

<style>
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
