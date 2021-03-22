function f(obj = {}) {
  var _adapter = {
    name: "nx",
    title: "tx",
    age: 20,
    color: "red",
    prize: 40,
    //...
    // 或者 ...obj
  };
  for (var i in _adapter) {
    _adapter[i] = obj[i] || _adapter[i];
  }
  // do some
}
