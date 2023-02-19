import Vue from 'vue'
import VueRouter from 'vue-router'

import FirstPage from '../components/FirstPage.vue'
import Login from '../components/login/Login.vue'
import Register from '../components/login/Register.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/User.vue'
import SignIn from '../components/user/SignIn.vue'
import Car from '../components/car/Car.vue'
import CarSale from '../components/car/CarSale.vue'
import Echart from '../components/echarts/Echart.vue'
import Customer from '../components/customer/Customer.vue'
import CustomerView from '../components/customerView/CustomerView.vue'
import ViewIndex from '../components/ViewIndex.vue'
import CarMessage from '../components/customerView/CarMessage.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/first-page'
}, {
  path: '/viewIndex',
  component: ViewIndex,
  redirect: '/customerView',
  children: [{
    path: '/customerView',
    component: CustomerView
  }, {
    path: '/carMessage',
    component: CarMessage
  }]
}, {
  path: '/first-page',
  component: FirstPage,
  redirect: '/login',
  children: [{
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  }]
}, {
  path: '/home',
  component: Home,
  redirect: '/welcome',
  children: [{
    path: '/welcome',
    component: Welcome
  }, {
    path: '/user',
    component: User
  }, {
    path: '/signIn',
    component: SignIn
  }, {
    path: '/car',
    component: Car
  }, {
    path: '/carSale',
    component: CarSale
  }, {
    path: '/customer',
    component: Customer
  }]
}, {
  path: '/echart',
  component: Echart
}]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to将要访问的路径
//   // from代表从哪个路径跳转而来
//   // next是一个函数，表示放行
//   // next()放行   next('/login')强制跳转
//   if (to.path === '/login' || to.path === '/register') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
