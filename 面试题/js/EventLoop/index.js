async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");

/**
 * 第一次宏
 * console.log("script start");
 * console.log("async1 start");
 * console.log("async2");
 * console.log("promise1");
 * console.log("script end");
 * 微：await async2， resolve promise2
 * 宏：setTimeout
 */
/**
 * 第二次微
 * console.log("async1 end");
 * console.log("promise2");
 */
/**
 * 第三次宏
 * console.log("setTimeout");
 */
