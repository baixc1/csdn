// Array.prototype.some1 = function (fun /*, thisArg*/) {
//   var t = Object(this);
//   var len = t.length >>> 0;

//   var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
//   for (var i = 0; i < len; i++) {
//     if (i in t && fun.call(thisArg, t[i], i, t)) {
//       return true;
//     }
//   }

//   return false;
// };

// var arr = [];
// arr.__proto__[0] = 0;

// arr.__proto__[1] = 1;
// arr.length = 2;
// arr.some1((item) => {
//   console.log(item);
// });
function objTest() {
  for (let key in this) {
    console.log(key === "objTest");
  }
}
Object.prototype.objTest = objTest;
objTest.call({});
