
const jwt = require('jsonwebtoken')


const { createUser, getUserInfo } = require('../service/user.service')
const { userRegisterError, userLoginError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  // 用户注册
  async register(ctx, next) {
    // 1.获取数据
    // console.log(ctx.request.body)
    const { user_name, password, is_admin } = ctx.request.body

    // 2.操作数据库
    try {
      const res = await createUser(user_name, password, is_admin)
      // console.log(res)
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      }
    } catch (err) {
      console.error(err)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  // 用户登录
  async login(ctx, next) {
    const { user_name } = ctx.request.body

    // 1.获取用户信息（在token的payload中，记录id，user_name，is_admin）
    try {
      // 从返回结果对象中剔除password属性，将剩下的属性放到res对象中
      const { password, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          is_admin: res.is_admin,
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
        }
      }
    } catch (err) {
      console.error('用户登录失败', err)
      return ctx.app.emit('error', userLoginError, ctx)
    }
  }

}



module.exports = new UserController()