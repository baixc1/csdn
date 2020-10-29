var protobuf = require('protocol-buffers')
var fs = require('fs')
 
// pass a proto file as a buffer/string or pass a parsed protobuf-schema object
var messages = protobuf(fs.readFileSync('test.proto'))

console.log(messages)
var buf = messages.Test.encode({
  num: 42,
  payload: 'hello world'
})
 
console.log(buf) // should print a buffer
console.log(messages.Test.decode(buf))
console.log(messages.FOO)

var buf1 = messages.AnotherOne.encode({
  list: [
    messages.FOO.BAR
  ]
})
console.log(messages.AnotherOne.decode(buf1))

var buf2 = messages.ColumnRequest.encode({
  columnid: 1111111
})
console.log(buf2, buf2.length)