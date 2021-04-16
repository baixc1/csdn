// 需求：优化浮层。当鼠标移动到container时，显示layer，移动到li（icon）时，切换显示的图片
// 使用节流模式，优化不小心移入和移除导致的弹窗变化的情况
function $(id) {
  return document.getElementById(id);
}

function $tag(tag, container = document) {
  return container.getElementsByTagName(tag);
}

// 浮层类
var Layer = function (id) {
  // 容器
  this.container = $(id);
  // 容器内的浮层
  this.layer = $tag("div", this.container)[0];
  this.lis = $tag("li", this.container);
  this.imgs = $tag("img", this.container);
  this.bindEvent();
};
Layer.prototype = {
  bindEvent() {
    var that = this;
    // 隐藏浮层
    function hide() {
      that.layer.className = "";
    }
    // 显示浮层
    function show() {
      that.layer.className = "show";
    }
    // container enter 时显示，leave时不显示
    this.on(this.container, "mouseenter", function () {
      // 清除隐藏浮层方法计时器
      throttle(true, hide);
      // 延时显示浮层方法
      throttle(show);
    }).on(this.container, "mouseleave", function () {
      throttle(true, show);
      throttle(hide);
    });
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      // 先隐藏所有图片，再显示hover的图片
      this.on(this.lis[i], "mouseenter", function () {
        var index = this.index;
        for (var j = 0; j < that.imgs.length; j++) {
          that.imgs[j].className = "";
        }
        that.imgs[index].className = "show";
      });
    }
  },
  on(ele, type, fn) {
    // 简写
    ele.addEventListener(type, fn, false);
    return this;
  },
};

// 节流器：清除将要执行的函数，延迟执行最新的函数
var throttle = function () {
  // 回调函数
  let fn;
  // 第一个参数是布尔值（，第二个参数是函数）
  if (typeof arguments[0] === "boolean") {
    fn = arguments[1];
    fn._timer && clearTimeout(fn._timer);
  }
  // 第一个参数是函数，第二个参数为函数执行参数
  else {
    fn = arguments[0];
    var p = Object.assign(
      {
        context: null, // 函数执行作用域
        args: [],
        time: 300,
      },
      arguments[1]
    );
    // 自执行函数，清除之前定时器
    arguments.callee(true, fn);
    // 使用定时器延时执行
    fn._timer = setTimeout(() => {
      fn.apply(p.context, p.args);
    }, p.time);
  }
};
new Layer("icon");
