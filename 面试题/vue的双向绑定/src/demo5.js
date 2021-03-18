// How to create a Deep Proxy?(解决问题)
function createDeepProxy(target, handler) {
  const preproxy = new WeakMap();

  // 返回 Proxy 的拦截器
  function makeHandler(path) {
    return {
      set(target, key, value, receiver) {
        if (typeof value === "object") {
          value = proxify(value, [...path, key]);
        }
        target[key] = value;
        // 初始化 的 函数参数
        if (handler.set) {
          handler.set(target, [...path, key], value, receiver);
        }
        return true;
      },

      deleteProperty(target, key) {
        if (Reflect.has(target, key)) {
          unproxy(target, key);
          let deleted = Reflect.deleteProperty(target, key);
          if (deleted && handler.deleteProperty) {
            handler.deleteProperty(target, [...path, key]);
          }
          return deleted;
        }
        return false;
      },
    };
  }

  // 递归释放对象
  function unproxy(obj, key) {
    if (preproxy.has(obj[key])) {
      // console.log('unproxy',key);
      // obj[key] 对象重新赋值（接触Proxy绑定）
      obj[key] = preproxy.get(obj[key]);
      // 清除 preproxy 的缓存
      preproxy.delete(obj[key]);
    }

    for (let k of Object.keys(obj[key])) {
      if (typeof obj[key][k] === "object") {
        unproxy(obj[key], k);
      }
    }
  }

  // 返回 Proxy 实例
  // 递归，path代表 key 形成的数组（对象访问路径）（树的深度优先遍历）
  function proxify(obj, path) {
    for (let key of Object.keys(obj)) {
      if (typeof obj[key] === "object") {
        obj[key] = proxify(obj[key], [...path, key]);
      }
    }
    let p = new Proxy(obj, makeHandler(path));
    // 缓存 所有的对象（删除时重新赋值为obj）
    preproxy.set(p, obj);
    return p;
  }

  return proxify(target, []);
}

let obj = {
  foo: "baz",
};

let proxied = createDeepProxy(obj, {
  set(target, path, value, receiver) {
    console.log("set", path.join("."), "=", JSON.stringify(value));
  },

  deleteProperty(target, path) {
    console.log("delete", path.join("."));
  },
});

// proxied.foo = "bar";
// proxied.deep = {};
// proxied.deep.blue = "sea";
// delete proxied.foo;
// delete proxied.deep; // triggers delete on 'deep' but not 'deep.blue'

const baz = { baz: 9, quux: { duck: 6 } };
proxied.bar = baz;

delete proxied.bar;
baz.quux.duck = 666; // should not trigger notification -- 'bar' was detached
