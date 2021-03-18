const { getTree } = require("../util");
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
// 方法一：深度优先搜索暴力匹配
var isSubtree = function (s, t) {
  return dfs(s, t);
  function dfs(s, t) {
    // s 不存在时，不是子树
    if (!s) return false;
    // 比较 s,t 是否是子-父树关系
    // 然后 比较子节点
    return check(s, t) || dfs(s.left, t) || dfs(s.right, t);
  }
  // 递归比较两棵树
  function check(s, t) {
    if (!s && !t) {
      return true;
    } else if (!s || !t || s.val !== t.val) {
      return false;
    } else {
      return check(s.left, t.left) && check(s.right, t.right);
    }
  }
};
console.log(getTree([3, 4, 5, 1, 2, null, 6]));
console.log(isSubtree(getTree([3, 4, 5, 1, 2, null, 6]), getTree([4, 1, 2])));

// 方法二：深度优先搜索序列上做串匹配（null补全）
// kpm 算法匹配字串

// 获取先序遍历的数组

const s = getTree([3, 4, 5, 1, 2, null, 6]);
const t = getTree([4, 1, 2]);

var isSubtree = function (s, t) {};
