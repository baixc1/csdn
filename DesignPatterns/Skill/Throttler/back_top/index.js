function moveScroll() {
  var top = $(document).scrollTop();
  console.log(top);
  $("#back").animate({ top: top + 100 }, 400, "easeOutCubic");
}

$(window).on("scroll", function () {
  // 滑动完成后，调用moveScroll(一定时间内)
  throttle(moveScroll);
});

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
