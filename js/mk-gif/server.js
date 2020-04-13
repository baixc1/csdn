var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.static('public'))
app.get('/', function (req, res) {
    //设置头信息
    res.setHeader("Content-Type", "text/html;charset='utf-8'");
    //读文件
    fs.readFile("./gif-to-img.html", "utf-8", function (err, data) {
        if (err) {
            console.log("index.html loading is failed :" + err);
        }
        else {
            //返回index.html页面
            res.end(data);
        }

    });
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})