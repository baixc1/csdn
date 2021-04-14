const p = function () {
  return new Promise((resolve, reject) => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve(1);
        console.log(p1);
      }, 0);
      // resolve(2);
      return 2;
    });
    console.log(3);
    resolve(4);
    p1.then((res) => {
      console.log(res);
    });
  });
};

p().then((res) => {
  console.log(res);
});
console.log("end");

/**
 * 第一次宏
 * console.log(3);
 * console.log("end");
 * 宏：setTimeout1
 * 微：resolve(2)（设置后不可变）, resolve(4);
 */
/**
 * 第一次微
 * console.log(2);
 * console.log(4);
 * 宏：setTimeout1
 */
/**
 * 第一次宏
 */
