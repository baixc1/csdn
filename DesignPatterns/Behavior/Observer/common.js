// 观察者对象（绑定，解绑，发布）
var Observer = (function () {
  // 消息容器
  var _message = {};
  return {
    // 绑定，type - 消息类型,fn - 回调函数
    on(type, fn) {
      if (!_message[type]) _message[type] = [];
      _message[type].push(fn);
      return this;
    },
    // 解绑
    off(type, fn) {
      if (!_message[type] instanceof Array) return;
      var len = _message[type].length,
        i = len - 1;
      // 从后往前遍历，优化删除元素的性能
      for (; i >= 0; i--) {
        if (_message[type][i] === fn) {
          _message[type].splice(i, 1);
        }
      }
      return this;
    },
    // 发布
    emit(type, args = {}) {
      if (!_message[type]) return;
      // 消息信息
      var events = {
        type,
        args,
      };
      var i = 0,
        len = _message[type].length;
      for (; i < len; i++) {
        _message[type][i].call(this, events); // this 绑定off的调用者
      }
      return this;
    },
  };
})();
if (module) {
  module.exports = Observer;
}
