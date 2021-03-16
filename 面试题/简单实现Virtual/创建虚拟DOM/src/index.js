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

document
  .getElementsByTagName("body")[0]
  .appendChild(
    createDom(
      createElement("ul", { class: "dawd" }, [
        createElement("li", { class: "dawd" }, ["1"]),
        createElement("li", { class: "dawd" }, ["2"]),
        createElement("li", { class: "dawd" }, ["3"]),
      ])
    )
  );

document
  .getElementsByTagName("body")[0]
  .appendChild(
    createDom(
      createElement("ul", { class: "dawd" }, [
        createElement("li", { class: "dawd" }, [
          createElement("input", { type: "radio", value: "1651" }, []),
          createElement("input", { type: "text", value: "1651" }, []),
        ]),
      ])
    )
  );

document
  .getElementsByTagName("body")[0]
  .appendChild(
    createDom(
      createElement("div", { class: "div" }, [
        createElement("ul", { class: "ul" }, [
          createElement("li", { class: "li" }, [
            createElement("input", { type: "radio", value: "1651" }, ["单选"]),
          ]),
          createElement("li", { class: "li" }, [
            createElement("input", { type: "text", value: "1651" }, []),
          ]),
        ]),
        createElement("div", { class: "div" }, [
          createElement("p", { class: "p" }, [
            createElement("span", { class: "span" }, ["我是span"]),
          ]),
          createElement(
            "a",
            {
              class: "a",
              href: "https://juejin.im/editor/drafts/5cf3c75de51d45572c05fff3",
            },
            [createElement("span", { class: "span" }, ["我是超链接里面的span"])]
          ),
          createElement(
            "img",
            {
              class: "img",
              src:
                "http://g.hiphotos.baidu.com/image/h%3D300/sign=b5e4c905865494ee982209191df4e0e1/c2cec3fdfc03924590b2a9b58d94a4c27d1e2500.jpg",
              alt: "虚拟DOM图片",
              title: "虚拟的DOM",
            },
            []
          ),
        ]),
      ])
    )
  );
