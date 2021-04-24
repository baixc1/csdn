// lib/event.js
// 事件模块

// event 模块依赖 dom 模块，返回事件相关的方法集合
F.module("lib/event", ["lib/dom"], function (dom) {
  return {
    on(id, type, fn) {
      dom.g(id)[`on${type}`] = fn;
    },
  };
});
