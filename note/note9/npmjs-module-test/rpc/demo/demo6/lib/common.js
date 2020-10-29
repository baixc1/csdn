module.exports = class {
    constructor(protobufEncodeSchema, protobufDecodeSchema){
        this.protobufEncodeSchema = protobufEncodeSchema
        this.protobufDecodeSchema = protobufDecodeSchema
    }
    // 解码
    decode(buffer) {
        const seq = buffer.readUInt32BE();

        return {
            seq: seq,
            result: this.protobufDecodeSchema.decode(buffer.slice(8))
        }
    }
    // 判断请求包是不是接收完成
    isCompleteRequest(buffer) {
        if (buffer.length < 8) {
            return 0
        }
        const bodyLength = buffer.readInt32BE(4);
        if (buffer.length >= bodyLength + 8) {
            return bodyLength + 8
            
        } else {
            return 0
        }
    }
    // 编码
    encode(data, seq) {
        const body = this.protobufEncodeSchema.encode(data);

        const head = Buffer.alloc(8);
        head.writeUInt32BE(seq);
        head.writeUInt32BE(body.length, 4);
        return Buffer.concat([head, body]);
    }
    // 格式化数据
    onDataEventFn(socket, callback){
        let buffer
        socket.on('data', (data) => {
            buffer = (buffer && buffer.length > 0) ?
                Buffer.concat([buffer, data]) : // 有遗留数据才做拼接操作
                data;

            let checkLength = null;
            while (buffer && (checkLength = this.isCompleteRequest(buffer))) {
                let requestBuffer = null;
                if (checkLength == buffer.length) {
                    requestBuffer = buffer;
                    buffer = null;
                } else {
                    requestBuffer = buffer.slice(0, checkLength);
                    buffer = buffer.slice(checkLength);
                }
                const request = this.decode(requestBuffer);
                callback({buffer: requestBuffer, data: request});
            }
        })
    }
}