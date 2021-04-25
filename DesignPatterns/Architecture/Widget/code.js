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
f({ selected: true, value: "zh", text: "zh-text" });
