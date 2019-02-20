import Vue from 'vue'
import Router from 'vue-router'
import {
  Message
} from 'element-ui'

// import Login from '../components/login.vue'
// webpack -> @->src
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'
import Rights from '@/components/rights.vue'
import Roles from '@/components/roles.vue'
import Goodsadd from '@/components/goodsadd.vue'
import Goodslist from '../components/goodslist.vue'
Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    children: [{
        name: 'users',
        path: '/users',
        component: Users
      },
      {
        name: 'rights',
        path: '/rights',
        component: Rights
      },
      {
        name: 'roles',
        path: '/roles',
        component: Roles
      },
      {
        name: 'goodslist',
        path: '/goods',
        component: Goodslist
      },
      {
        name: 'goodsadd',
        path: '/goodsadd',
        component: Goodsadd
      }
    ]
  }, {
    name: 'login',
    path: '/login',
    component: Login
  }]
})

router.beforeEach((to, from, next) => {
  // 如果要去的是login -> next()
  if (to.name === 'login') {
    next();
  } else {
    // 如果要去的不是login ->
    //  2.1 !token -> 去登录
    const token = localStorage.getItem("token");
    if (!token) {
      //提示
      // this.$message.warning("请先登录!");->
      Message.warning("请先登录!");

      //  this.$router.push({name:'login'})
      // $router
      router.push({
        name: 'login'
      })
      return;
    }
    //  2.2 token  -> next()
    next();
  }

})

export default router;
