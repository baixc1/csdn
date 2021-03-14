const Fun = require('./index')

var person = new Fun('xiao ming', 'code', { skill: '写代码' })

console.log(person)
person.work.changeDesc('喜欢看书')
console.log(person)