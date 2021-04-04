// 问题：兼容访问api
// 在IE 9之前，必须使用 attachEvent
document.getElementById("id").attachEvent("onclick", function () {
  // 使用 attachEvent 方法有个缺点，this 的值会变成 window 对象的引用而不是触发事件的元素。
  console.log(this);
});

// 显示：使用call绑定this，并传入自定义数据
function bindIEEvent(dom, type, fn, data = {}) {
  dom.attachEvent("on" + type, function (e) {
    fn.call(dom, e, data);
  });
}
