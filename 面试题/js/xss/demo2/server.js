// 存储型
const Koa = require("koa");
const app = new Koa();
const route = require("koa-route");
var bodyParser = require("koa-bodyparser");
const KoaStatic = require("koa-static");
app.use(KoaStatic(__dirname));
const cors = require("@koa/cors");

// 临时用一个变量来存储，实际应该存在数据库中
let currentUserName = "";

app.use(bodyParser()); // 处理post请求的参数

// 在用户名的输入框输入 '<script>alert('存储型 XSS 攻击')</script>'
const login = (ctx) => {
  // 简单设置一个cookie
  ctx.cookies.set("cid", "hello world", {
    domain: "localhost", // 写cookie所在的域名
    path: "/", // 写cookie所在的路径
    maxAge: 10 * 60 * 1000, // cookie有效时长
    expires: new Date("2021-02-15"), // cookie失效时间
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: false, // 是否允许重写
  });

  const req = ctx.request.body;
  const userName = req.userName;
  currentUserName = userName;
  console.log(req);
  ctx.response.body = {
    msg: "登陆成功",
  };
};

const home = (ctx) => {
  ctx.body = currentUserName;
};
app.use(cors());
app.use(route.post("/login", login));
app.use(route.get("/home", home));
app.listen(3200, () => {
  console.log("启动成功");
});
