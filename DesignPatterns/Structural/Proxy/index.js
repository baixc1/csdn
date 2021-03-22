// 统计代理
var Count = (function () {
  var _img = new Image();
  return function (params) {
    // 请求地址
    var str = "http://localhost:3000/stat/a.png?";
    for (let key in params) {
      if (str) str += "&";
      str += key + "=" + params[key];
    }
    // 不需要放到页面上，可以直接请求
    _img.src = str;
  };
})();
Count({ a: 1, b: 2, c: 3 });
