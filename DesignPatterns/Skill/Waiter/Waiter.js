// 等待者模式
// 原理：异步完成后，判断是否所有的异步任务均已完成（类似于轮循）
var Waiter = function () {
  // 变量
  var dfd = [], // 容器对象
    doneArr = [], // 成功回调队列
    failArr = [], // 失败回调队列
    slice = [].slice, // 数组原型slice方法
    that = this;

  // 实例成员
  // 实例化监控对象
  this.Deferred = function () {
    return new Promise();
  };
  // 监控异步方法
  this.when = function () {
    dfd = slice.call(arguments);
    for (var i = dfd.length - 1; i >= 0; i--) {
      // 如果监控对象不存在，或已结束，或不是Promise实例，则删除
      if (
        !dfd[i] ||
        dfd[i].status !== "pending" ||
        !dfd[i] instanceof Promise
      ) {
        dfd.splice(i, 1);
      }
    }
    return that;
  };
  // 添加成功回调
  this.done = function () {
    doneArr = [...doneArr, ...arguments];
    return that;
  };
  this.fail = function () {
    failArr = [...failArr, ...arguments];
    return that;
  };

  // 内部成员
  // 监控对象类
  var Promise = function () {
    // 状态（借用es6 Promise状态）
    this.status = "pending";
  };
  // 原型方法
  Promise.prototype = {
    // 变更状态方法
    resolve() {
      this.status = "resolved";
      // 没监控实例，返回
      if (!dfd.length) return;
      for (let i = dfd.length - 1; i >= 0; i--) {
        // 有一个异步任务未处理成功，则返回
        if (dfd[i] && dfd[i].status !== "resolved") {
          return;
        }
        // 清除监控对象
        dfd.splice(i, 1);
      }
      // 所有任务成功后执行
      _exec(doneArr);
    },
    reject() {
      this.status = "rejected";
      if (!dfd.length) return;
      // 清空所哟监控对象
      dfd = [];
      // 执行失败方法
      _exec(failArr);
    },
  };
  // 批量执行回调(私有方法)
  function _exec(arr) {
    let i = 0,
      len = arr.length;
    for (; i < len; i++) {
      try {
        arr[i] && arr[i]();
      } catch (e) {}
    }
  }
};

/**
 * 实现
 * 1. 生成异步对象（zero, first, second, third）
 * 2. when 方法 向容器中，添加正确的异步任务
 * 3. resolve和reject触发时，会遍历容器，清除已完成的监控对象
 * 4. 如果所有监控对象，都已resolved, 则调用成功回调
 * 5. 有一个reject，则走失败回调
 */

// 创建等待者对象
var waiter = new Waiter();

// 同步任务0
var zero = (function () {
  // 监控对象实例
  const p = waiter.Deferred();
  p.resolve();
  return p;
})();
// 模拟数据
zero.data = 0;
// 异步任务一
var first = (function () {
  // 监控对象实例
  const p = waiter.Deferred();
  setTimeout(function () {
    console.log("first done");
    // 模拟数据
    first.data = 1;
    p.resolve();
  }, 1000);
  return p;
})();
// 异步任务二
var second = (function () {
  // 监控对象实例
  const p = waiter.Deferred();
  setTimeout(function () {
    console.log("second done");
    // 模拟数据
    second.data = 2;
    p.resolve();
  }, 2000);
  return p;
})();
// 同步任务三
var third = (function () {
  // 监控对象实例
  const p = waiter.Deferred();
  p.resolve();
  return p;
})();
// 模拟数据
third.data = 3;
// 异步任务五
var four = (function () {
  // 监控对象实例
  const p = waiter.Deferred();
  setTimeout(function () {
    console.log("four fail");
    // 模拟数据
    four.data = 2;
    debugger;
    p.reject();
  }, 2000);
  return p;
})();
waiter
  .when(zero, first, second, third)
  .done(function () {
    console.log("success", zero, first, second, third);
  })
  .fail(function () {
    console.log("fail", zero, first, second, third);
  });
// waiter
//   .when(zero, first, four)
//   .done(function () {
//     console.log("success", zero, first, four);
//   })
//   .fail(function () {
//     console.log("fail", zero, first, four);
//   });
