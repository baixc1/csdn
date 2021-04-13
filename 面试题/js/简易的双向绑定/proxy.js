let el = document.getElementById("app"); // 模拟el
let data = { _username: "Tom" }; // 模拟data对象
let template = el.innerHTML; // 获取el里面的字符串模板，方便以后替换

function render() {
  // 初始渲染先替换DOM里面的模板
  el.innerHTML = template.replace(/{{\s+[\w.]+\s+}}/g, (str) => {
    str = str.slice(2, str.length - 2).trim();
    return data[str];
  });
  //双向绑定
  // 获取所有带`v-model`属性的input元素
  Array.from(el.getElementsByTagName("input"))
    .filter((element) => element.getAttribute("v-model"))
    .forEach((input) => {
      // 为每个input元素进行双向绑定
      let bindData = input.getAttribute("v-model");
      // 监听input时间，动态把input数据传入data
      input.addEventListener(
        "input",
        function () {
          p1[bindData] = this.value;
        },
        false
      );
      // 将data的数据绑定到DOM
      input.value = data[bindData];
    });
}

const p1 = new Proxy(data, {
  get(obj, prop) {
    return obj[prop];
  },
  set(obj, prop, newval) {
    obj[prop] = newval;
    render();
  },
});
// Object.defineProperty(data, "username", {
//   enumerable: true,
//   configurable: true,
//   get() {
//     return this._username;
//   },
//   set(value) {
//     this._username = value;
//     render();
//   },
// });
p1.username = "1";
