const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { create, update, remove, restore, findAll, findOne } = require('../controller/staff.controller')

const router = new Router({ prefix: '/staff' })

// 员工信息上传接口
router.post('/', create)

// 修改员工信息接口
router.put('/:id', update)

// 删除员工信息接口
router.post('/:id/off', remove)
router.post('/:id/on', restore)

// 获取员工信息列表列表
router.get('/', findAll)

// 根据员工工号获取员工信息
router.get('/one', findOne)


module.exports = router