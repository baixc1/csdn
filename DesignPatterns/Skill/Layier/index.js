// 通过对对象的重定义，减少分支判断
A = {};

// 加载即执行（立即执行A.on的初始化）
A.on = (function (dom, type, fn) {
  // 支持 addEventListener
  if (document.addEventListener) {
    return function (dom, type, fn) {
      dom.addEventListener(type, fn, false);
    };
  } else if (document.attachEvent) {
    return function (dom, type, fn) {
      dom.attachEvent("on" + type, fn);
    };
  } else {
    return function (dom, type, fn) {
      dom["on" + type] = fn;
    };
  }
})();

// 惰性执行（第一次调用时，初始化A.on方法，并执行）
A.on = function (dom, type, fn) {
  // 支持 addEventListener
  if (document.addEventListener) {
    A.on = function (dom, type, fn) {
      dom.addEventListener(type, fn, false);
    };
  } else if (document.attachEvent) {
    A.on = function (dom, type, fn) {
      dom.attachEvent("on" + type, fn);
    };
  } else {
    A.on = function (dom, type, fn) {
      dom["on" + type] = fn;
    };
  }
  A.on(dom, type, on);
};
