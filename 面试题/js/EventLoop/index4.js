const fs = require("fs");
fs.readFile("./index.js", (v) => console.log(0));
setImmediate((v) => console.log(1));
setTimeout((v) => console.log(2));
Promise.resolve().then((v) => console.log(3));
process.nextTick((v) => console.log(4));
