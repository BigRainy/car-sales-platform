const Router = require('koa-router')



const router = new Router({ prefix: '/menus' })


router.get('/', (ctx, next) => {
  ctx.body = [{
    id: 111,
    authName: "员工管理",
    path: "user",
    children: [{
      id: 112,
      authName: "员工信息",
      path: "user"
    }, {
      id: 113,
      authName: "员工考勤",
      path: "signIn"
    }]
  }, {
    id: 222,
    authName: "汽车管理",
    path: "car",
    children: [{
      id: 112,
      authName: "汽车信息",
      path: "car"
    }, {
      id: 113,
      authName: "销售信息",
      path: "carSale"
    }]
  }, {
    id: 333,
    authName: "客户管理",
    path: "customer",
    children: [{
      id: 334,
      authName: "客户信息",
      path: "customer"
    }]
  }, {
    id: 444,
    authName: "数据统计",
    path: "echart",
    children: [{
      id: 445,
      authName: "可视化表格",
      path: "echart"
    }]
  }]

})
router.get('/common', (ctx, next) => {
  ctx.body = [{
    id: 222,
    authName: "汽车管理",
    path: "car",
    children: [{
      id: 113,
      authName: "销售信息",
      path: "carSale"
    }]
  }, {
    id: 333,
    authName: "客户管理",
    path: "customer",
    children: [{
      id: 334,
      authName: "客户信息",
      path: "customer"
    }]
  }, {
    id: 444,
    authName: "数据统计",
    path: "echart",
    children: [{
      id: 445,
      authName: "可视化表格",
      path: "echart"
    }]
  }]
})




module.exports = router