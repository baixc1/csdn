// 反射型XSS攻击
const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  // ctx.body 即服务端响应的数据
  ctx.body = ctx.query.userName;
});

app.listen(3000, () => {
  console.log("启动成功");
});

// 浏览器访问：http://127.0.0.1:3000?userName=<script>document.write('危险警告⚠️');alert("反射型 XSS 攻击")</script>
