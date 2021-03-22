// 分页器
// 获取页面的列表元素（最多显示5个）
var Flyweight = (function () {
  var created = [];
  function create() {
    var dom = document.createElement("div");
    document.getElementById("container").appendChild(dom);
    created.push(dom);
    return dom;
  }
  return {
    getDiv() {
      if (created.length < num) {
        return create();
      } else {
        const div = created.shift();
        created.push(div);
        return div;
      }
    },
  };
})();

var article = new Array(32)
  .fill(0)
  .map((item, index) => `我是第${index}个元素`);

var page = 0;
var num = 10;
var len = article.length;
for (var i = 0; i < num; i++) {
  if (article[i]) {
    Flyweight.getDiv().innerHTML = article[i];
  }
}

document.getElementById("next").onclick = function () {
  if (len < num) return;
  var n = (++page * num) % len; // 当前页的第一个新闻序号(新闻是首尾循环重复的)
  for (let j = 0; j < num; j++) {
    Flyweight.getDiv().innerHTML = article[n + j] || article[n + j - len];
  }
};
