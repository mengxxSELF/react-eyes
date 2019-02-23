const Router = require('koa-router')
let home = new Router()

const sqlData = require('../config')()

// 子路由1
home.get('/index', async (ctx) => {
  // let sql = 'select * from eyes_article'
  // end = await sqlData.query(sql).then(res => res[0])
  // console.log( 'end')
  await ctx.render('index')
})

// 获取banner信息
home.get('/info', async (ctx) => {
  try {
    let result = await getInfo()
    ctx.body = { code: 200, result }
  } catch (error) {
    console.log(error)
    ctx.body = { code: 500 }
  } 
})

let getInfo = async () => {
  let banners = await sqlData.query('select * from eyes_banners').then(res => res[0])
  let articles = await sqlData.query('select * from eyes_article').then(res => res[0])
  return { banners, articles }
}

module.exports = home
