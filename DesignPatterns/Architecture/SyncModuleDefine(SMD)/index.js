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
  return { define };
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
// 定义
f.define("dom", function () {
  const $ = function (id) {
    $.dom = document.getElementById(id);
    return $;
  };
  $.html = function (html) {
    // 赋值
    if (html) {
    }
  };
});
