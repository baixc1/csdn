// 表单验证
var InputStrategy = (function () {
  var strategy = {
    notNull(value) {
      return /\s+/.test(value) ? "请输入内容" : "";
    },
    number(value) {
      return /^[0-9]+(\.[0-9]+)?$/.test(value) ? "" : "请输入正确的数字";
    },
    phone(value) {
      return /^\d{3}-\d{8}$|^\d{4}-\d{7}$/.test(value)
        ? ""
        : "请输入正确的电话号码";
    },
  };
  return {
    check(type, value) {
      value = value.replace(/^\s+|\s+$/g, "");
      return strategy[type] ? strategy[type](value) : "没该类型方法";
    },
    addStrategy(type, fn) {
      strategy[type] = fn;
    },
  };
})();

// 返回验证信息，空为通过
console.log(InputStrategy.check("phone", " 333-88888888  "));
