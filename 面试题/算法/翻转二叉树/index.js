const { getTree } = require("../util");
console.log(invertTree(getTree([4, 2, 7, 1, 3, 6, 9])));
function invertTree(root) {
  if (root) {
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  }
  return root;
}
