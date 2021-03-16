import Element from "./element";

const tree = new Element("div", { classname: "div" }, [
  new Element("h1", { style: "color: red;" }, [
    "Hello, This is my Vdom library",
  ]),
  new Element("ul", [new Element("li", ["1111"]), new Element("li", ["2222"])]),
]);
const $dom = tree.render();
console.log(111, $dom);
