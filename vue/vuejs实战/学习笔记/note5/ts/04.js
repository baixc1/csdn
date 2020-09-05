"use strict";
exports.__esModule = true;
var list = [1, 2, 3];
// 泛型
var list1 = [1, 2, 3];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
c = 4;
// 字符串
var name = "Gene";
// name = 1  //错误警告
var str = 'aa';
str = 1;
var arr = [1, false, 'str'];
function warnUser() {
    return null;
}
// Type 'Error' is not assignable to type 'never'
// function fail():never {   
//   return new Error("Something failed");
// }
var foo = {}; // 零属性对象，添加属性报错
var foo1 = {}; // 类型断言
foo1.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
foo1.bas = 'hello';
