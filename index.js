const Koa = require('koa')
const koaStatic = require('koa-static')
const path = require('path')

const app = new Koa()

const staticPath = './build'
app.use(koaStatic(path.join(__dirname, staticPath)))

app.listen(3000, '0.0.0.0', function () {
  console.log('启动在3000端口成功')
})