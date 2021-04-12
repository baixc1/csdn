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

A.extend({
  // 将 - 转化为驼峰
  camelCase(str) {
    return str.replace(/\-(\w)/g, function (all, letter) {
      console.log(all, letter);
      return letter.toUpperCase();
    });
  },
});
// 添加方法（事件、属性、类、html）
A.fn.extend({
  // 事件，创建不同环境的函数，减少调用时的校验
  on: (function () {
    // 标志浏览器 DOM2级事件
    if (document.addEventListener) {
      return function (type, fn) {
        for (var i = 0; i < this.length; i++) {
          this[i].addEventListener(type, fn, false);
        }
        return this;
      };
    }
    // IEDOM2级事件
    else if (document.attachEvent) {
      return function (type, fn) {
        for (var i = 0; i < this.length; i++) {
          this[i].attachEvent(`on${type}`, fn);
        }
        return this;
      };
    }
    // 不支持DOM2级事件
    else {
      return function (type, fn) {
        for (var i = 0; i < this.length; i++) {
          this[i][`on${type}`] = fn;
        }
        return this;
      };
    }
  })(),
  /**
   *
   * @returns this
   */
  css() {
    const args = arguments,
      len = args.length;
    if (this.length < 1) return this;
    // 只有一个参数
    if (len === 1) {
      // 获取样式 $.css('width)
      if (typeof args[0] === "string") {
        return getComputedStyle(this[0])[A.camelCase(args[0])];
      }
      // 设置 $.css({width: '20px','background-color':'red'})
      else if (typeof args[0] === "object" && args[0] !== null) {
        for (var i in args[0]) {
          for (var j = 0; j < this.length; j++) {
            this[j].style[A.camelCase(i)] = args[0][i];
          }
        }
      }
    }
    // 两个参数 $.css('width','30px')
    else if (len === 2) {
      for (var j = 0; j < this.length; j++) {
        this[j].style[args[0]] = args[1];
      }
    }
    return this;
  },
  attr() {
    const args = arguments,
      len = args.length;
    if (this.length < 1) return this;
    // 只有一个参数
    if (len === 1) {
      // 获取样式 $.attr('class')
      if (typeof args[0] === "string") {
        return getAttribute(this[0])[name];
      }
      // 设置 $.attr({name: 'xx','id':'xx'})
      else if (typeof args[0] === "object" && args[0] !== null) {
        for (var i in args[0]) {
          for (var j = 0; j < this.length; j++) {
            this[j].setAttribute(i, args[0][i]);
          }
        }
      }
    }
    // 两个参数 $.attr('id','xx')
    else if (len === 2) {
      for (var j = 0; j < this.length; j++) {
        this[j].setAttribute(args[0], args[1]);
      }
    }
    return this;
  },
  html() {
    const args = arguments,
      len = args.length;
    if (len === 0) {
      return this[0] && this[0].innerHTML;
    } else {
      // 一个参数
      for (var i = 0; i < this.length; i++) {
        this[i].innerHTML = args[0];
      }
    }
    return this;
  },
});
const input = A("#input1");
input
  .css({
    border: "1px solid #ddd",
    "background-color": "red",
    width: "100px",
  })
  .attr({
    name: "input",
    class: "xx",
  });
console.log(input.css("background-color"));
A("#div2")
  .html("<p>我是xxx</p>")
  .on("click", function (e) {
    console.log(e);
  });
