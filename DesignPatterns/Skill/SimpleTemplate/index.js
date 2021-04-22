// index.js
// 需求：使用简单模版模式，创建视图

// 命名空间
var A = A || {};
// 模板渲染方法
A.formateStr = function (str, data) {
  return str.replace(/\{#(\w+)#\}/g, function (match, key) {
    return data[key] || "";
  });
};
// 模板生成器
A.view = function (name) {
  // 模版库
  const v = {
    // ...
  };
  // 数组（多个模版拼接）
  if (Object.prototype.toString.call(name) === "[object Array]") {
    // 模版字符串
    var tpl = "";
    for (var i = 0, len = name.length; i < len; i++) {
      tpl += arguments.callee(name[i]);
    }
    return tpl;
  }
  // 字符串，有对应模版则返回对应模版，没有返回默认模版
  else {
    return v[name] ? v[name] : `<${name}>{#${name}#}</${name}>`;
  }
};
// 创建视图方法集合
A.strategy = {
  // 列表功能
  listPart(data) {
    var s = document.createElement("div"), // 模块容器
      ul = "", // ul列表字符串
      list = data.data.lis, // li列表数据
      // 展示的模版
      tpl = A.view(["h2", "p", "ul"]),
      // ul模版
      liTpl = A.formateStr(A.view("li"), {
        li: A.view(["strong", "span"]),
      });
    // 设置ID
    data.id && (s.id = data.id);
    // 获取liTpl模板展示字符串
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i].em || list[i].span) {
        ul += A.formateStr(liTpl, list[i]);
      }
    }
    // 装饰ul数据
    data.data.ul = ul;
    // 获取tpl展示字符串
    s.innerHTML = A.formateStr(tpl, data.data);
    document.getElementById(data.containerId).appendChild(s);
  },
  // 其他功能
};
// 初始化
A.init = function (data) {
  this.strategy[data.type](data);
};

if (typeof module === "object") {
  module.exports = A;
}
