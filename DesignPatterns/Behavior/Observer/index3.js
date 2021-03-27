// 对象间解耦

// 示例：课堂老师提问+学生回答

const Observer = require("./common");
// 学生类
var Student = function (res) {
  // 回答结果
  this.res = res;
  // 回答问题动作
  this.say = () => {
    console.log(this.res);
  };
};

// 回答问题方法
Student.prototype.answer = function (question) {
  // 注册问题事件
  Observer.on(question, this.say);
};

// 学生睡觉，不能回答问题
Student.prototype.sleep = function (question) {
  console.log(this.res + " " + question + " 已注销");
  // 解绑问题事件
  Observer.off(question, this.say);
};

// 教师类
var Teacher = function () {};
Teacher.prototype.ask = function (question) {
  console.log("老师问问题：", question);
  // 触发问题事件
  Observer.emit(question);
};

var s1 = new Student("学生1回答");
var s2 = new Student("学生2回答");
var s3 = new Student("学生3回答");

// 学生注册事件
s1.answer("老师的问题1");
s1.answer("老师的问题2");
s2.answer("老师的问题1");
s3.answer("老师的问题1");
s3.answer("老师的问题2");

// 学生睡觉(在问题1)
s3.sleep("老师的问题1");

var t = new Teacher();
// 老师问问题
t.ask("老师的问题1");
t.ask("老师的问题2");
