/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.nums = nums;
  this.origin = [...nums];
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  return [...this.origin];
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  // 方法一： 暴力
  // const newArr = [];
  // const list = [...this.nums];
  // while (list.length) {
  //   const random = Math.floor(Math.random() * list.length);
  //   newArr.push(list.splice(random, 1)[0]);
  // }
  // return newArr;

  // 方法二： Fisher-Yates 洗牌算法
  // 选取下标范围的依据在于每个被摸出的元素都不可能再被摸出来了
  const list = this.nums;
  const len = list.length;
  let temp;
  for (let i = 0; i < len; i++) {
    const random = Math.floor(Math.random() * (len - i)) + i;
    temp = list[i];
    list[i] = list[random];
    list[random] = temp;
  }
  return list;
};

// ["Solution","shuffle","reset","shuffle"]
var s = new Solution([1, 2, 3]);
console.log(s.shuffle());
console.log(s.shuffle());
console.log(s.shuffle());
