ViaIterator = {
  /**
   * 变量链式迭代取值器
   * @param {string} key - 链式可以， 例： 'a.b.c'
   * @param {object} obj
   * @returns
   */
  get(obj, key) {
    let ret = obj; // 对象指针，指向访问的对象层级
    var keys = key.split("."); // key 的数组
    for (let v of keys) {
      if (!ret) return;
      if (ret[v] !== undefined) {
        ret = ret[v];
      }
    }
    return ret;
  },
  // 变量链式迭代赋值器
  set(obj, key, val) {
    let ret = obj; // 对象指针，指向访问的对象层级
    var keys = key.split("."); // key 的数组
    var keyStr = ""; // 当前访问到的链式key
    var lastKey = keys[keys.length - 1]; //最后一个key
    for (let v of keys) {
      keyStr += `.${v}`;
      // 未赋值过
      if (ret[v] === undefined) {
        ret[v] = {};
      }
      // 赋值过，但不是对象
      else if (!ret[v] instanceof Object) {
        throw new Error(`obj${keyStr}不是对象`);
      }
      // 访问最后一个key时，赋值后返回
      if (v === lastKey) {
        return (ret[v] = val);
      }
      ret = ret[v];
    }
  },
};

console.log(ViaIterator.get({ a: null }, "a.b.c")); // undefined
console.log(ViaIterator.get({ a: { b: { c: null } } }, "a.b.c")); // undefined

var obj = {};
console.log(ViaIterator.set(obj, "a.b", { c: 1 })); // { c: 1 }
console.log(obj); // { a: { b: { c: 1 } } }
console.log(ViaIterator.set(obj, "a.b.c", "d"));
console.log(obj);
