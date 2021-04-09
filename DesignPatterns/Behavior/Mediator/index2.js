// index2.js
// 格式化字符串
function formatString(str, data) {
  // 全局匹配 {#xxx#} -> xxx（数字，字母，下划线）
  return str.replace(/\{#(\w+)#\}/g, function (match, key) {
    return (data && data[key]) || "";
  });
}

// 基础导航
var Nav = function (data) {
  // 模板
  this.item = '<a href="{#href#}" title="{#title#}">{#name#}</a>';
  this.html = "";
  for (const v of data) {
    this.html += formatString(this.item, v);
  }
  return this.html;
};

// 信息导航
var NumNav = function (data) {
  // 模板
  var tpl = "<b>{#num#}</b>";
  for (let i = 0; i < data.length; i++) {
    data[i].name += formatString(tpl, data[i]);
  }
  return Nav.call(this, data);
};

// 网址导航
var LinkNav = function (data) {
  var tpl = "<span>{#link#}</span>";
  for (let i = 0; i < data.length; i++) {
    data[i].name += formatString(tpl, data[i]);
  }
  return Nav.call(this, data);
};

// 网址/消息导航
var LinkNumNav = function (data) {
  var tpl = "<span>{#link#}</span>";
  for (let i = 0; i < data.length; i++) {
    data[i].name += formatString(tpl, data[i]);
  }
  return NumNav.call(this, data);
};
