function inheritObj(o) {
  // 过渡函数
  function F() { }
  // 基于原型的继承
  F.prototype = o
  return new F()
}

function createBook(obj) {
  // o 可访问 obj(o实例 继承 obj)
  var o = new inheritObj(obj)
  // 扩展成员
  o.some = 'some'
  o.someFun = function () { }
  return o
}

var obj = {
  a: 1,
  b: 2
}

console.log(createBook(obj))