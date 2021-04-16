// 需求：图片的延时加载（过量图片的加载，会影响页面的加载。优先加载视口的图片）

class LazyLoader {
  constructor(id) {
    this.container = document.getElementById(id);
    // 获取所有图片元素
    this.imgs = this.getImgs();
    this.init();
  }
  // 初始化
  init() {
    this.update();
    this.bindEvent();
  }
  // 获取延迟加载的图片
  getImgs() {
    return Array.from(this.container.getElementsByTagName("img"));
  }
  // 加载图片
  update() {
    if (!this.imgs.length) return;
    var i = this.imgs.length - 1;
    // 从后往前遍历，优化删除性能
    for (; i >= 0; i--) {
      if (this.shouldShow(i)) {
        // 图片格式 <img src="显示加载中的图片" data-src="实际图片" />
        this.imgs[i].src = this.imgs[i].getAttribute("data-src");
        this.imgs.splice(i, 1);
      }
    }
  }
  // 判断图片是否在视口（上下边至少有一个在窗口内）
  shouldShow(i) {
    var img = this.imgs[i],
      //可视化范围顶部高度
      scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
      //可视化范围底部高度
      scrollBtm = scrollTop + document.documentElement.clientHeight,
      // 图片顶部位置
      imgTop = this.pageY(img),
      imgBtm = imgTop + img.offsetHeight;
    if (
      (imgTop > scrollTop && imgTop < scrollBtm) ||
      (imgBtm > scrollTop && imgBtm < scrollBtm)
    ) {
      return true;
    }
    return false;
  }
  // 获取元素纵坐标(递归，累加父元素offsetTop)
  pageY(ele) {
    if (ele.offsetParent) {
      return ele.offsetTop + this.pageY(ele.offsetParent);
    } else {
      return ele.offsetTop;
    }
  }
  // 绑定事件（简化版）
  on(ele, type, fn) {
    ele.addEventListener(type, fn);
  }
  // 绑定resize和scroll事件
  bindEvent() {
    ["resize", "scroll"].forEach((event) => {
      this.on(window, event, () => {
        // context 给 this.update方法 绑定 this
        throttle(this.update, { context: this });
      });
    });
  }
}
window.onload = function () {
  new LazyLoader("root");
};
