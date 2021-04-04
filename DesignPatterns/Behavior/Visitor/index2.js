// 原生对象构造器：访问者（内部访问了this）
const toString = Object.prototype.toString;
console.log(toString.apply({})); // [object Object]
console.log(toString.call(1)); // [object Number]
console.log("------------");
// 其他测试
console.log({}.__proto__.toString === toString); // true
console.log("toString" in {}); // true
console.log({}.hasOwnProperty("toString")); // false
