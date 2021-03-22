/**
 * 新闻模块（树形结构）
 * - 容器类
 *    - 成员集合类（容器类）
 *    - 新闻组合体类（容器类）
 *    - 等等（由以下新闻对象类-非容器类，任意搭配组成）
 *        - 图片新闻类
 *        - 图标新闻类
 *        - 简单新闻类
 *        - type新闻类
 *        - 等等
 */
var abstractFn = function () {
  throw new Error("请重写抽象方法");
};

// 寄生式继承
function inheritPrototype(subClass, supClass) {
  var p = Object.create(supClass.prototype);
  p.constructor = subClass;
  subClass.prototype = p;
}

// 统一的接口，新闻虚拟父类（容器类和对象类都继承它）
var News = function () {
  this.children = [];
  this.element = null;
};
// 原型抽象方法
News.prototype = {
  init: abstractFn,
  add: abstractFn,
  getElement: abstractFn,
};

var utils = {
  init(tag, opt = {}) {
    this.element = document.createElement(tag);
    for (let key in opt) {
      this.element[key] = opt[key];
    }
  },
  add(child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
  },
};

// 容器类
var Container = function (id, parent) {
  // 构造函数继承
  News.call(this);
  this.id = id;
  this.parent = parent;
  this.init();
};

// 原型的寄生式继承
inheritPrototype(Container, News);

// 原型属性（不能改变prototype.constructor）
Container.prototype.init = function () {
  utils.init.call(this, "ul", { id: this.id, className: "new-container" });
};
Container.prototype.add = function (child) {
  return utils.add.call(this, child);
};
Container.prototype.getElement = function () {
  return this.element;
};
Container.prototype.show = function () {
  this.parent.appendChild(this.element);
};

// --------------------------------------
// Item容器类（成员集合）
var Item = function (className = "") {
  // 构造函数继承
  News.call(this);
  this.className = className;
  this.init();
};

// 原型的寄生式继承
inheritPrototype(Item, News);

Item.prototype.init = function () {
  utils.init.call(this, "li", { className: this.className });
};
Item.prototype.add = function (child) {
  return utils.add.call(this, child);
};
Item.prototype.getElement = function () {
  return this.element;
};

// NewsGroup容器类（新闻组合体）
var NewsGroup = function (className = "") {
  // 构造函数继承
  News.call(this);
  this.className = className;
  this.init();
};

// 原型的寄生式继承
inheritPrototype(NewsGroup, News);

NewsGroup.prototype.init = function () {
  utils.init.call(this, "div", { className: this.className });
};
NewsGroup.prototype.add = function (child) {
  return utils.add.call(this, child);
};
NewsGroup.prototype.getElement = function () {
  return this.element;
};

// -------------------------------------------
// 新闻对象类（统一封装）
function NewObj(opt) {
  News.call(this);
  const _adapter = {
    url: "",
    href: "#",
    className: "normal",
    label: "",
    ...opt,
  };
  for (let key in _adapter) {
    this[key] = _adapter[key];
  }
  this.init();
}

inheritPrototype(NewObj, News);
NewObj.prototype.init = function () {
  let { type, className, href, label, text } = this;
  this.element = document.createElement("a");
  let labelClass = "";
  if (type === "img") {
    var img = new Image();
    img.src = this.url;
    this.element.appendChild(img);
  } else {
    if (label) {
      labelClass = `ui-${label}`;
      if (this.pos === "left") {
        text = `[${label}]${text}`;
      } else {
        text = `${text}[${label}]`;
      }
    }
    this.element.innerHTML = text;
  }

  this.element.className = `ui-${type} ${labelClass} ${className || ""}`;
  this.element.href = href;
};
// 无该方法，覆盖抽象方法
NewObj.prototype.add = function () {};
NewObj.prototype.getElement = function () {
  return this.element;
};

// 调用
new Container("news", document.body)
  .add(
    new Item("normal").add(
      new NewObj({
        text: "梅西不拿。。。",
      })
    )
  )
  .add(
    new Item("normal").add(
      new NewObj({
        text: "梅西不拿111。。。",
        label: "live",
      })
    )
  )
  .add(
    new Item("normal").add(
      new NewsGroup("has-img")
        .add(
          new NewObj({
            type: "img",
            url: "xxx",
            className: "small",
          })
        )
        .add(
          new NewObj({
            text: "313232火炮。。。",
          })
        )
    )
  )
  .add(
    new Item("normal").add(
      new NewObj({
        text: "火炮。。。",
        label: "CBA",
        pos: "left",
      })
    )
  )
  .show();
