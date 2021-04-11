// extend.js
// nodejs 环境
if (typeof require === "function") {
  A = require("./index");
}

/**
 * 扩展对象成员方法
 * 传2个及以上参数，类似于 Object.assign 方法（外部对象拓展）
 * 传一个参数，拓展 this(A或A.extend)（内部拓展）
 */
A.extend = A.fn.extend = function () {
  // 拓展对象从第二个参数算起
  let i = 1,
    len = arguments.length,
    //源对象
    target = arguments[0],
    // 遍历拓展对象的指针
    j;
  // 只有1个参数
  if (len === 1) {
    target = this;
    // 第一个参数为拓展对象
    i--;
  }
  // 遍历拓展对象
  for (; i < len; i++) {
    for (j in arguments[i]) {
      // 拓展源对象
      target[j] = arguments[i][j];
    }
  }
  return target;
};

// 外部拓展 (类似于 Object.assign )
var obj = {};
console.log(A.extend(obj, { a: 1, b: 2 }, { a: 2, c: 3 }) === obj); // true
console.log(obj); // { a: 2, b: 2, c: 3 }
A.fn.extend(obj, { d: 4, b: 0 });
console.log(obj); // { a: 2, b: 0, c: 3, d: 4 }

// 内部拓展（jQuery框架扩充类和原型方法）
// 浏览器环境测试
if (typeof window === "object") {
  // 拓展A.fn（原型拓展，实例访问）
  A.extend(A.fn, { version: "1.0" });
  const d1 = A("#d1");
  console.log(d1); // init [div#d1, context: document, selector: "#d1"]
  console.log(d1.version); // 1.0
  A.fn.extend({
    getVersion() {
      return this.version;
    },
  });
  console.log(d1.getVersion()); // 1.0

  // 拓展A（类/构造函数拓展）
  A.extend({ a: 11, b: 22 });
  A.extend({ c: 33 });
  const { a, b, c } = A;
  console.log(a, b, c); // 11 22 33
}
