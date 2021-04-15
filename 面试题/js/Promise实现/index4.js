// 这里我们创建了一个构造函数 参数就是执行器
function Promise(exector) {
  // 这里我们将value 成功时候的值 reason失败时候的值放入属性中
  let self = this;
  // 这里我们加入一个状态标识
  this.status = "pending";
  this.value = undefined;
  this.reason = undefined;
  // 存储then中成功的回调函数
  this.onResolvedCallbacks = [];
  // 存储then中失败的回调函数
  this.onRejectedCallbacks = [];

  // 成功执行
  function resolve(value) {
    // 判断是否处于pending状态
    if (self.status === "pending") {
      self.value = value;
      // 这里我们执行之后需要更改状态
      self.status = "resolved";
      // 成功之后遍历then中成功的所有回调函数
      self.onResolvedCallbacks.forEach((fn) => fn());
    }
  }

  // 失败执行
  function reject(reason) {
    // 判断是否处于pending状态
    if (self.status === "pending") {
      self.reason = reason;
      // 这里我们执行之后需要更改状态
      self.status = "rejected";
      // 成功之后遍历then中失败的所有回调函数
      self.onRejectedCallbacks.forEach((fn) => fn());
    }
  }

  // 这里对异常进行处理
  try {
    exector(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  // debugger;
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (e) => {
          throw e;
        };
  let self = this;
  let promise2;
  promise2 = new Promise((resolve, reject) => {
    if (self.status === "resolved") {
      generateCallback()();
    }
    if (self.status === "rejected") {
      generateCallback("reject")();
    }
    if (self.status === "pending") {
      self.onResolvedCallbacks.push(generateCallback());
      self.onRejectedCallbacks.push(generateCallback("reject"));
    }
    // 回调函数生成器
    function generateCallback(type = "resolve") {
      return () => {
        console.log("setTimeout");
        setTimeout(() => {
          console.log("generateCallback");
          try {
            let x;
            if (type === "resolve") {
              x = onFulfilled(self.value);
            } else {
              x = onRejected(self.reason);
            }
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
    }
  });
  return promise2;
  function resolvePromise(promise2, x, resolve, reject) {
    // promise2和函数执行后返回的结果是同一个对象

    if (promise2 === x) {
      return reject(new TypeError("Chaining cycle"));
    }
    let called;
    // x可能是一个promise 或者是一个普通值
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      try {
        let then = x.then; // 取对象上的属性 怎么能报异常呢？(这个promise不一定是自己写的 可能是别人写的 有的人会乱写)
        // x可能还是一个promise 那么就让这个promise执行即可
        // {then:{}}
        // 这里的逻辑不单单是自己的 还有别人的 别人的promise 可能既会调用成功 也会调用失败
        if (typeof then === "function") {
          then.call(
            x,
            (y) => {
              // 返回promise后的成功结果
              // 递归直到解析成普通值为止
              if (called) return; // 防止多次调用
              called = true;
              // 递归 可能成功后的结果是一个promise 那就要循环的去解析
              resolvePromise(promise2, y, resolve, reject);
            },
            (err) => {
              // promise的失败结果
              if (called) return;
              called = true;
              reject(err);
            }
          );
        } else {
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      // 如果x是一个常量
      resolve(x);
    }
  }
};
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};

new Promise((resolve) => {
  resolve(1);
})
  .then((v) => {
    console.log(v);
    return 2;
  })
  .then((v) => {
    console.log(v);
    return Promise.resolve(3);
  })
  .then((v) => {
    console.log(v);
    return new Promise((resolve) => {
      setTimeout(() => resolve(4), 1000);
    });
  })
  .then((v) => console.log(v));
/**
 * 执行栈
 */
/**
 * 第一次宏任务
 * new Promise() -> Promise -> exector回调 -> resolve回调
 * 原型then -> Promise -> exector回调 (resolved状态生成定时器（宏任务模拟微任务then）)
 * 原型then -> Promise -> exector回调（pending状态添加resolved/rejected队列回调）
 */
/**
 * 第二次宏任务（定时器回调）
 * 闭包获取值（局部变量）
 * 回调 -> onFulfilled（默认）-> resolvePromise（递归，resolve一个具体值）-> resolve() -> onResolvedCallbacks队列执行回调 -> 生成定时器宏
 */
/**
 * 第三次宏任务（定时器回调）
 * 类似
 */
