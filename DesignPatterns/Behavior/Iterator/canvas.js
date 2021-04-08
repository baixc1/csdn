// 分支循环嵌套问题

// canvas 处理图片像素

window.onload = function () {
  var canvas = document.getElementsByTagName("canvas")[0];
  var ctx = canvas.getContext("2d");
  var img = document.images[0];
  var width = (canvas.width = img.width * 2) / 2;
  var height = (canvas.height = img.height);

  // canvas左侧图片
  ctx.drawImage(img, 0, 0);
  // canvas置灰（蒙层1）
  dealImageYh("gray", 0, 0, width, height, 0);
  // canvas红色矩形（蒙层2）
  dealImageYh("red", 100, 100, 200, 200, 100);
  // canvas蓝色矩形（蒙层3）
  dealImageYh("blue", 120, 120, 160, 160, 255);
  /**
   *
   * @param {string} t 类型
   * @param {*} x x坐标
   * @param {*} y
   * @param {*} w 宽
   * @param {*} h 高
   * @param {*} a 透明度
   */
  function dealImage(t, x, y, w, h, a) {
    // 画布数据
    var canvasData = ctx.getImageData(x, y, w, h);
    // 像素数据
    var data = canvasData.data;
    // 遍历（rgba）
    for (var i = 0, len = data.length; i < len; i += 4) {
      data[i + 3] = a;
      switch (t) {
        case "red":
          data[i + 1] = data[i + 2] = 0;
          break;
        case "green":
          data[i] = data[i + 2] = 0;
          break;
        case "blue":
          data[i] = data[i + 1] = 0;
          break;
        case "gray":
          var num = parseInt((data[i] + data[i + 1] + data[i + 2]) / 3);
          data[i] = data[i + 1] = data[i + 2] = data[i + 3] = num;
          break;
        // ...
      }
    }
    ctx.putImageData(canvasData, width + x, y);
  }

  // 简化分支逻辑，优化性能
  function dealImageYh(t, x, y, w, h, a) {
    var canvasData = ctx.getImageData(x, y, w, h);
    var data = canvasData.data;
    // 状态模式，简化分支
    var Deal = (function () {
      var methods = {
        default(i) {
          return methods.gray(i);
        },
        red(i) {
          data[i + 3] = a;
          data[i + 1] = data[i + 2] = 0;
        },
        green(i) {
          data[i + 3] = a;
          data[i] = data[i + 2] = 0;
        },
        blue(i) {
          data[i + 3] = a;
          data[i] = data[i + 1] = 0;
        },
        gray(i) {
          data[i + 3] = a;
          var num = parseInt((data[i] + data[i + 1] + data[i + 2]) / 3);
          data[i] = data[i + 1] = data[i + 2] = data[i + 3] = num;
        },
      };
      return function (type = "default") {
        return methods[type];
      };
    })();

    for (var i = 0, len = data.length; i < len; i += 4) {
      Deal(t)(i);
    }
    ctx.putImageData(canvasData, width + x, y);
  }
};
