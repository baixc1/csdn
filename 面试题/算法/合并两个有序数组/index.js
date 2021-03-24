/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 不借助新数组，从后往前遍历(原地排序)
var merge = function (nums1, m, nums2, n) {
  const len1 = nums1.length;
  // 双指针
  let p = m - 1;
  let q = n - 1;
  for (var i = len1 - 1; i >= 0; i--) {
    if (q < 0) break;
    if (p < 0 || nums1[p] < nums2[q]) {
      nums1[i] = nums2[q];
      q--;
    } else {
      nums1[i] = nums1[p];
      p--;
    }
  }
};
// const a1 = [1, 2, 3, 0, 0, 0];
// merge(a1, 3, [2, 5, 6], 3);
// console.log(a1);
const a1 = [0];
merge(a1, 0, [1], 1);
console.log(a1);
