// 函数柯里化（借助柯里化伪造其他函数（多态或重载），根据不同的参数实现不同的功能（类似中间件））

function curry(fn) {
  const slice = [].slice;
  // 获取fn 的参数（闭包）
  const args = slice.call(arguments, 1); // 类数组对象截取

  return function () {
    // 拼接参数，调用fn
    return fn.apply(null, [...args, ...arguments]);
  };
}

// 加法器
function add(a, b) {
  return a + b;
}

// 加n加法器
function addN(n) {
  return curry(add, n);
}

//加5加法器
var add5 = addN(5);
console.log(add5(9)); // 14
