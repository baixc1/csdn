Object.prototype.mix = function () {
  var i = 0, len = arguments.length, arg
  for (; i < len; i++) {
    arg = arguments[i]
    for (var key in arg) {
      // 禁止访问原型属性
      if (arg.hasOwnProperty(key)) {
        this[key] = arg[key]
      }
    }
  }
}

var obj = {}
obj.mix({ a: 1, b: 2 }, { a: 2, c: 3 })
console.log(obj)