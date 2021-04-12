var regexp = /xyz/gimsuy;
console.log(regexp.toString());
console.log(/\w*$/.exec(regexp.toString()));
console.log(/\w*$/.exec(regexp.toString()).toString());
console.log(/\w*$/.exec(regexp));
