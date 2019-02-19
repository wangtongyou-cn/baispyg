import axios from 'axios'
const HttpServer = {}

HttpServer.install = function (Vue, options) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

  // 所有请求发起后,需要筛选
  axios.interceptors.request.use(function (config) {
    // console.log('请求被拦截了')
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
      config.headers['Authorization'] = AUTH_TOKEN
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  const AUTH_TOKEN = localStorage.getItem('token')
  Vue.prototype.$http = axios
}
export default HttpServer;
