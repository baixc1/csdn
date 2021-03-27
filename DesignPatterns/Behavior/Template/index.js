// 模版类 基础提示框（面板，提示内容，关闭按钮，确认按钮）
var g = (tag) => document.createElement(tag);
var Alert = function (data) {
  if (!data) return;
  // 默认数据
  data = {
    confirm: "确认",
    success() {},
    fail() {},
    ...data,
  };
  this.content = data.content;
  // 标签
  this.panel = g("div");
  this.contentNode = g("p");
  this.contentNode.innerHTML = this.content;
  this.confirmBtn = g("span");
  this.confirmBtn.innerHTML = data.confirm;
  this.closeBtn = g("b");
  // 样式
  this.panel.className = "alert";
  this.confirmBtn.className = "a-confirm";
  this.closeBtn.className = "a-close";
  // 方法
  this.success = data.success;
  this.fail = data.fail;
};

// 原型方法
Alert.prototype = {
  init() {
    // 生成提示框
    [this.closeBtn, this.contentNode, this.confirmBtn].forEach((el) => {
      this.panel.appendChild(el);
    });
    document.body.appendChild(this.panel);
    this.bindEvent();
    this.show();
  },
  // 绑定事件
  bindEvent() {
    this.closeBtn.onclick = () => {
      this.fail();
      this.hide();
    };
    this.confirmBtn.onclick = () => {
      this.success();
      this.hide();
    };
  },
  hide() {
    this.panel.style.display = "none";
  },
  show() {
    this.panel.style.display = "block";
  },
};

// 提示框（右侧按钮）
var RightAlert = function (data) {
  Alert.call(this, data);
  this.confirmBtn.className += " right";
};
RightAlert.prototype = Object.create(Alert.prototype);
RightAlert.prototype.constructor = RightAlert;
console.log(RightAlert.prototype);

// 标题提示框
var TitleAlert = function (data) {
  Alert.call(this, data);
  this.title = data.title;
  this.titleNode = g("h3");
  this.titleNode.innerHTML = this.title;
};
TitleAlert.prototype = new Alert();
TitleAlert.prototype.init = function () {
  this.panel.insertBefore(this.titleNode, this.panel.firstChild);
  Alert.prototype.init.call(this);
};
console.log(TitleAlert.prototype);

// 标题提示框+取消按钮
var CancelAlert = function (data) {
  TitleAlert.call(this, data);
  this.cancel = data.cancel;
  this.cancelBtn = g("span");
  this.cancelBtn.className = "cancel";
  this.cancelBtn.innerHTML = this.cancel || "取消";
};

// 继承 Alert 原型
CancelAlert.prototype = new Alert();
CancelAlert.prototype.init = function () {
  // 继承 TitleAlert原型 的 init
  TitleAlert.prototype.init.call(this);
  this.panel.appendChild(this.cancelBtn);
};
CancelAlert.prototype.bindEvent = function () {
  // 继承事件
  TitleAlert.prototype.bindEvent.call(this);
  this.cancelBtn.onclick = () => {
    this.fail();
    this.hide();
  };
};
