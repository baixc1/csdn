const mount = require('koa-mount');
const Koa = require('koa');
 
// hello
 
const a = new Koa();
 
a.use(async function (ctx, next){
  await next();
  ctx.body = 'Hello';
});
 
// world
 
const b = new Koa();
 
b.use(async function (ctx, next){
  await next();
  ctx.body = 'World';
});
 
// app
 
const app = new Koa();
 
// Mounting Applications
app.use(mount('/hello', a));
app.use(mount('/world', b));
 
// Mounting Middleware
app.use(mount('/sea', async (ctx, next)=>{
  await next()
  ctx.body = 'sea'
}))

app.listen(3001, ()=> console.log('server on 3001'));