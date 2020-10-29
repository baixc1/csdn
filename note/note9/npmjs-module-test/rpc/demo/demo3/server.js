// server.js
const net = require('net')

net.createServer(socket => {
  socket.on('data', buffer=>{
    console.log(buffer, buffer.toString()) // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64> hello world
  })
}).listen(9999)