// 对象以数组形式展示
var obj = Object.create({
  splice() {},
});
Object.assign(obj, {
  length: 1,
});
console.log(obj); // 浏览器测试
