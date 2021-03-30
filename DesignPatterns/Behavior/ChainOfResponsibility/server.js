var express = require("express");

var app = express();
app.use(express.static("./"));
app.get("/getData", function (req, res) {
  const { key, value } = req.query;
  if (key === "name") {
    if (value.length < 2) {
      res.send(["请输入至少2个"]);
      return;
    }
  }
  if (key === "num") {
    var errs = [];
    if (!/^\d+$/.test(value)) {
      errs.push("请输入数字");
    }
    if (value.length < 4) {
      errs.push("请输入至少四位");
    }
    if (errs.length) return res.send(errs);
  }
  res.send([]);
});

app.listen(3000);
