const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')
const cors = require('koa2-cors')

const errHandler = require('./errHandler')
const router = require('../router')


const app = new Koa()

// 允许跨域
app.use(
  cors({
    origin: '*',
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);



app.use(KoaBody({
  multipart: true,
  formidable: {
    // 在配置选项option里，不推荐使用相对路径
    // 在option里的相对路径，不是相对的当前文件，相对process.cwd()
    uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true
  },
  parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
}))

app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app))

app.use(router.routes()).use(router.allowedMethods())

// 统一错误处理
app.on('error', errHandler)

module.exports = app