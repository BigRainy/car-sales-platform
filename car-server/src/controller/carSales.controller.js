

const { publishCarSalesError, invalidCarSalesID } = require('../constant/err.type')

const { createCarSales, updateCarSales, removeCarSales, restoreCarSales, findCarSales, findOneCarSale } = require('../service/carSales.service')



class CarSalesController {
  async create(ctx, next) {
    console.log(ctx.request.body)
    try {

      const { createdAt, updatedAt, ...res } = await createCarSales(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '销售信息上传成功',
        result: res,
      }
    } catch (err) {
      console.log("------------")
      console.error(err)
      return ctx.app.emit('error', publishCarSalesError, ctx)
    }
  }

  async update(ctx) {
    try {
      const res = await updateCarSales(ctx.params.id, ctx.request.body)

      if (res) {
        ctx.body = {
          code: 0,
          message: '修改信息成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', invalidCarSalesID, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async remove(ctx) {
    const res = await removeCarSales(ctx.params.id)

    if (res) {
      ctx.body = {
        code: 0,
        message: '销售信息下架成功',
        result: '',
      }
    } else {
      return ctx.app.emit('error', invalidCarSalesID, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreCarSales(ctx.params.id)

    if (res) {
      ctx.body = {
        code: 0,
        message: '上架信息成功',
        result: '',
      }
    } else {
      return ctx.app.emit('error', invalidCarSalesID, ctx)
    }
  }

  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const res = await findCarSales(pageNum, pageSize)
    ctx.body = {
      code: 0,
      message: '获取商品列表成功',
      result: res
    }
  }

  async findOne(ctx, next) {
    try {
      const { sale_id } = ctx.request.query

      console.log(sale_id)
      const { createdAt, updatedAt, deletedAt, ...res } = await findOneCarSale(sale_id)
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

module.exports = new CarSalesController()