// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import moment from 'moment'
import CusBread from '@/components/cusBread.vue'
import HttpServer from './router/http'
// 所有插件都要这样用
// Vue.use(axios.js)

// Vue插件的用法
Vue.use(ElementUI)
Vue.config.productionTip = false

// 开发插件
Vue.use(HttpServer)
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
Vue.component('cusBread', CusBread)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
