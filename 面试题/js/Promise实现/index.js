// 这里我们创建了一个构造函数 参数就是执行器
function Promise(exector) {
  // 这里我们将value 成功时候的值 reason失败时候的值放入属性中
  let self = this;
  // 这里我们加入一个状态标识
  this.status = "pending";
  this.value = undefined;
  this.reason = undefined;

  // 成功执行
  function resolve(value) {
    // 判断是否处于pending状态
    if (self.status === "pending") {
      self.value = value;
      // 这里我们执行之后需要更改状态
      self.status = "resolved";
    }
  }

  // 失败执行
  function reject(reason) {
    // 判断是否处于pending状态
    if (self.status === "pending") {
      self.reason = reason;
      // 这里我们执行之后需要更改状态
      self.status = "rejected";
    }
  }

  // 这里对异常进行处理
  try {
    exector(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 我们将then方法添加到构造函数的原型上 参数分别为成功和失败的回调

Promise.prototype.then = function (onFulfilled, onRejected) {
  // 获取下this
  let self = this;
  if (this.status === "resolved") {
    onFulfilled(self.value);
  }

  if (this.status === "rejected") {
    onRejected(self.reason);
  }
};

let promise = new Promise((resolve, reject) => {
  debugger;
  resolve("haha");
});

promise.then(
  (data) => {
    console.log(data); //输出 haha
  },
  (err) => {
    console.log(err);
  }
);

// 多次调用
promise.then(
  (data) => {
    console.log(data); //输出 haha
  },
  (err) => {
    console.log(err);
  }
);
