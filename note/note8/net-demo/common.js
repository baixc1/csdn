const sleep = (ts=50)=>{
  return new Promise(resolve=>{
    setTimeout(resolve,ts)
  })
}


/**
 * 检查一段buffer是不是一个完整的数据包。
 * 具体逻辑是：判断header的bodyLength字段，看看这段buffer是不是长于header和body的总长
 * 如果是，则返回这个包长，意味着这个请求包是完整的。
 * 如果不是，则返回0，意味着包还没接收完
 * @param {} buffer 
 */
function checkComplete (buffer) {
  if (buffer.length < 6) {
    return 0;
  }
  const bodyLength = buffer.readInt32BE(2);
  return 6 + bodyLength
}


/**
* 二进制包解码函数
* 在一段rpc调用里，服务端需要经常解码rpc调用时，业务数据的请求包
*/
function decode(buffer, isClent) {
  const header = buffer.slice(0, 6);
  const seq = header.readInt16BE();

  // 正常情况下，这里应该是使用 protobuf 来decode一段代表业务数据的数据包
  // 为了不要混淆重点，这个例子比较简单，就直接读一个Int32即可
  let body = buffer.slice(6)
  if(!isClent){
    body = body.readInt32BE()
  }

  // 这里把seq和数据返回出去
  return {
      seq,
      data: body
  }
}

module.exports = {
  sleep,
  checkComplete,
  decode
}