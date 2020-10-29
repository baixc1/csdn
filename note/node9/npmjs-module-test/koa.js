const koa = require('koa')

const app = new koa()
 
app.use((ctx,next)=>{
  ctx.body = 'hello'
})

app.listen(5000, ()=>console.log('server on 4000'))