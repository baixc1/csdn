"use strict";
exports.__esModule = true;
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
var a = [1, 2, 3, 4];
var ro = a;
var b = a;
a = ro;
a = ro;
var mySearch;
mySearch = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
