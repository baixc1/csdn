// 新闻评论功能 模块通信（用户消息信息+消息列表+提交表单）
// 根据ID获取dom
function $(id) {
  return document.getElementById(id);
}
// 创建dom
function g(tag) {
  return document.createElement(tag);
}

// 用户信息模块(显示消息)
(function () {
  let num = 0;
  function change(e) {
    num += e.args.num;
    $("msg_num").innerHTML = num;
  }
  // 注册 添加/删除事件
  Observer.on("add", change).on("remove", change);
})();

// 消息列表模块（显示消息+添加消息）
(function () {
  function add(e) {
    var text = e.args.text,
      ul = $("msg"),
      li = g("li"),
      span = g("span");
    li.innerHTML = text;
    span.innerHTML = "删除";
    span.onclick = () => {
      ul.removeChild(li);
      // 发布删除事件
      Observer.emit("remove", { num: -1 });
    };
    li.appendChild(span);
    ul.appendChild(li);
  }
  // 注册添加事件
  Observer.on("add", add);
})();

// 提交表单模块
(function () {
  $("submit").onclick = function () {
    var text = $("input");
    if (!text.value) return;
    // 发布添加事件
    Observer.emit("add", {
      text: text.value,
      num: 1,
    });
    text.value = "";
  };
})();
