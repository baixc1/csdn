// 页面点击事件封装（外观模式）
function addEvent(dom, type, fn) {
  // DOM2级事件(支持document.addEventListener)
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  }
  // 支持document.attachEvent
  else if (dom.attachEvent) {
    dom.attachEvent("on" + type, fn);
  }
  // DOM0级事件
  else {
    dom["on" + type] = fn;
  }
}

// 获取事件对象
function getEvent(e) {
  return e || window.event;
}

// 获取元素
function getTarget(e) {
  var event = getEvent(e);
  return event.target || event.srcElement;
}

// 阻止默认行为
function preventDefault(e) {
  var event = getEvent(e);
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}

// 禁用页面所有a标签的跳转
[...document.getElementsByTagName("a")].forEach((item) => {
  addEvent(item, "click", function (e) {
    preventDefault(e);
    console.log(getTarget(e));
  });
});
