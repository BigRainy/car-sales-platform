const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/car.middleware')

const { upload, create, update, remove, restore, findAll, findOne } = require('../controller/car.controller')



const router = new Router({ prefix: '/car' })

// 汽车图片上传接口
router.post('/upload', upload)

// 发布汽车信息接口
router.post('/', auth, create)

// 修改汽车信息接口
router.put('/:id', auth, update)

// 软删除汽车信息接口
router.post('/:id/off', auth, remove)
// 汽车上架接口
router.post('/:id/on', auth, restore)

router.get('/', findAll)

// 根据汽车编号查询汽车

router.get('/one', findOne)
module.exports = router

