// index.js
const data = {
  list: [
    {
      selected: true,
      title: "这是设计模块",
      text: "设计模式",
    },
    {
      selected: false,
      title: "这是设计模块2",
      text: "设计模式2",
    },
  ],
};
function _dealTpl(str) {
  const _left = "{%",
    _right = "%}";
  return (
    String(str)
      .replace(/[\r\t\n]/g, "")
      // 替换内容
      .replace(new RegExp(`${_left}=(.*?)${_right}`, "g"), "',$1 || '','")
      // 替换左分隔符
      .replace(new RegExp(_left, "g"), "');")
      // 替换右分隔符
      .replace(new RegExp(_right, "g"), "templates.push('")
  );
}

function _compileTpl(str) {
  // 编译体函数
  const fnBody = `
    var templates=[];
    var fn=(function(data){
      var temKey = ''
      for(key in data){
        temKey += ('var '+key+'=data["'+ key +'"];')
      }
      eval(temKey)
      templates.push('${_dealTpl(str)}')
      temKey=null
    })(templateData)
    fn=null
    return templates.join('');
  `;
  console.log(fnBody);
  return new Function("templateData", fnBody);
}

// console.log(_dealTpl("<a>{%=text%}</a>")); // <a>',text || '','</a>
// console.log(_compileTpl("<a>{%=text%}</a>")({ text: "11" }));
// console.log(
//   // <a class="data-lang '); if(selected) { templates.push('selected '); } templates.push('"></a>
//   _dealTpl(`<a class="data-lang {% if(selected) { %}selected {% } %}"></a>`)
// );

// _compileTpl(`<a class="data-lang {% if(selected) { %}selected {% } %}"></a>`); // <a class="data-lang '); if(selected) { templates.push('selected '); } templates.push('""></a>

console.log(
  //  <div>  '); for(var i=0,len=list.length;i<len;i++){      var item = list[i];templates.push('    <a>',item.text || '','</a>  '); } templates.push('  </div>
  _dealTpl(`
  <div>
  {% for(var i=0,len=list.length;i<len;i++){
      var item = list[i];%}
    <a>{%=item.text%}</a>
  {% } %}
  </div>
  `)
);
