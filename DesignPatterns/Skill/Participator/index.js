// 函数原型bind方法实现
Function.prototype.bind1 = function (context) {
  // 当前函数对象
  const that = this;
  return function () {
    return that.apply(context, arguments);
  };
};

var obj = {
  a: 1,
  b: 2,
};
var f = function () {
  console.log(this);
};
f.bind(obj)();
f.bind1(obj)();
