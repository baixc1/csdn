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
console.log(f({ text: 1 })); // <a>1</a>

function f1(templateData) {
  var templates = [];
  var fn = (function (data) {
    var temKey = "";
    for (key in data) {
      temKey += "var " + key + '=data["' + key + '"];';
    }
    eval(temKey);
    templates.push('<a class="data-lang ');
    if (selected) {
      templates.push("selected ");
    }
    templates.push('"></a>');
    temKey = null;
  })(templateData);
  fn = null;
  return templates.join("");
}
// <a class="data-lang selected "></a>
console.log(f1({ selected: true }));

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
//  <div>      <a>1</a>      <a>2</a>    </div>
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
