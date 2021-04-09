// index3.js
// 扩展对象原型：新增数组方法（类数组对象）
// arguments除了length属性和索引元素之外没有任何Array属性
Object.prototype = Object.assign(Object.prototype, {
  splice() {
    // const params = Array.prototype.slice.call(arguments)
    // const params = [...arguments]
    // const params = Array.from(arguments);
    // this指向对象实例，不需转化arguments为数组，自动添加length属性
    return Array.prototype.splice.apply(this, arguments);
  },
  push() {
    // this.length += (this.length || 0) + arguments.length;
    return Array.prototype.push.apply(this, arguments);
  },
  pop() {
    return Array.prototype.pop.apply(this);
  },
});

const obj = {};
console.log(obj); // {}
console.log(obj.push(1, 2, 3, 4)); // 4
console.log(obj); // { '0': 1, '1': 2, '2': 3, '3': 4, length: 4 }
console.log(obj.splice(1, 1, 6, 7, 8)); // [ 2 ]
console.log(obj); // { '0': 1, '1': 6, '2': 7, '3': 8, '4': 3, '5': 4, length: 6 }
console.log(obj.pop()); // 4
console.log(obj); // { '0': 1, '1': 6, '2': 7, '3': 8, '4': 3, length: 5 }
console.log(Object.prototype);
