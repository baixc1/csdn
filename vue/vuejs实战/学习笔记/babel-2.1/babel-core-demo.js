
const babel = require('babel-core');
const options = {
  presets: ['es2015']
}
// 字符串转码
const es5Code = babel.transform('code();', options);
console.log(es5Code.code)