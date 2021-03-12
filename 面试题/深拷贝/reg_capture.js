// 捕获性分组与非捕获性分组及前瞻后顾(断言)
// var str = "1hello world";
// var pattern = /([a-z]+)\s([a-z]+)/;
// var arr = pattern.exec(str);
// console.log(arr);

// pattern.test(str);
// console.dir(RegExp.$1);

// console.log(str.replace(pattern, "$2 $1"));

//非捕获性分组：(?:),不作为子匹配返回
// var str2 = "000aaa111";
// var pattern2 = /([a-z]+)(?:\d+)/; //非捕获性分组匹配
// var arr2 = pattern2.exec(str2);
// console.log(arr2);
// console.log(/[a-z]+\d+/.exec(str2));

//前瞻：(?=)和(?!)
//正向前瞻，匹配.jpg后缀文件名
// var str = "123.jpg,456.gif,abc.jpg";
// var partern = /\w+(?=\.jpg)/g; //正向前瞻匹配
// console.log(str.match(partern)); //['123', 'abc']   返回结果正确，没有匹配456.gif
// console.log(str.match(/\w+(?=\.jpg)/)); // 捕获组
// console.log(partern.exec(str));

//反向前瞻，匹配3个及以上的a，而且后面不能有000的字符
var str = "aaa000 aaaa111 aaaaaaa222";
var partern = /a{3,}(?!000)/g; //反向前瞻匹配
console.log(str.match(partern));
