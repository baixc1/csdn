// 父类
function SuperClass() {
  this.superValue = true
  this.a = [1]
  this.b = 1
}
SuperClass.prototype.getSuperValue = function () {
  return this.superValue
}

// 子类
function SubClass() {
  this.subValue = false
}

// 继承父类
SubClass.prototype = new SuperClass()
SubClass.prototype.getSubValue = function () {
  return this.subValue
}

var instance = new SubClass()
console.log(instance)

// 复制到浏览器控制台
instance.a.push(2)
instance.b = 2
console.log(instance)