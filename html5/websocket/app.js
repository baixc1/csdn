const WebSocket = require('ws') //websocket
const { Server } = WebSocket

//客户端
const ws = new WebSocket('ws://localhost:3000')
//发送消息(打开websocket后)
ws.on('open', () => {
    ws.send('hello')
})
//接受消息
ws.on('message', msg => console.log(msg))



//服务端
const wss = new Server({
    port: 3000
})
wss.on('connection', ws => {
    ws.on('message', msg => {
        console.log(msg)
        ws.send(`echo ${msg}`)      //双向通信
    })
})