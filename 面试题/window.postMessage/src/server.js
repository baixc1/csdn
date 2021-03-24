var express = require("express");
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./"));
app.post("/post", (req, res) => {
  res.json({ from: "server", ...req.body });
});

app.listen(3000);
