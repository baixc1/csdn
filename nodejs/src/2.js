const koa = require('koa')
const parse = require('co-body')

const app = new koa()

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    console.log(end - start)
})

app.use(async ctx => {
    ctx.body = ctx.url
})

app.use()

app.listen(3000, () => console.log('server run'))