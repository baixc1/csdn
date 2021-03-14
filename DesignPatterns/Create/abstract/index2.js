// index2.js
// 抽象工厂方法
var VehicleFactory = function (subType, superType) {
  if (typeof VehicleFactory[superType] === 'function') {
    var p = new VehicleFactory[superType]()
    // 循环引用
    // 保证构造函数(subType)和其原型(p)的互相引用，即 p.constructor.prototype === p
    p.constructor = subType
    subType.prototype = p
  } else {
    throw new Error('未创建该抽象方法')
  }
}

var commonAbstract = function () {
  return new Error('抽象方法不能调用')
}

// 小汽车抽象类
VehicleFactory.Car = function () {
  this.type = 'car'
}

VehicleFactory.Car.prototype = {
  getPrice: commonAbstract,
  getSpeed: commonAbstract
}

// 公交车抽象类
VehicleFactory.Bus = function () {
  this.type = 'bus'
}

VehicleFactory.Bus.prototype = {
  getPrice: commonAbstract,
  getPassengerNum: commonAbstract
}

// 火车抽象类
VehicleFactory.Truck = function () {
  this.type = 'truck'
}
VehicleFactory.Truck.prototype = {
  getPrice: commonAbstract,
  getTrainload: commonAbstract
}

module.exports = VehicleFactory