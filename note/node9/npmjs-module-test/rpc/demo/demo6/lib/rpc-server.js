const net = require("net");
const parentRPC = require('./common')

module.exports = class RPC extends parentRPC{
    constructor() {
        super(...arguments)
    }

    createServer(callback) {
        return net.createServer((socket) => {
            this.onDataEventFn(socket, ({data})=>{
                callback(
                    { // request
                        body: data,
                        socket
                    },
                    { // response
                        end: (res) => {
                            const buffer = this.encode(res, data.seq)
                            console.log(`server 返回数据, seq: ${data.seq}, id: ${res.column.id}`)
                            socket.write(buffer);
                        }
                    }
                );
            })
        });

    }
}
