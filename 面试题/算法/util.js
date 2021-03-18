/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

module.exports = {
  // 数组转化为树
  getTree(arr) {
    return f(0);
    function f(n) {
      if (n > arr.length - 1) return;
      // n , 2n+1, 2n+2
      return new TreeNode(arr[n], f(2 * n + 1), f(2 * n + 2));
    }
  },
};
