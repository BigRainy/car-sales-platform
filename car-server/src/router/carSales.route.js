const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { create, update, remove, restore, findAll, findOne } = require('../controller/carSales.controller')



const router = new Router({ prefix: '/carSales' })

// 上传销售信息接口
router.post('/', create)

// 修改信息接口
router.put('/:id', update)

// 信息上架下架接口

router.post('/:id/off', remove)

router.post('/:id/on', restore)

// 获取信息列表
router.get('/', findAll)

router.get('/one', findOne)

module.exports = router