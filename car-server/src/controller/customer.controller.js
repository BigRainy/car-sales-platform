
const {
  createCustomer,
  updateCustomer,
  removeCustomer,
  restoreCustomer,
  findCustomer,
  findOneCustomer
} = require('../service/customer.service')

const {
  publishCustomerError,
  invalidCustomerID,
  NotFindCustomerById
} = require('../constant/err.type')

class CustomerController {
  async create(ctx, next) {
    try {
      const { createdAt, updatedAt, ...res } = await createCustomer(
        ctx.request.body
      )
      ctx.body = {
        code: 0,
        message: '客户信息上传成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', publishCustomerError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const res = await updateCustomer(ctx.params.id, ctx.request.body)

      if (res) {
        ctx.body = {
          code: 0,
          message: '修改客户信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidCustomerID, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async remove(ctx) {

    const res = await removeCustomer(ctx.params.id)

    if (res) {
      ctx.body = {
        code: 0,
        message: '客户信息删除成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidCustomerID, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreCustomer(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '客户信息重新上传成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidCustomerID, ctx)
    }
  }

  async findAll(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const res = await findCustomer(pageNum, pageSize)
    // console.log(res)
    ctx.body = {
      code: 0,
      message: '获取客户信息成功',
      result: res
    }
  }

  async findOne(ctx, next) {
    try {
      const { customer_id } = ctx.request.query

      console.log(customer_id)
      const { createdAt, updatedAt, deletedAt, ...res } = await findOneCustomer(customer_id)
      if (res) {
        ctx.body = {
          code: 0,
          message: '获取客户信息成功',
          result: res
        }
      } else {
        return ctx.app.emit('error', NotFindCustomerById, ctx)
      }
    } catch (err) {
      // console.error(err)
      return ctx.app.emit('error', NotFindCustomerById, ctx)
    }

  }
}

module.exports = new CustomerController()