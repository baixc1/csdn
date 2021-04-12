// 事件委托

var div = document.getElementById("d1");
let btn3;
div.onclick = function (e) {
  const target = e.target;
  var type = target.dataset.type;
  if (type === "btn1") {
    target.style.backgroundColor =
      target.style.backgroundColor === "red" ? "" : "red";
  } else if (type === "btn2" && !btn3) {
    btn3 = document.createElement("button");
    btn3.innerText = "按钮3";
    btn3.setAttribute("data-type", "btn3");
    target.parentElement.appendChild(btn3);
  } else if (type === "btn3") {
    target.parentElement.removeChild(btn3);
    btn3 = null;
  }
};
