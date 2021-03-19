/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  if (left !== undefined) this.left = left;

  if (right !== undefined) this.right = right;
}

module.exports = obj = {
  // 数组转化为树
  getTree(arr) {
    return f(0);
    function f(n) {
      if (n > arr.length - 1) return;
      // n , 2n+1, 2n+2
      return new TreeNode(arr[n], f(2 * n + 1), f(2 * n + 2));
    }
  },
  // 深度优先算法（树转数组）
  dfs(tree) {
    if (!tree) return [];
    return f(tree, []);
    function f(cur, arr) {
      arr.push(cur.val);
      if (cur.left) f(cur.left, arr);
      if (cur.right) f(cur.right, arr);
      return arr;
    }
  },
  // a, b分别是主串和模式串
  kmp(a, b) {
    //n, m分别是主串和模式串的长度。
    n = a.length;
    m = b.length;
    next = getNexts(b);
    //指针i遍历主串，指针j遍历模式串
    let j = 0;
    for (let i = 0; i < n; ++i) {
      //有好前缀时，如果存在坏字符
      while (j > 0 && a[i] != b[j]) {
        //根据next，得出模式串的后移位数
        j = next[j - 1] + 1;
      }
      //好前缀
      if (a[i] == b[j]) {
        ++j;
      }
      //好前缀和模式串相同，找到了
      if (j == m) {
        return i - m + 1;
      }
    }
    return -1;
    //失效函数，求next数组（根据i-1的值计算i值）
    function getNexts(b) {
      const m = b.length;
      /**
      next数组
      下标：前缀结尾字符下标
      值：该前缀，最长可匹配前缀子串，的结尾字符下标
      */
      const next = [-1];
      //k为最长...，的结尾字符下标
      let k = -1;
      for (let i = 1; i < m; i++) {
        //最长...存在时，指针后移比较（根据i-1推导i，递归该过程）
        while (k != -1 && b[k + 1] != b[i]) {
          //取次大可匹配前缀子串，再次比较
          k = next[k];
        }
        if (b[k + 1] == b[i]) {
          k++;
        }
        next[i] = k;
      }
      return next;
    }
  },
};

// var tree = obj.getTree([3, 4, 5, 1, 2, null, 6]);
// console.log(tree);
// var arr = obj.dfs(tree);
// console.log(arr);
// console.log(obj.kmp("122334", "2233"));
// console.log(obj.kmp("122334", "22335"));
