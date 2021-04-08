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
    for (var i = 0, len = keys.length; i < len - 1; i++) {
      const v = keys[i];
      if (ret[v] === undefined) {
        ret[v] = {};
      }
      if (!(ret[v] instanceof Object)) {
        throw new Error(`obj.${keys.slice(0, i + 1).join(".")}不是对象`);
      }
      ret = ret[v];
    }
    return (ret[keys[i]] = val);
  },
};

console.log(ViaIterator.get({ a: null }, "a.b.c")); // undefined
console.log(ViaIterator.get({ a: { b: { c: null } } }, "a.b.c")); // undefined

var obj = {};
console.log(ViaIterator.set(obj, "a.b", { c: 1 })); // { c: 1 }
console.log(obj); // { a: { b: { c: 1 } } }
try {
  ViaIterator.set(obj, "a.b.c.val", "d");
} catch (e) {
  console.dir(e.message); // 'obj.a.b.c不是对象'
}
