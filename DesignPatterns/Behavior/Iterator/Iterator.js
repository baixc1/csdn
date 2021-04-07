/**
 * 迭代器（简化遍历/访问操作）
 * @param {string} containerId - 容器元素id
 * @param {string} subTag - 容器子元素 tag
 * @returns
 */
var Iterator = function (containerId, subTag) {
  const container = document.getElementById(containerId);
  const items = container.getElementsByTagName(subTag);
  const len = items.length;
  let index = 0; // 当前访问的元素的索引

  return {
    // 获取第一个元素
    first() {
      index = 0;
      return items[index];
    },
    // 获取最后一个元素
    last() {
      index = len - 1;
      return items[index];
    },
    // 上一个（负数取第一个）
    pre() {
      if (--index > 0) {
        return items[index];
      } else {
        index = 0;
        return null;
      }
    },
    // 下一个
    next() {
      if (++index < length) {
        return items[index];
      } else {
        index = length - 1;
        return null;
      }
    },
    // 获取第 n 个元素（负数和超过len时，转化为0 -> len-1）
    get(num) {
      index = num > 0 ? num % length : (num % length) + length;
    },
    // 处理每个元素, 回调函数 + 参数
    dealEach(fn, ...params) {
      [...items].forEach((item) => {
        fn.apply(item, params);
      });
    },
    // 处理某个元素，元素下标 + 回调函数 + 参数
    dealItem(num, fn, ...params) {
      fn.apply(items[num], params);
    },
    // 排他方式处理元素，元素下标(number/array) + 处理全部元素的回调 + 处理num元素的回调
    exclusive(num, allFn, numFn) {
      this.dealEach(allFn);
      if (Array.isArray(num)) {
        for (let v of num) {
          this.dealItem(v, numFn);
        }
      } else {
        this.dealItem(num, numFn);
      }
    },
  };
};
