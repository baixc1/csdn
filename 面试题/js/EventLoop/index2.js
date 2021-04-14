console.log("start");
// setTimeout1
setTimeout(() => {
  console.log("children2");
  // Promise1
  Promise.resolve().then(() => {
    console.log("children3");
  });
}, 0);

// Promise2
new Promise(function (resolve, reject) {
  console.log("children4");
  // setTimeout2
  setTimeout(function () {
    console.log("children5");
    resolve("children6");
  }, 0);
}).then((res) => {
  console.log("children7");
  // setTimeout3
  setTimeout(() => {
    console.log(res);
  }, 0);
});

/**
 * 第一次宏
 * console.log("start");
 * console.log("children4");
 * 宏：setTimeout1, setTimeout2
 */
/**
 * 第二次宏setTimeout1
 * console.log("children2");
 * console.log("children3");
 * 宏： setTimeout2
 */
/**
 * 第三次宏setTimeout2
 * console.log("children5");
 * console.log("children7");
 * 宏： setTimeout3
 */
/**
 * 第四次宏setTimeout3
 * console.log("children6");
 */
