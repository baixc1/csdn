/**
 * [createElement 用来创建DOM节点]
 * @param  {[type]} type     [元素类型（名称）]
 * @param  {[type]} props    [描述信息]
 * @param  {[type]} children [子节点]
 * @return {[type]}          [description]
 */
function createElement(type, props, children) {
  // 返回一个Element对象。
  return new Element(type, props, children);
}

class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

/**
 * [createNode 创建单个元素]
 * @param  {[type]} node [元素节点]
 * @return {[type]}      [真实的DOM元素]
 */
function createNode(node) {
  // 根据类型创建元素
  let el = document.createElement(node.type);
  for (key in node.props) {
    // 遍历属性
    if (key === "value") {
      // 只有input还有textarea需要value属性
      if (
        node.type.toUpperCase() === "INPUT" ||
        node.type.toUpperCase() === "TEXTAREA"
      ) {
        el.value = node.props[key];
      }
    } else {
      // 设置属性
      el.setAttribute(key, node.props[key]);
    }
  }
  return el;
}

// 创建DOM树
function createDom(node) {
  let root = createNode(node); // 当前节点
  if (node.children && node.children.length > 0) {
    // 遍历子元素
    node.children.forEach(function (element) {
      if (element instanceof Element) {
        // 节点
        root.appendChild(createDom(element));
      } else {
        // 文本
        root.appendChild(document.createTextNode(element));
      }
    });
  }
  return root;
}
const ATTR = 0; // 属性
const TEXT = 1; // 文本
const REMOVE = 2; // 删除
const REPLACE = 3; // 替换

// diff 算法：计算虚拟dom差异
function diff(oldNode, newNode) {
  let patches = {}; // 补丁对象
  let index = 0; // 全局的位置索引（节点遍历的顺序）

  walk(oldNode, newNode, index); // 遍历两个虚拟DOM树
  return patches;

  // 遍历的过程
  function walk(oldNode, newNode, index) {
    // 每一步的补丁
    let patch = [];
    // 如果没有新节点，说明删除了，标记处删除的索引
    if (!newNode) {
      patch.push({ type: REMOVE, index });
    }
    // 如果都是文本
    else if (typeof oldNode === "string" && typeof newNode === "string") {
      // 如果文本内容不一样
      if (newNode !== oldNode) {
        patch.push({ type: TEXT, text: newNode });
      }
    }
    // 如果类型相同就比较属性， 类型不相同默认换掉了整个元素
    else if (oldNode.type === newNode.type) {
      // 遍历新老节点属性的不同
      let attr = diffAttr(oldNode.props, newNode.props);
      // 如果有不同， 就加入patch中
      if (Object.keys(attr).length > 0) {
        patch.push({ type: ATTR, attr });
      }
      // 遍历子节点
      diffChildren(oldNode.children, newNode.children);
    }
    // 其余情况为替换
    else {
      patch.push({ type: REPLACE, newNode });
    }
    if (patch.length > 0) {
      patches[index] = patch;
    }
  }

  // 遍历属性（差属性被删除）
  function diffAttr(oldAttr, newAttr) {
    let attr = {};
    // 看两个属性是否不同（修改）
    for (key in oldAttr) {
      if (oldAttr[key] != newAttr[key]) {
        attr[key] = newAttr[key];
      }
    }
    // 是否新增
    for (key in newAttr) {
      if (!oldAttr.hasOwnProperty(key)) {
        attr[key] = newAttr[key];
      }
    }
    return attr;
  }

  //遍历子节点（未考虑新增节点的情况）
  function diffChildren(oldChildren, newChildren) {
    oldChildren.forEach(function (child, i) {
      // 子节点递归遍历属性
      walk(child, newChildren[i], ++index);
    });
  }
}

let vDom1 = createElement("div", { class: "A" }, [
  createElement("div", { class: "B" }, [
    createElement("div", { class: "D" }, ["xx"]),
    createElement("div", { class: "E" }, ["xx"]),
  ]),
  createElement("div", { class: "C" }, [
    createElement("div", { class: "F" }, ["xx"]),
    createElement("div", { class: "G" }, ["xx"]),
  ]),
]);
let vDom2 = createElement("div", { class: "A1" }, [
  createElement("div", { class: "B1" }, [
    createElement("div", { class: "D1" }, ["xx"]),
    createElement("div", { class: "E1" }, ["xx"]),
  ]),
  createElement("div", { class: "C1" }, [
    createElement("div", { class: "F1" }, ["xx"]),
    createElement("div", { class: "G1" }, ["xx"]),
  ]),
]);
// 所有的补丁
var patches = diff(vDom1, vDom2);
// 遍历所有补丁的指针
let patchIndex = 0;

// 第一次渲染
var dom = createDom(vDom1);
document.getElementsByTagName("body")[0].appendChild(dom);

// diff + patch 渲染
walkPatch(dom);

// 打补丁（patch）
function walkPatch(dom) {
  // 获取当前节点的补丁
  let patch = patches[patchIndex++];
  // 获取子节点
  let children = dom.childNodes;
  // 遍历子节点
  // 遍历到最后一个元素，从后往前打补丁（左右中）
  children.forEach((child) => walkPatch(child));
  // 如果有补丁，就打补丁
  if (patch) {
    console.log(patch); // D -> E -> B -> F -> G -> C -> A
    doPatch(dom, patch);
  }
}

function doPatch(node, patch) {
  patch.forEach((p) => {
    switch (p.type) {
      case ATTR:
        // 遍历属性
        for (key in p.attr) {
          let value = p.attr[key];
          // 如果有值（其实就是上一篇虚拟DOM中的设置属性）
          if (value) {
            if (key === "value") {
              if (
                node.type.toUpperCase() === "INPUT" ||
                node.type.toUpperCase() === "TEXTAREA"
              ) {
                node.value = value;
              }
            } else {
              node.setAttribute(key, value);
            }
            // 没有值，就是删除属性
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case TEXT:
        // 替换文本节点
        node.textContent = p.text;
        break;
      case REMOVE:
        // 删除自己
        node.parentNode.removeChild(node);
        break;
      case REPLACE:
        let { newNode } = p;
        // 如果是元素就创建元素否则就是文本
        newNode =
          newNode instanceof Element
            ? createDom(newNode)
            : document.createTextNode(newNode);
        // 用新节点替换旧结点
        newNode.parentNode.replaceChild(newNode, node);
        break;
      default:
        break;
    }
  });
}
