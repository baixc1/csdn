/**
 * 1. 强缓存优先级 > 对比缓存优先级
 * 2. Cache-control 优先级 > Expires 优先级
 * 3. ETag 优先级 > Last-Modified 优先级
 * 4. Pragma 优先级 > cache-control 优先级
 */
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

var oneDay = 24 * 3600;

// const opts = {
//   etag: false, // 禁用协商缓存
//   lastModified: false, // 禁用协商缓存
//   maxAge: oneDay,
// };
// const opts = {
//   etag: false,
//   lastModified: true,
//   maxAge: 0,
// };
const opts = {
  etag: true,
  lastModified: false,
  maxAge: 0,
};
app.use("/static", express.static(path.join(__dirname, "static"), opts));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
