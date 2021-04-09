// index2.js
// 绘图命令
// 功能：用于解耦，封装上下文对象

function getType(v) {
  return Object.prototype.toString.call(v);
}
// 绘图对象
var CanvasCmd = function (id) {
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext("2d");

  return {
    excute(msg) {
      if (!msg) return;
      // 处理命令数组
      if (msg.length) {
        for (let v of msg) {
          arguments.callee(v);
        }
      }
      // 处理每条命令
      else {
        let { param, cmd } = msg;
        // canvas绘图 没有该 api
        if (ctx[cmd] === undefined) return;
        // 命令是函数
        if (typeof ctx[cmd] === "function") {
          ctx[cmd](...param);
        } else {
          ctx[cmd] = param;
        }
      }
    },
  };
};

CanvasCmd("canvas").excute([
  {
    cmd: "fillStyle",
    param: "red",
  },
  {
    cmd: "fillRect",
    param: [20, 20, 100, 100],
  },
]);
