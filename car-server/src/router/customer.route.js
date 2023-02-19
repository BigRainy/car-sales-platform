const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { create, update, remove, restore, findAll, findOne } = require('../controller/customer.controller')

const router = new Router({ prefix: '/customer' })

// 客户信息上传接口
router.post('/', create)

// 修改客户信息接口
router.put('/:id', update)

// 删除客户信息接口
router.post('/:id/off', remove)
router.post('/:id/on', restore)

// 获取客户信息列表列表
router.get('/', findAll)

// 根据客户编号获取客户信息
router.get('/one', findOne)


module.exports = router