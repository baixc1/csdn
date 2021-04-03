// 模块实现模块
var viewCommand = (function () {
  // 模板（变量：{#var#}）
  var tpl = {
    product: `
      <div>
        <img src="{#src#}" />
        <p>{#text#}</p>
      </div>
    `,
    title: `
      <div class="title">
        <div class="main">
          <h2>{#title#}</h2>
          <p>{#tips#}</p>
        </div>
      </div>
    `,
  };
  // 方法集合（通过key调用）
  var Action = {
    create(data, view) {
      // 数组
      if (data.length) {
        for (let v of data) {
          html += formatString(tpl[view], v);
        }
      } else {
        html += formatString(tpl[view], data);
      }
      return this; // 链式调用
    },
    display(container, data, view) {
      if (data) {
        this.create(data, view);
      }
      document.getElementById(container).innerHTML = html;
      html = "";
      return this; // 链式调用
    },
  };
  // 当前的 格式化字符串（可用作列表缓存数据拼接）
  var html = "";
  /**
   * 命令接口
   * cmd: Action 命令
   * params: 模版及其变量值，[data, view]
   */
  return function excute({ cmd, params }) {
    // 调用时，this绑定为Action(apply第二个参数为数组)
    Action[cmd].apply(Action, Array.isArray(params) ? params : [params]);
    return excute;
  };

  /**
   * 生成模版字符串
   * @function formatString
   * @param {string} str - 模版字符串
   * @param {object} obj - 变量对象
   * @return {string}  - 替换变量后的模版字符串
   */
  function formatString(str, obj) {
    return str.replace(/\{#(\w+)#\}/g, function (match, key) {
      return obj[key];
    });
  }
})();

var productData = [
  {
    src: "1.jpg",
    text: "text1",
  },
  {
    src: "2.jpg",
    text: "text2",
  },
  {
    src: "3.jpg",
    text: "text3",
  },
];

var titleData = {
  title: "夏日里的一片温馨",
  tips: "暖暖的温情带给人们家的感受",
};

viewCommand({
  cmd: "display",
  params: ["titleId", titleData, "title"], // display 参数
})({
  cmd: "create",
  params: [productData, "product"], // create参数，创建3个列表项
})({
  cmd: "display",
  params: [
    // 创建1个列表项，并展示
    "productId",
    {
      src: "4.jpg",
      text: "text4",
    },
    "product",
  ],
});
