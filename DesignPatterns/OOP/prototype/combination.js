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
SubClass.prototype = new SuperClass()
SubClass.prototype.getA = function () {
  return this.a
}

var instance = new SubClass(1, 2)
console.log(instance)