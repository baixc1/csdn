
// client.js
const net = require('net')

const socket = new net.Socket({})

socket.connect({
  port: '127.0.0.1',
  port: 9999
})

const ids = [
  10000,
  10001,
  10002,
  10003,
  10004,
]

sendData()
socket.on('data', buffer=>{
  sendData()
})

function sendData() {
  const id = ids[Math.floor(Math.random()*ids.length)]
  console.log(id)
  const buffer = Buffer.alloc(2)  // <Buffer 00 00> 每位为16进制数，16^4
  buffer.writeInt16BE(id) // 2^16
  socket.write(buffer)
}