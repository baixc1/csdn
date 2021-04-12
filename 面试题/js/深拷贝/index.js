const map = new Map();
map.set("key", "value");
map.set("ConardLi", "code秘密花园");

const set = new Set();
set.add("ConardLi");
set.add("code秘密花园");

var target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  bool2: true,
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error("i am error"),
  func1: () => {
    console.log("code秘密花园");
  },
  func2: function (a, b) {
    const c = 10;
    return function () {
      return a * b * c;
    };
  },
};

const { clone } = require("./clone");
console.log(clone(target));
console.log(clone(target).func1.toString());
console.log(clone(target).func2.toString());
