// 中介者对象（消息系统）
var Mediator = (function () {
  // 消息对象
  var msg = {};
  return {
    /**
     * 注册消息方法
     * @param {string} type
     * @param {function} action
     */
    register(type, action) {
      if (!msg[type]) {
        msg[type] = [];
      }
      msg[type].push(action);
      return this;
    },
    // 发布消息
    emit(type) {
      if (!msg[type]) return;
      for (let fn of msg[type]) {
        fn && fn();
      }
    },
  };
})();

/**
 * 显隐导航组件
 * @param {dom} ele
 * @param {string} tag 标签
 * @param {boolean} isShow
 */
var showHideNav = function (ele, tag, isShow) {
  var subEle = ele.getElementsByTagName(tag);
  var display = isShow ? "initial" : "none";
  for (let v of subEle) {
    v.style.display = display;
  }
};

// Mediator.register("demo", () => console.log("first"));
// Mediator.register("demo", () => console.log("second"));

// Mediator.emit("demo");
