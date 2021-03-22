/* mock/list.js */

module.exports = function (app) {
  /* 这里的 app 是 express 创建的一个应用 */

  // get
  app.get("/list", function (req, res) {
    res.json([1, 2, 3, 4]);
  });

  // post
  app.post("/create", function (req, res) {
    res.json({ id: 12 });
  });

  // put
  app.put("/create/:id", function (req, res) {
    // /create/:id => req.params => { id }
    res.json("更新成功");
  });

  // ...
};
