// 基于对象 o 的继承
function inheritObj(o) {
  // 过渡函数
  function F() { }
  // 基于原型的继承
  F.prototype = o
  return new F()
}

// 寄生式继承的改造
function inheritPrototype(subClass, supClass) {
  // p 继承 父类原型
  var p = inheritObj(supClass.prototype)
  // p 和 subClass 为对应的 原型与构造函数（改变p的构造函数指向）
  // 继承链：subClass 的实例继承 p， p 继承 supClass.prototype
  p.constructor = subClass
  subClass.prototype = p
}

// 父类
function SuperClass(b) {
  this.list = [1]
  this.b = b
}
SuperClass.prototype.getB = function () {
  return this.b
}

// 子类
function SubClass(a, b) {
  // 继承父类实例属性
  SuperClass.call(this, b)
  this.a = a
}

// 继承父类原型属性
inheritPrototype(SubClass, SuperClass)
SubClass.prototype.getA = function () {
  return this.a
}

var instance = new SubClass(1, 2)
console.log(instance)