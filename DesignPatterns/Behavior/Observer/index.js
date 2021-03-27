const Observer = require("./common");
// 绑定和删除函数时，地址相同
const f1 = (events) => console.log("触发f1，参数：", events);
const f2 = (events) => console.log("触发f2，参数：", events);
const f3 = function () {
  console.log("this === Observer:", this === Observer);
};
Observer.on("click", f1);
Observer.on("click", f2);
Observer.on("click", f3);
Observer.emit("click", { a: 1, b: 2 });
Observer.off("click", f1);
Observer.off("click", f3);
Observer.emit("click", { a: 3, b: 2 });
