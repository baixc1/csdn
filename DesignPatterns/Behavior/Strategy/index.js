// 价格策略对象
var PriceStrategy = (function () {
  // 内部算法对象
  var strategy = {
    // 100 返 30
    return30(price) {
      return +price + parseInt(price / 100) * 30;
    },
    // 100 返 50
    return50(price) {
      return +price + parseInt(price / 100) * 50;
    },
    // 9折
    percent90(price) {
      return price * 0.9;
    },
    // 8折
    percent80(price) {
      return price * 0.8;
    },
  };
  // 策略算法接口
  return function (type, price) {
    return strategy[type] && strategy[type](price);
  };
})();

console.log(PriceStrategy("percent90", "400.9"));
