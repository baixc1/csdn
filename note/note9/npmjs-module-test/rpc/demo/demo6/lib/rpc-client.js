const net = require("net");
const parentRPC = require('./common')

module.exports = class RPC extends parentRPC{
    constructor() {
        super(...arguments)
    }

    init({callback, host='127.0.0.1', port}) {
        const socket = new net.Socket({})
        this.socket = socket
        socket.connect({
            host,
            port
        })

        this.onDataEventFn(socket, (data)=>{
            callback(data)
        })
    }
}
