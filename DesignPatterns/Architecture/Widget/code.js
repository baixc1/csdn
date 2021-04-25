function f(templateData) {
  var templates = [];
  var fn = (function (data) {
    var temKey = "";
    for (key in data) {
      temKey += "var " + key + '=data["' + key + '"];';
    }
    eval(temKey);
    templates.push("<a>", text || "", "</a>");
    temKey = null;
  })(templateData);
  fn = null;
  return templates.join("");
}
function f1(templateData) {
  var templates = [];
  var fn = (function (data) {
    var temKey = "";
    for (key in data) {
      temKey += "var " + key + '=data["' + key + '"];';
    }
    eval(temKey);
    templates.push('class="data-lang ');
    if (selected) {
      templates.push("selected ");
    }
    templates.push('""></a>');
    temKey = null;
  })(templateData);
  fn = null;
  return templates.join("");
}
function f2(templateData) {
  var templates = [];
  var fn = (function (data) {
    var temKey = "";
    for (key in data) {
      temKey += "var " + key + '=data["' + key + '"];';
    }
    eval(temKey);
    templates.push("  <div>  ");
    for (var i = 0, len = list.length; i < len; i++) {
      var item = list[i];
      templates.push("    <a>", item.text || "", "</a>  ");
    }
    templates.push("  </div>  ");
    temKey = null;
  })(templateData);
  fn = null;
  return templates.join("");
}
// f({ selected: true, value: "zh", text: "zh-text" });
console.log(
  f2({
    list: [
      {
        text: 1,
      },
      {
        text: 2,
      },
    ],
  })
);
