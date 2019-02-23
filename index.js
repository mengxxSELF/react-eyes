const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')
const Router = require('koa-router')
const home = require('./server/routers/home')
const views = require('koa-views')
const path = require('path')
const cors = require('koa-cors')
const moment = require('moment')
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './project/dist'

// 加载模板引擎
app.use(views(path.join(__dirname, './project/dist'), {
  extension: 'html'
}))

app.use(static(
  path.join(__dirname, staticPath)
))
app.use(cors())

// 装载所有子路由
let router = new Router()
router.use(home.routes())
router.use(home.allowedMethods())
// router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => {
  console.log('i am  listen 3000')
})
