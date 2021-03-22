// 享元类
var Flyweight = {
  moveX(x) {
    this.x = x;
    return this;
  },
  moveY(y) {
    this.y = y;
    return this;
  },
};

// 人类
var Player = function (x, y, c) {
  this.x = x;
  this.y = y;
  this.color = c;
};
// 地址不是Flyweight了（后续添加的方法无法访问）
Player.prototype = {
  ...Flyweight,
  changeC() {
    //...
  },
};

// 精灵类
var Spirit = function (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
};
Spirit.prototype = Flyweight;
Spirit.prototype.changeR = function () {};

console.log(new Player(5, 2, "red").moveX(1).moveY(1));
