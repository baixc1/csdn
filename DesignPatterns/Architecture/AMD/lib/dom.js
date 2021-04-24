// lib/dom.js
// dom操作模块

// dom模块，返回操作dom的方法集合
F.module("lib/dom", function () {
  return {
    g(id) {
      return document.getElementById(id);
    },
    html(id, html) {
      if (html) {
        return (this.g(id).innerHTML = html);
      } else {
        return this.g(id).innerHTML;
      }
    },
  };
});
