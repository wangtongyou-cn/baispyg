<template>
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">{{level1}}</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  // data() {
  //     return {
  //         level1: '',
  //         level2: ''
  //     };
  // },
  // data中的数据:值只能来源于本身
  props: ['level1', 'level2']
}
</script>

<style>

</style>
