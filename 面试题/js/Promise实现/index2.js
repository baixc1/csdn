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

// then 改造

Promise.prototype.then = function (onFulfilled, onRejected) {
  // 获取下this
  let self = this;
  if (this.status === "resolved") {
    onFulfulled(self.value);
  }

  if (this.status === "rejected") {
    onRejected(self.reason);
  }

  // 如果异步执行则位pending状态
  if (this.status === "pending") {
    // 保存回调函数
    this.onResolvedCallbacks.push(() => {
      onFulfilled(self.value);
    });

    this.onRejectedCallbacks.push(() => {
      onRejected(self.reason);
    });
  }
};

// 这里我们可以再次实验

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("成功");
    } else {
      reject("失败");
    }
  });
});

promise.then(
  (data) => {
    console.log("success" + data);
  },
  (err) => {
    console.log("err" + err);
  }
);
