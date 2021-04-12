// How to create a Deep Proxy?(有问题)
function deepProxy(obj) {
  return new Proxy(obj, {
    set(target, property, value, receiver) {
      console.log("set", property, "=", value);
      if (typeof value === "object") {
        for (let k of Object.keys(value)) {
          if (typeof value[k] === "object") {
            value[k] = deepProxy(value[k]);
          }
        }
        value = deepProxy(value);
      }
      target[property] = value;
      return true;
    },
    deleteProperty(target, property) {
      if (Reflect.has(target, property)) {
        let deleted = Reflect.deleteProperty(target, property);
        if (deleted) {
          console.log("delete", property);
        }
        return deleted;
      }
      return false;
    },
  });
}

const proxy = deepProxy({});
const baz = { baz: 9, quux: { duck: 6 } };

proxy.foo = 5;
proxy.bar = baz;
proxy.bar.baz = 10;
proxy.bar.quux.duck = 999;

baz.quux.duck = 777;
delete proxy.bar;
delete proxy.bar; // should not trigger notifcation -- property was already deleted
baz.quux.duck = 666; // should not trigger notification -- 'bar' was detached

console.log(baz);
