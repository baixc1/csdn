const A = require("./index");
// 使用模版生成器，生成标签的默认模版
console.log(A.view("li")); // <li>{#li#}</li>
console.log(A.view(["h2", "p", "ul"])); // <h2>{#h2#}</h2><p>{#p#}</p><ul>{#ul#}</ul>
// 展示数据
var data = {
  lis: [
    {
      strong: "strong1",
      span: "(span1)",
    },
    {
      strong: "strong2",
      span: "(span2)",
    },
  ],
};
// 获取li元素模版
liTpl = A.formateStr(A.view("li"), {
  li: A.view(["strong", "span"]),
});
// <li><strong>{#strong#}</strong><span>{#span#}</span></li>
console.log(liTpl);
// 获取真正的li列表
const list = data.lis;
let ul = "";
for (var i = 0, len = list.length; i < len; i++) {
  if (list[i].em || list[i].span) {
    ul += A.formateStr(liTpl, list[i]);
  }
}
// <li><strong>strong1</strong><span>(span1)</span></li><li><strong>strong2</strong><span>(span2)</span></li>
console.log(ul);
