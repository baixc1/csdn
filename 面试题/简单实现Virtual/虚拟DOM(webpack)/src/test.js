import Element from "./element";
import diff from "./diff";
import patch from "./patch";

// 1.构建虚拟DOM
const tree = new Element("div", { classname: "div" }, [
  new Element("h1", { style: "color: red;" }, [
    "Hello, This is my Vdom library",
  ]),
  new Element("p", { style: "color: blue;" }, ["extra text"]),
  new Element("ul", [new Element("li", ["1111"]), new Element("li", ["2222"])]),
]);

// 2.通过虚拟DOM构建真正的DOM
const $dom = tree.render();
const $app = document.querySelector("#app");
$app.replaceWith($dom);

// 3.生成新的虚拟DOM
const newTree = new Element("div", { id: "div1" }, [
  new Element("h1", { style: "color: red;" }, [
    "Hello, This is my vdom library111",
  ]),
  new Element("p", { style: "color: blue;" }, ["extra text"]),
  new Element("ul", [
    new Element("li", ["1111"]),
    new Element("li", ["5555"]),
    new Element("li", ["333"]),
  ]),
]);

console.log(tree, newTree);
// 4.比较新旧虚拟DOM树的差异
const patches = diff(tree, newTree);

console.log(patches);
// 5.根据变化了的部分去更新DOM
setTimeout(() => {
  patch($dom, patches);
}, 3000);
