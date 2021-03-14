// 轮播图 父类
var LoopImgs = function (imgs, container) {
  this.imgs = imgs
  this.container = container
}

LoopImgs.prototype = {
  // 创建
  createImg() {
    // 复杂逻辑
  },
  // 切换
  changeImg() {
    // 复杂逻辑
  }
}

// 上下滑动切换类 子类
var SlideLoopImg = function (imgs, container) {
  // 调用父类构造函数
  LoopImgs.call(this, imgs, container)
}

// 原型继承
SlideLoopImg.prototype = new LoopImgs()
SlideLoopImg.prototype.changeImg = function () {
  // 方法重写
}

// 原型扩展
LoopImgs.prototype.some = function () { }
SlideLoopImg.prototype.any = function () { }