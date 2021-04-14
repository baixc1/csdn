const Koa = require("koa");
const app = new Koa();
const KoaStatic = require("koa-static");

// 使用  koa-static  使得前后端都在同一个服务下
app.use(KoaStatic(__dirname));

app.listen(3100, () => {
  console.log("启动成功");
});
