// 数组原型方法 forEach
// arr.forEach(callback(currentValue [, index [, array]])[, thisArg])

Array.prototype.forEach = function (callback, thisArg) {
  var len = this.length;
  var i = 0;
  for (; i < len; i++) {
    callback.call(thisArg, this[i], i, this);
  }
};

// arr.some(callback(element[, index[, array]])[, thisArg])
// 数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false。
Array.prototype.some = function (callback, thisArg) {
  var len = this.length;
  var i = 0;
  for (; i < len; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return true;
    }
  }
  return false;
};

Object.prototype.forEach = function (callback, thisArg) {
  for (var key in this) {
    if (!this.hasOwnProperty(key)) continue; // 排除forEach
    callback.call(thisArg, this[key], key, this);
  }
};

console.log(
  "forEach",
  [1, 2, 3].forEach((item, index, arr) => {
    console.log("forEachItem", item, index, arr);
    if (index === 1) return true;
  })
);
console.log(
  "some",
  [1, 2, 3].some((item, index, arr) => {
    console.log("someItem", item, index, arr);
    if (index === 1) return true;
  })
);
console.log(
  "obj-forEach",
  { a: 1, b: 2 }.forEach((item, key, obj) => {
    console.log("obj-forEachItem", item, key, obj);
  })
);
