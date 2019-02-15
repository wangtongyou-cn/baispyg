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
        <el-input placeholder="请输入内容" v-model="query"  class="searchInput">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
         <el-button type="success" plain>添加用户</el-button>
      </el-rol>
    </el-row>
  </el-card>
</template>

<script>
export default {
    data() {
        return {
            query: ''
        }
    }
};
</script>

<style>
.box {
  height: 100%;
}
.search{
    margin-top: 20px;
}
.searchInput{
    width: 350px;
}
</style>
