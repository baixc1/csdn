var Conf = (() => {
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
})()

console.log(Conf.get('COUNT'))
console.log(Conf.get('COUNT12'))