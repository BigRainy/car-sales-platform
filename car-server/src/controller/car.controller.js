const path = require('path')

const {
  fileUploadError,
  unSupportedFileType,
  publishCarError,
  invalidCarID,
  NotFindCarById
} = require('../constant/err.type')

const {
  createCar,
  updateCar,
  removeCar,
  restoreCar,
  findCar,
  findOneCar } = require('../service/car.service')

class CarController {
  async upload(ctx, next) {
    // console.log("---------------")
    // console.log(ctx.request.files.file)
    const { file } = ctx.request.files
    const fileTypes = ['image/jpeg', 'image/png']
    if (file) {
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit('error', unSupportedFileType, ctx)
      }
      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goods_img: path.basename(file.path)
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }


  async create(ctx, next) {
    // 直接调用service的createCar方法
    try {
      const { createdAt, updatedAt, ...res } = await createCar(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '发布汽车成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', publishGoodsError, ctx)
    }
  }


  async update(ctx) {
    try {
      const res = await updateCar(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改汽车信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidCarID, ctx)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async remove(ctx) {
    const res = await removeCar(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: "下架汽车成功",
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidCarID, ctx)
    }
  }

  async restore(ctx) {
    console.log(111)
    const res = await restoreCar(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '上架商品成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidCarID, ctx)
    }
  }

  async findAll(ctx) {
    // 1.解析pageNum和pageSize
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    // 2.调用数据处理的相关方法
    const res = await findCar(pageNum, pageSize)
    ctx.body = {
      code: 0,
      message: '获取汽车列表成功',
      result: res
    }
  }

  async findOne(ctx, next) {
    try {
      const { car_id } = ctx.request.query

      console.log(car_id)
      const { createdAt, updatedAt, deletedAt, ...res } = await findOneCar(car_id)
      if (res) {
        ctx.body = {
          code: 0,
          message: '获取汽车信息成功',
          result: res
        }
      } else {
        return ctx.app.emit('error', NotFindCarById, ctx)
      }
    } catch (err) {
      // console.error(err)
      return ctx.app.emit('error', NotFindCarById, ctx)
    }

  }
}

module.exports = new CarController()