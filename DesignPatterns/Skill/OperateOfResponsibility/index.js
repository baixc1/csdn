var A = function (selector, context) {
  return new A.fn.init(selector, context);
};
A.fn = A.prototype = {
  /**
   * // init 方法，new 该方法会报错
   * init(){
   *
   * }
   * 所有方法定义不是构造函数，如果您尝试实例化它们，将抛出TypeError。
   */
  /**
   *
   * @param {string} selector 选择器
   * @param {dom|undefined} context 上下文
   * @returns
   */
  init: function (selector, context = document) {
    this.length = 0;
    if (~selector.indexOf("#")) {
      this[0] = document.getElementById(selector.slice(1));
      this.length = 1;
    } else {
      var doms = context.getElementsByTagName(selector),
        i = 0,
        len = doms.length;
      for (; i < len; i++) {
        this[i] = doms[i];
      }
      this.length = len;
    }
    this.context = context;
    this.selector = selector;
    return this;
  },
  size() {
    return this.length;
  },
  splice: [].splice, // 增强数组特性
};
A.fn.init.prototype = A.fn; // 原型链继承
console.log(A("#d1"));
console.log(A("#d1").size()); // 1
console.log(A("div", A("#d1")[0]).size()); // 4
