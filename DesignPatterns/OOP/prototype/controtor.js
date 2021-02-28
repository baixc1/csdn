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
  // 继承父类
  SuperClass.call(this, b)
  this.a = a
}

SubClass.prototype.getA = function () {
  return this.a
}

var instance = new SubClass(1, 2)
var instance2 = new SubClass(1, 2)
instance.list.push(2)
console.log(instance)
console.log(instance2)