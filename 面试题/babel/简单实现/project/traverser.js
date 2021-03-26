const traverser = (ast, visitor) => {
  // 如果节点是数组那么遍历数组
  debugger;
  const traverseArray = (array, parent) => {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  };

  // 遍历 ast 节点
  const traverseNode = (node, parent) => {
    const method = visitor[node.type];

    if (method) {
      method(node, parent);
    }

    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;

      case "VariableDeclaration":
        traverseArray(node.init.params, node.init);
        break;

      case "identifier":
        break;

      default:
        throw new TypeError(node.type);
    }
  };
  traverseNode(ast, null);
};
