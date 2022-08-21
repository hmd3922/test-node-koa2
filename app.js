const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const jsonerror = require('koa-json-error')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const parameter = require('koa-parameter')

const ModelDb = require('./db')

const index = require('./routes/index')
const users = require('./routes/users')
const rule = require('./routes/rule')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())
app.use(jsonerror())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(parameter(app))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  let data = await ModelDb.query()
  ctx.body = data
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(rule.routes(), rule.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
