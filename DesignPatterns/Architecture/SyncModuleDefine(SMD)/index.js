// 模块管理器
var F = function () {
  /**
   * 定义模块方法
   * @param {string} str 模块路由
   * @param {function} fn 模块方法
   */
  const define = function (str, fn) {
    let parts = str.split("."),
      // old 为当前模块祖父模块，parent为当前模块父模块
      old = (parent = this),
      i = 0,
      len = parts.length;
    // 遍历路由，给 this 绑定链式对象
    // 例：str='a.b.c' -> 生成 this = { a: { b: { c:{} }, ...其他 }
    for (; i < len; i++) {
      if (!parent[parts[i]]) {
        parent[parts[i]] = {};
      }
      old = parent;
      parent = parent[parts[i]];
    }
    // 绑定模块方法，例：this.a.b.c = fn()
    if (fn) {
      old[parts[--i]] = fn();
    }
    return this;
  };

  /**
   * 模块调用方法（获取对应的模块，传参给回调函数）
   * 格式一：(['模块一','模块二'],function(模块一, 模块二){})
   * 格式二：('模块一','模块二', function(模块一, 模块二){})
   */
  const module = function () {
    let args = [].slice.call(arguments), // 参数列表
      fn = args.pop(), // 回调函数
      parts = Array.isArray(args[0]) ? args[0] : args, // 依赖模块，两种格式：数组或多个参数（call，apply）
      modules = [], // 实际依赖模块列表
      modIds = "", // 模块路由
      i = 0, // 遍历依赖模块的指针
      ilen = parts.length, // 依赖模块长度
      parent, // 父模块
      j, // 遍历路由指针
      jlen; // 路由长度

    while (i < ilen) {
      // 处理字符串命令的模块
      if (typeof parts[i] === "string") {
        parent = this;
        // 按点分割路由
        modIds = parts[i].split(".");
        // 遍历路由(取出最后层级上的模块方法)
        for (j = 0, jlen = modIds.length; j < jlen; j++) {
          // 重置父模块
          parent = parent[modIds[j]];
        }
        modules.push(parent);
      }
      // 处理对象等
      else {
        modules.push(parts[i]);
      }
      i++;
    }
    // 调用回调函数，分配对应的模块参数
    fn.apply(null, modules);
  };
  return { define, module };
};

const f = F();

// 定义普通对象
f.define("string.format", function () {
  return {
    trim(str) {
      return str.replace(/^\s+|\s+$/g, "");
    },
  };
});

// 定义命名空间
f.define("dom", function () {
  const $ = function (id) {
    $.dom = document.getElementById(id);
    return $;
  };
  $.html = function (html) {
    // 赋值
    if (html) {
      this.com.innerHTML = html;
      return this;
    }
    // 取值
    else {
      return this.dom.innerHTML;
    }
  };
  return $;
});

console.log(f.dom("test").html()); // test code

// 命名空间下添加对象
f.define("dom.addClass");
// 重写方法
f.dom.addClass = function (className) {
  // 不存在class
  if (!~this.dom.className.indexOf(className)) {
    this.dom.className += " " + className;
  }
};

f.dom("test").addClass("test");
// 获取dom模块和document模块
f.module(["dom", document], function (dom, doc) {
  console.log(dom, doc);
});
// 获取dom和trim模块
f.module("dom", "string.format.trim", function (dom, trim) {
  console.log(dom, trim);
});
