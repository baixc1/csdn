// index.js
// 获取兄弟元素名称
function getSublingName(node) {
  if (node.previousSibling) {
    var name = "",
      count = 1,
      nodeName = node.nodeName, // 节点名称
      sibling = node.previousSibling; // 返回当前节点的前一个兄弟节点
    while (sibling) {
      // 元素节点，类型相同，名称存在
      if (
        sibling.nodeType === 1 &&
        sibling.nodeType === node.nodeType &&
        sibling.nodeName
      ) {
        if (nodeName === sibling.nodeName) {
          // 名称相同，后缀数字+1
          name = String(++count);
        } else {
          // 名称不同，后缀加 '|' 和 名称
          count = 1;
          name = "|" + sibling.nodeName.toUpperCase();
        }
      }
      sibling = sibling.previousSibling;
    }
    return name;
  } else {
    return "";
  }
}

// xPath解释器（冒泡遍历节点树）
var Iterpreter = (function () {
  // 递归函数
  return function fn(node, wrap = document) {
    var path = [];
    // 终止条件一（目标节点等于容器节点）
    if (node === wrap) {
      if (wrap.nodeType === 1) {
        path.push(wrap.nodeName.toUpperCase());
      }
      return path;
    } else {
      // 当前节点的父节点 不等于 容器节点（递归操作）
      if (node.parentNode !== wrap) {
        path = fn(node.parentNode, wrap); // 递归，返回 path 数组
      }
      // 终止条件二（目标节点父节点等于容器节点）
      else {
        if (wrap.nodeType === 1) {
          path.push(wrap.nodeName.toUpperCase());
        }
      }
      // 统计当前节点元素信息
      if (node.nodeType === 1) {
        // 获取兄弟元素的统计
        var sublingsNames = getSublingName(node);
        path.push(node.nodeName.toUpperCase() + sublingsNames);
      }
      return path;
    }
  };
})();
