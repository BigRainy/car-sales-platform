
const {
  createStaff,
  updateStaff,
  removeStaff,
  restoreStaff,
  findStaff,
  findOneStaff
} = require('../service/staff.service')

const {
  publishStaffError,
  invalidStaffID,
  NotFindStaffById
} = require('../constant/err.type')

class StaffController {
  async create(ctx, next) {
    try {
      const { createdAt, updatedAt, ...res } = await createStaff(
        ctx.request.body
      )
      ctx.body = {
        code: 0,
        message: '用户信息上传成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', publishStaffError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const res = await updateStaff(ctx.params.id, ctx.request.body)

      if (res) {
        ctx.body = {
          code: 0,
          message: '修改商品成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidStaffID, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async remove(ctx) {
    const res = await removeStaff(ctx.params.id)

    if (res) {
      ctx.body = {
        code: 0,
        message: '员工信息软删除成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidStaffID, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreStaff(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '上架商品成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidStaffID, ctx)
    }
  }

  async findAll(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const res = await findStaff(pageNum, pageSize)
    // console.log(res)
    ctx.body = {
      code: 0,
      message: '获取用户信息成功',
      result: res
    }
  }

  async findOne(ctx, next) {
    try {
      const { staff_id } = ctx.request.query

      console.log(staff_id)
      const { createdAt, updatedAt, deletedAt, ...res } = await findOneStaff(staff_id)
      if (res) {
        ctx.body = {
          code: 0,
          message: '获取用户信息成功',
          result: res
        }
      } else {
        return ctx.app.emit('error', NotFindStaffById, ctx)
      }
    } catch (err) {
      // console.error(err)
      return ctx.app.emit('error', NotFindStaffById, ctx)
    }

  }
}

module.exports = new StaffController()