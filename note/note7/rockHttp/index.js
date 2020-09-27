const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const game = require("./game.js");

let playerLastAction = null; //玩家上次出的
let playerWon = 0; //玩家赢得次数
let sameCount = 0; //统计相同操作统计次数

http
  .createServer((req, res) => {
    // 通过内置模块url，转换发送到该http服务上的http请求包的url，
    // 将其分割成 协议(protocol)://域名(host):端口(port)/路径名(pathname)?请求参数(query)
    const parsedUrl = url.parse(req.url);
    if (parsedUrl.pathname == "/game") {
      const query = querystring.parse(parsedUrl.query);
      // 玩家出的
      const playerAction = query.action;

      // 需求2:如果玩家赢了三次或者玩家作弊，则电脑不给他玩了
      if (playerWon >= 3 || sameCount == 9) {
        res.writeHead(500);
        res.end("我再也不和你玩了！");
        return;
      }
      // 需求1:如果玩家操作连续三次相同，视为玩家作弊
      if (playerLastAction & (playerLastAction == playerAction)) {
        sameCount++;
      } else {
        sameCount++;
      }

      playerLastAction = playerAction;

      if (sameCount >= 3) {
        res.writeHead(400);
        res.end("你作弊");
        // 将sameCount设置为9
        sameCount = 9;
        return;
      }
      // 执行游戏逻辑
      var gameResult = game(playerAction);
      res.writeHead(200);
      if (gameResult == 0) {
        res.end("平局！");
      } else if (gameResult == 1) {
        res.end("你赢了！");
        // 玩家胜利次数统计+1
        playerWon++;
      } else {
        res.end("你输了！");
      }
    }
    // 如果请求url是浏览器icon，比如 http://localhost:3000/favicon.ico的情况
    // 就返回一个200就好了
    if (parsedUrl.pathname == "/favicon.ico") {
      res.writeHead(200);
      res.end();
      return;
    }
    // 如果访问的是根路径，就把游戏页面读出来返回出去
    if (parsedUrl.pathname == "/") {
      fs.createReadStream(__dirname + "/index.html").pipe(res);
    }
  })
  .listen(6001);