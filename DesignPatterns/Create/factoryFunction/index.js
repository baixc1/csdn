// 创建不同语言类型的广告

// 安全模式
var Factory = function (type, content) {
  if (this instanceof Factory) {
    return new this[type](content) // 原型上的构造函数
  } else {
    return new Factory(type, content)
  }
}

Factory.prototype = {
  Java() {
    //...
  },
  Javascript() {
    //...
  },
  UI() {
    //...
  },
  //...
}