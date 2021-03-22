// 多维变量类

// 运动单元
function Speed(x, y) {
  this.x = x;
  this.y = y;
}
Speed.prototype.run = function () {
  console.log("运动起来");
};

// 着色单元
function Color(cl) {
  this.color = cl;
}
Color.prototype.draw = function () {
  console.log("绘制彩色");
};

// 变形单元
function Shape(sp) {
  this.shape = sp;
}
Shape.prototype.change = function () {
  console.log("改变形状");
};

// 说话单元
function Speek(wd) {
  this.word = wd;
}
Speek.prototype.say = function () {
  console.log("我说话了");
};

// 创建球类
function Ball(x, y, c) {
  this.speed = new Speed(x, y);
  this.color = new Color(c);
}
Ball.prototype.init = function () {
  this.speed.run();
  this.color.draw();
};

new Ball(10, 10, "red").init();
// 人物类
// 精灵类
// ...
