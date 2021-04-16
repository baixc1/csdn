// index.js

// 需求：本地存储封装

/**
 * 本地存储类
 * @param {string} preId 前缀id
 * @param {string} timeSign 拼接时间戳与数据之间的连接符
 */
var BaseLocalStorage = function (preId, timeSign) {
  this.preId = preId;
  this.timeSign = timeSign || "|-|";
};

BaseLocalStorage.prototype = {
  // 操作状态
  status: {
    SUCCESS: 0,
    FAIL: 1,
    OVERFLOW: 2,
    TIMEOUT: 3,
  },
  storage: localStorage,
  getKey(key) {
    return this.preId + key;
  },
  // 添加/修改数据
  set(key, value, callback, time) {
    // 默认状态
    var status = this.status.SUCCESS,
      key = this.getKey(key);
    try {
      // time 为日期对象或者时间戳
      time = new Date(time).getTime() || time.getTime();
    } catch (e) {
      // 默认时间30天
      time = new Date().getTime() + 1000 * 3600 * 24 * 30;
    }
    try {
      this.storage.setItem(key, time + this.timeSign + value);
    } catch (e) {
      // 溢出失败
      status = this.status.OVERFLOW;
    }
    // 回调
    callback && callback.call(this, status, key, value);
  },
  // 获取数据
  get(key, callback) {
    var status = this.status.SUCCESS,
      key = this.getKey(key),
      // 默认值
      value = null,
      timeSignLen = this.timeSign.length,
      // 拼接符在数据中的起始位置
      index,
      // 时间戳
      time,
      // 最终数据
      result;
    try {
      value = this.storage.getItem(key);
    } catch (e) {
      console.log(this);
      result = {
        status: this.status.FAIL,
        value: null,
      };
      callback && callback.call(this, result.status, result.value);
      return result;
    }
    if (value) {
      index = value.indexOf(this.timeSign);
      time = +value.slice(0, index);
      if (time > new Date().getTime()) {
        value = value.slice(index + timeSignLen);
      } else {
        value = null;
        // 过期
        status = this.status.TIMEOUT;
        this.remove(key);
      }
    } else {
      status = this.status.FAIL;
    }
    result = {
      status,
      value,
    };
    callback && callback.call(this, result.status, result.value);
    return result;
  },
  // 删除数据
  remove(key, callback) {
    var status = this.status.FAIL,
      key = this.getKey(key),
      value = null;
    try {
      value = this.storage.getItem(key);
    } catch (e) {}
    if (value) {
      try {
        this.storage.removeItem(key);
        status = this.status.SUCCESS;
      } catch (e) {}
    }
    // 操作成功，返回真实数据
    callback &&
      callback.call(
        this,
        status,
        status > 0
          ? null
          : value.slice(value.indexOf(this.timeSign) + this.timeSign.length)
      );
  },
};

var ls = new BaseLocalStorage("ls_", "---");
ls.set("a", "a de value", (...list) => {
  console.log(list); // [0, "ls_a", "a de value"]
});
ls.get("a", function () {
  console.log(arguments); // Arguments(2) [0, "a de value", callee: ƒ, Symbol(Symbol.iterator): ƒ]
});
ls.remove("a", function () {
  console.log(arguments); // Arguments(2) [0, "a de value", callee: ƒ, Symbol(Symbol.iterator): ƒ]
});
ls.remove("a", function () {
  console.log(arguments); // Arguments(2) [1, null, callee: ƒ, Symbol(Symbol.iterator): ƒ]
});
ls.get("a", function () {
  console.log(arguments); // Arguments(2) [1, null, callee: ƒ, Symbol(Symbol.iterator): ƒ]
});
ls.set(
  "b",
  "b value",
  (...list) => {
    console.log(list); // [0, "ls_b", "b value"]
  },
  Date.now() + 100
);
ls.get("b", (...list) => {
  console.log(list); // [0, "b value"]
});
setTimeout(() => {
  ls.get("b", (...list) => {
    console.log(list); // [3, null]
  });
}, 200);
