// 添加事件交户（简单模拟）

// 抽象 设置颜色的功能
function changeColor(dom, color, bg) {
  dom.style.color = color;
  dom.style.backgroundColor = bg;
}

// 为元素绑定事件
[...document.getElementsByTagName("div")].forEach((el) => {
  el.onmouseover = function () {
    changeColor(this, "red", "blue");
  };
  el.onmouseout = function () {
    changeColor(this, "blue", "red");
  };
});
