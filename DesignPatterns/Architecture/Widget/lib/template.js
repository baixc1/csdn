// lib/template.js
F.module("lib/template", function () {
  // 模版引擎
  const _TplEngine = function (str, data) {
      // 数组
      if (Array.isArray(data)) {
        let html = "",
          i = 0,
          len = data.length;
        for (; i < len; i++) {
          html += _getTpl(str)(data[i]);
        }
        return html;
      } else {
        return _getTpl(str)(data);
      }
    },
    // 获取模版
    _getTpl = function (str) {
      const ele = document.getElementById(str);
      if (ele) {
        // input 和 textarea ，获取value，其他获取内容
        const html = /^(textarea|input)$/i.test(ele.nodeName)
          ? ele.value
          : ele.innerHTML;
        return _compileTpl(html);
      } else {
        return _compileTpl(str);
      }
    },
    // 处理模版
    _dealTpl = function (str) {
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
    },
    // 编译执行
    _compileTpl = function (str) {
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
    };
  return _TplEngine;
});
