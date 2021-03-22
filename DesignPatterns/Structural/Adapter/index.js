var A = A || {};
A.g = function (id) {
  return document.getElementById(id);
};
A.on = function (id, type, fn) {
  // 获取元素对象
  var dom = typeof id === "string" ? this.g(id) : id;
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    dom.attachEvent("on" + type, fn);
  } else {
    dom["on" + type] = fn;
  }
};

// 使用（window窗口加载后，按钮绑定点击事件）
A.on(window, "load", function () {
  A.on("btn", "click", function () {
    //...
  });
});
