// index3.js
// 点击按钮时，传递数据

Function.prototype.bind1 = function (context) {
  // 当前函数对象
  const that = this,
    args = [].slice.call(arguments, 1);
  return function () {
    return that.apply(context, [...args, ...arguments]);
  };
};

var callback = function () {
  console.log(this, arguments);
};
var data1 = {
  text: "第一组数据",
};
var data2 = {
  text: "第二组数据",
};

// 默认的bind方法
var btn = document.getElementsByTagName("button")[0];
var btnFn = callback.bind(btn, data2, data1);
btn.addEventListener("click", btnFn);

// 自定义bind1方法
var p = document.getElementsByTagName("p")[0];
var pFn = callback.bind1(p, data1, data2);
p.addEventListener("click", pFn);
// 5s后解绑事件
setTimeout(() => {
  p.removeEventListener("click", pFn);
}, 5000);
