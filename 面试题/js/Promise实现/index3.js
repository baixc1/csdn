Promise.prototype.then = function (onFulfilled, onRejected) {
  // 获取下this
  let self = this;
  // 因为then方法返回的是一个promise，这里我们新建一个promise
  let promise2 = new Promise((resolve, reject) => {
    if (this.status === "resolved") {
      //获取回调的返回值
      try {
        // 当执行成功回调的时候 可能会出现异常，那就用这个异常作为promise2的错误的结果
        let x = onFulfilled(self.value);
        //执行完当前成功回调后返回结果可能是promise
        resolvePromise(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }

    if (this.status === "rejected") {
      //获取回调的返回值
      try {
        let x = onRejected(self.reason);
        resolvePromise(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }

    // 如果异步执行则位pending状态
    if (this.status === "pending") {
      // 保存回调函数
      this.onResolvedCallbacks.push(() => {
        //获取回调的返回值
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });

      this.onRejectedCallbacks.push(() => {
        //获取回调的返回值
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }
  });

  return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
  // promise2和函数执行后返回的结果是同一个对象

  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle"));
  }
  // x可能是一个promise 或者是一个普通值
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      // 取对象上的属性 怎么能报异常呢？(这个promise不一定是自己写的 可能是别人写的 有的人会乱写)
      // x可能还是一个promise 那么就让这个promise执行即可
      // {then:{}}
      // 这里的逻辑不单单是自己的 还有别人的 别人的promise 可能既会调用成功 也会调用失败
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            // 返回promise后的成功结果
            // 递归直到解析成普通值为止
            // 递归 可能成功后的结果是一个promise 那就要循环的去解析
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            // promise的失败结果
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    // 如果x是一个常量
    resolve(x);
  }
}
