const { getTree } = require("../util");

console.log(isSameTree(getTree([1, 2]), getTree([1, null, 2])));
// console.log(isSameTree(getTree([1, 2, 3]), getTree([1, 2, 2])));
// console.log(isSameTree(getTree([1, null, 2]), getTree([1, null, 2])));
// 方法一：深度优先搜索
function isSameTree1(p, q) {
  if (p === q) return true;
  if (!p || !q) {
    return false;
  }
  return (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
}

// 方法二：广度优先搜索（队列）
function isSameTree(p, q) {
  console.log(p, q);
  if (p === q) return true;
  if (!p || !q) return false;
  var a1 = [p];
  var a2 = [q];
  while (a1.length && a2.length) {
    var n1 = a1.shift();
    var n2 = a2.shift();
    if (n1.val !== n2.val) return false;
    if (n1.left !== n2.left) {
      if (!n1.left || !n2.left) {
        return false;
      }
    }
    if (n1.right !== n2.right) {
      if (!n1.right || !n2.right) {
        return false;
      }
    }
    if (n1.left) a1.push(n1.left);
    if (n1.right) a1.push(n1.right);
    if (n2.left) a2.push(n2.left);
    if (n2.right) a2.push(n2.right);
  }
  // 空
  return a1.length === a2.length;
}
