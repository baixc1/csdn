import patch from "./patch";
function diff(oldTree, newTree) {
  const patches = {};
  const index = {
    value: 0,
  };
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
}
// 比较属性的变化
function diffProps(oldProps, newProps, index, currentIndexPatches) {
  // 遍历旧的属性,找到被删除和修改的情况
  for (const propKey in oldProps) {
    // 新属性中不存在,旧属性存在,属性被删除
    if (!newProps.hasOwnProperty(propKey)) {
      currentIndexPatches.push({
        type: patch.NODE_ATTRIBUTE_DELETE,
        key: propKey,
      });
    } else if (newProps[propKey] !== oldProps[propKey]) {
      // 新旧属性中都存在,但是值不同: 属性被修改
      currentIndexPatches.push({
        type: patch.NODE_ATTRIBUTE_MODIFY,
        key: propKey,
        value: newProps[propKey],
      });
    }
  }

  // 遍历新元素,找到添加的部分
  for (const propKey in newProps) {
    // 旧属性中不存在,新属性中存在: 添加属性
    if (!oldProps.hasOwnProperty(propKey)) {
      currentIndexPatches.push({
        type: patch.NODE_ATTRIBUTE_ADD,
        key: propKey,
        value: newProps[propKey],
      });
    }
  }
}
// 顺序比较子元素的变化（未实现数组元素的key比较）
function diffChildren(
  oldChildren,
  newChildren,
  index,
  currentIndexPatches,
  patches
) {
  if (oldChildren.length < newChildren.length) {
    // 有元素被添加
    let i = 0;
    for (; i < oldChildren.length; i++) {
      console.log("oldChildren,index.value", index.value);
      index.value++;
      dfsWalk(oldChildren[i], newChildren[i], index, patches);
    }
    for (; i < newChildren.length; i++) {
      currentIndexPatches.push({
        type: patch.NODE_ADD,
        value: newChildren[i],
      });
    }
  } else {
    // 对比新旧子元素的变化
    for (let i = 0; i < oldChildren.length; i++) {
      console.log("newChildren.index.value", index.value);
      index.value++;
      dfsWalk(oldChildren[i], newChildren[i], index, patches);
    }
  }
}
// 比较innerHTML的变化
function dfsWalk(oldNode, newNode, index, patches) {
  const currentIndex = index.value;
  const currentIndexPatches = [];
  if (newNode === undefined) {
    // 节点被移除
    currentIndexPatches.push({
      type: patch.NODE_DELETE,
    });
  } else if (typeof oldNode === "string" && typeof newNode === "string") {
    // 文本节点被修改
    if (oldNode !== newNode) {
      currentIndexPatches.push({
        type: patch.NODE_TEXT_MODIFY,
        value: newNode,
      });
    }
  } else if (
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    // 同时根据tagName和key来进行对比
    diffProps(oldNode.props, newNode.props, index, currentIndexPatches);
    diffChildren(
      oldNode.children,
      newNode.children,
      index,
      currentIndexPatches,
      patches
    );
  } else {
    currentIndexPatches.push({
      type: patch.NODE_REPLACE,
      value: newNode,
    });
  }
  if (currentIndexPatches.length > 0) {
    console.log("currentIndex", currentIndex);
    patches[currentIndex] = currentIndexPatches;
  }
}

export default diff;
