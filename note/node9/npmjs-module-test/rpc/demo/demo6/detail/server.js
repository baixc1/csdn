const fs = require('fs')
const protobuf = require('protocol-buffers');
const schemas = protobuf(
    fs.readFileSync(`./detail.proto`)
);

// 假数据
const columnData = require('../mockdata/column')

/**
 * 服务端的编解包逻辑
 */

const rpcServer = require('../lib/rpc-server')
new rpcServer(schemas.ColumnResponse, schemas.ColumnRequest)
    .createServer((request, response) => {
        // 因为都是假数据，这里就没有使用栏目id。真实项目会拿这个columnid去请求数据库
        const columnid = request.body;
        console.log('server 接收数据', request.body)
        // 直接返回假数据
        response.end({
            column: columnData[0],
            recommendColumns: [columnData[1], columnData[2]]
        });
    })
    .listen(4111, ()=> {
        console.log('rpc server listened: 4111')
    });