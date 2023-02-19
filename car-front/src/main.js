import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import './assets/icon_outdoor/iconfont.css'
import './assets/css/global.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
