const fs = require('fs')
const protobuf = require('protocol-buffers');
const schemas = protobuf(
    fs.readFileSync(`./detail.proto`)
);

const rpcClient = require('../lib/rpc-client')
const rpcClientDemo = new rpcClient(schemas.ColumnRequest, schemas.ColumnResponse)
rpcClientDemo.init({
  callback({data, buffer}){
    console.log(`client 接收数据, seq: ${data.seq}, id: ${data.result.column.id}` )
    console.log('client 接收数据', buffer)
  },
  port: 4111
})
let seq = 0

const data = rpcClientDemo.encode({columnid: 1}, seq)
rpcClientDemo.socket.write(data);
console.log('client 发送数据', data)