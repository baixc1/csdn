// test2.js
const Fun = require('./index2.js')

// 宝马汽车子类
var BM = function (price, speed) {
  this.price = price
  this.speed = speed
}

// 抽象工厂实现BM继承Car
Fun(BM, 'Car')
BM.prototype.getPrice = function () {
  console.log(this)
  console.log(this.price)
}

new BM(300000, 60).getPrice()