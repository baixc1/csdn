var express = require("express");
var fs = require('fs')
var path = require('path')
var app = express();
app.use(function (req, res, next) {
  fs.readFile(path.resolve(__dirname, './index_history.html'), function (err, data) {
    res.writeHead(200, {
      'Content-type': 'text/html',
      'Connection': 'keep-alive'
    });
    res.end(data);
  })
});
app.listen(8000, () => console.log('serve is open'));