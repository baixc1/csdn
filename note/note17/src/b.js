// b.js
// import all from './a.js'
// const all = require('./a')
const all = import('./a')
export let count = 5;
all.then(v => console.log(v.default))
console.log('b.js')