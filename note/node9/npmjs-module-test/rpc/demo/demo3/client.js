// client.js
const net = require('net')

const socket = new net.Socket({})

socket.connect({
  port: '127.0.0.1',
  port: 9999
})

socket.write('hello world')