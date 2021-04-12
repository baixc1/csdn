// 使用 Proxy 替代 Object.defineProperty()实现
const obj = {
  name: "app",
  age: "18",
  a: {
    b: 1,
    c: 2,
  },
};
const p = new Proxy(obj, {
  get(target, propKey, receiver) {
    console.log("你访问了" + propKey);
    return Reflect.get(target, propKey, receiver);
  },
  set(target, propKey, value, receiver) {
    console.log("你设置了" + propKey);
    console.log("新的" + propKey + "=" + value);
    Reflect.set(target, propKey, value, receiver);
  },
});
// p.age = "20";
// console.log(p.age);
// p.newPropKey = "新属性";
// console.log(p.newPropKey);
var obj1 = p.a;
obj1.d = "这是obj中a的属性";
console.log(obj1.d);
