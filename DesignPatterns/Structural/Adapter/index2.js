// jQuery 适配 A 框架
var A = A || {};
A.g = function (id) {
  return $(id).get(0);
};
A.on = function (id, type, fn) {
  // 返回 jquery 对象
  var dom = typeof id === "string" ? $(`#${id}`) : $(id);
  dom.on(type, fn);
};

// 使用（window窗口加载后，按钮绑定点击事件）
A.on(window, "load", function () {
  A.on("btn", "click", function () {
    //...
  });
});
