// 惰性单例
var LazySingle = (() => {
  function Simgle() {
    var conf = {
      COUNT: 1000,
      MAX_NUM: 100,
      MIN_NUM: 1
    }
    return {
      get(name) {
        return conf[name] || null
      }
    }
  }
  var _instance
  return function () {
    if (!_instance) {
      _instance = Simgle()
    }
    return _instance
  }
})()

console.log(LazySingle().get('COUNT'))
console.log(LazySingle().get('COUNT12'))

console.log(LazySingle() === LazySingle())