
// server.js
const net = require('net')

net.createServer(socket => {
  socket.on('data', async buffer=>{
    const id = buffer.readInt16BE()
    await sleep(1000)
    console.log(id)
    await sleep(1000)
    socket.write(Buffer.from(data[id]))
  })
}).listen(9999)

const data = {
  10000: 'a',
  10001: 'b',
  10002: 'c',
  10003: 'd',
  10004: 'e',
}

const sleep = (ts=50)=>{
  return new Promise(resolve=>{
    setTimeout(resolve,ts)
  })
}