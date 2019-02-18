<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
    <el-button class="btn" type="primary">添加角色</el-button>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
      this.getRoles()
  },
  methods: {
      async getRoles() {
          const res = await this.$http.get(`roles`)
          console.log(res)
          const{meta:{msg,status},data}=res.data;
          if(status === 200) {
              this.roles=data;
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
</style>
