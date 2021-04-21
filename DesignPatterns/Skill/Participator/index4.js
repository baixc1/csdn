// 反柯里化
Function.prototype.uncurry = function () {
  const that = this;
  return function () {
    // that 为 函数，arguments 包含 this, 参数
    console.log(that, arguments);
    return Function.prototype.call.apply(that, arguments);
  };
};

// 对象原型方法
var toString = Object.prototype.toString.uncurry();
console.log(toString(() => {})); // [object Function]
console.log(toString(null)); // [object Null]

// 数组原型方法
var push = [].push.uncurry();
var obj = {};
push(obj, "第一个", "第二个");
console.log(obj); // { '0': '第一个', '1': '第二个', length: 2 }

// 函数call 方法
Function.prototype.call;
// 给call方法绑定 this 和参数
Function.prototype.call.call(Math.max, 1, 3, 4); // 4
Function.prototype.call.apply(Math.max, [1, 3, 4]); // 4
