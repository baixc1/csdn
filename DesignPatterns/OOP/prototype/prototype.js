function inheritObj(o) {
  // 过渡函数
  function F() { }
  // 基于原型的继承
  F.prototype = o
  return new F()
}