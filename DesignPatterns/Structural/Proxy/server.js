var express = require("express");
var app = express();

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/stat", (req, res) => {
  console.log(req.query);
  res.status(204).end();
});
app.use("/jsonp", (req, res) => {
  console.log(req.query);
  const { fn, data } = req.query;
  res.status(200).end(
    `
      ${fn}('success', ${data})
    `
  );
});

app.post("/template", (req, res) => {
  // console.log(req.body);
  const { fn, proxy } = req.body;
  res.redirect(`${proxy}?callback=${fn}&arg=success11`);
});
app.listen(3000);
