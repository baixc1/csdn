// 需求：优化统计打包。统计放到数组中，批量上传。

// 打包统计对象

var LogPack = (function () {
  var data = [], // 请求缓存数组
    MaxNum = 10, // 请求缓存最大值
    itemSplitStr = "|", //键值对 与 键值对 间隔符
    keyValueSplitStr = "*", // 键与值 间隔符
    img = new Image(); // 通过 img 的 src发送get请求，上报数据

  // 发送请求
  function sendLog() {
    var log = "",
      sendData = data.splice(0, MaxNum);
    // 遍历数据列表
    for (let i = 0; i < sendData.length; i++) {
      log += `log${i}=`;
      // 遍历对象键值对
      for (let j in sendData[i]) {
        log += j + keyValueSplitStr + sendData[i][j] + itemSplitStr;
      }
      // 去掉最后一个 ｜ （写死？），用 & 连接查询参数
      log = log.replace(/\|$/, "") + "&";
    }
    log += "logLen=" + sendData.length;
    img.src = "xx.gif?" + log;
  }

  return function (param) {
    // 无参数调用，表示直接上报数据
    if (!param) {
      sendLog();
      return;
    }
    // 添加数据
    data.push(param);
    data.length >= MaxNum && sendLog();
  };
})();

// 委托模式
document.getElementsByTagName("div")[0].onclick = function (e) {
  const { nodeName, innerHTML, dataset } = e.target;
  if (nodeName === "BUTTON") {
    LogPack({
      id: dataset.id,
      context: innerHTML,
      type: "click",
    });
  }
};
// 直接发送
document.getElementById("btn").onclick = function () {
  LogPack();
};
