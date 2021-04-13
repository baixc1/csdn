// 全局作用域
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i); // 5个5
  });
}
console.log("全局作用域", i); // 5

// 块级作用域
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("块级作用域", i); // 0 - 4
  });
}

// 函数作用域
for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(() => {
      console.log("函数作用域", j); // 0 - 4
    });
  })(i);
}
