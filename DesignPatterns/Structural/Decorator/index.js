var decorator = function (id, fn) {
  var el = document.getElementById(id);
  if (typeof el.onclick === "function") {
    var oldClickFn = el.onclick;
    el.onclick = function () {
      oldClickFn();
      fn();
    };
  } else {
    el.onclick = fn;
  }
};

var el = document.createElement("div");
el.id = "id1";
el.style.padding = "40px";
el.innerText = "点我";
document.body.appendChild(el);
// 为同一元素，绑定多个事件
decorator("id1", () => {
  console.log("do some 111");
});
decorator("id1", () => {
  console.log("do some 222");
});
decorator("id1", () => {
  console.log("do some 333");
});
