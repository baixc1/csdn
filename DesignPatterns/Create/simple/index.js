// index.js
// 构造函数方式
// alert 弹窗类
var Alert = function (content) {
  this.content = content
}
Alert.prototype.show = function () {
  // 实现 Alert 框
  console.log(this.content)
}

// Confirm 弹窗类
var Confirm = function (content) {
  this.content = content
}
Confirm.prototype.show = function () {
  // 实现 Confirm 框
}

// Toast 弹窗类
var Toast = function (content) {
  this.content = content
}
Toast.prototype.show = function () {
  // 实现 Toast 框
}

module.exports = function (name, content) {
  switch (name) {
    case 'alert':
      return new Alert(content)
    case 'confirm':
      return new Confirm(content)
    case 'Toast':
      return new Toast(content)
  }
}