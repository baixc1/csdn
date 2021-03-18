/**
 * 方法一：深度优先搜索
 * 如果我们知道了左子树和右子树的最大深度 l 和 r，那么该二叉树的最大深度即为
      max(l,r)+1
 */
var maxDepth = function (root) {
  return !root ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

/**
 * 方法二：广度优先搜索
 */

var maxDepth = function (root) {
  if (!root) return 0;
  const arr = [root]; // 队列
  let max = 0;
  // 队列为空时，遍历了所有
  while (arr.length) {
    max++;
    let sz = arr.length;
    while (sz > 0) {
      const cur = arr.shift();
      if (cur.left) arr.push(cur.left);
      if (cur.right) arr.push(cur.right);
      sz--;
    }
  }
  return max;
};

const { getTree } = require("../util");
console.log(maxDepth(getTree([3, 4, 5, 1, 2, null, 6, 7])));
