<template>
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="19" class="middle">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" class="logout" @click="handleLoginout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
<<<<<<< HEAD
      <el-aside class="aside" width="200px">
        <el-menu
=======
      <!-- <el-aside width="200px" class="aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#fff"
          text-color="black"
          active-text-color="#ffd04b"
>>>>>>> dev-rights
          :unique-opened="true"
          :router="true"
          default-active="2"
          class="el-menu-vertical-demo"
        >
<<<<<<< HEAD
          <!-- 1 -->
=======
>>>>>>> dev-rights
          <el-submenu :index="item1.order+''" v-for="(item1,i) in menus" :key="item1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
<<<<<<< HEAD
=======
            <el-menu-item-group>
              <el-menu-item
                :index="item2.path+''"
                v-for="(item2,i) in item1.children"
                :key="item2.id"
              >
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside> -->

      <el-aside class="aside" width="200px">
        <el-menu
          :unique-opened="true"
          :router="true"
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-submenu :index="item1.order+''" v-for="(item1,i) in menus" :key="item1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
>>>>>>> dev-rights

            <el-menu-item
              :index="item2.path+''"
              v-for="(item2,i) in item1.children"
              :key="item2.id"
            >
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    };
  },
<<<<<<< HEAD
  // 如果用户没登录 ->if(!token)-> 改标识this.$router.push->显示login.vue
  // 如果登录了 -> if(token)->继续渲染home.vue
  // 代码位置: 什么情况下?执行if else?  -> 组件渲染完成->Vue加载完组件后 ->

  // 页面加载之前
  // beforeCreate() {

  // },
  // created
  beforeMount() {
    // 判断token有没有代码要放在另外位置
  },
=======
  // 检查用户是否登录 token
  beforeMount() {},
>>>>>>> dev-rights
  mounted() {},
  created() {
    this.getMenus();
  },
  methods: {
    // 动态导航
    async getMenus() {
<<<<<<< HEAD
      // admin登录 -> 保存了后台返回的admin的主管角色的token
      // laowang38登录->保存了后台返回的laowang38的超级管理员角色的token

      const res = await this.$http.get(`menus`);
      console.log(res);
=======
      const res = await this.$http.get(`menus`);
      console.log(res)
>>>>>>> dev-rights
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.menus = data;
      }
    },
<<<<<<< HEAD
    // 退出
    handleLoginout() {
      // 1. 清除token
      localStorage.clear();
      // 2. 来到登录
      this.$router.push({
        name: "login"
      });
      // 3. 提示
      this.$message.warning("退出成功");
=======

    handleLoginout() {
      localStorage.clear();
      this.$router.push({
        name: "login"
      });
      this.$message.warning("已退出");
>>>>>>> dev-rights
    }
  }
};
</script>

<style>
.container {
  height: 100%;
  background-color: #b3c0d1;
}

.main {
  background-color: #e9eef3;
  /* height: 100%; */
}
.middle {
  line-height: 60px;
  text-align: center;
  color: #ffffff;
}
.logout {
  line-height: 60px;
  text-decoration: none;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>