// client.js
const net = require('net')
const socket = new net.Socket({})
const {
  sleep,
  checkComplete,
  decode
} = require('./common')

socket.connect(9999)

let oldBuffer = null;
socket.on('data', (buffer) => {
    // console.log(buffer)
    // 把上一次data事件使用残余的buffer接上来
    if (oldBuffer) {
        buffer = Buffer.concat([oldBuffer, buffer]);
    }
    let completeLength = 0;

    // 只要还存在可以解成完整包的包长
    while (completeLength = checkComplete(buffer)) {
        const package = buffer.slice(0, completeLength);
        buffer = buffer.slice(completeLength);

        // 把这个包解成数据和seq
        const result = decode(package, true);
        console.log(`包${result.seq}，返回值是${result.data}`);
    }

    // 把残余的buffer记下来
    oldBuffer = buffer;
})


const LESSON_IDS = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

let seq = 0;
for (let k = 0; k < 5; k++) {
  (async ()=>{
    // 模拟数据同时上传和间隔100ms上传
    if(k%10===0){
      await sleep(100)
    }
    id = Math.floor(Math.random() * LESSON_IDS.length);
    const data = encode({ id })
    // console.log(data)
    socket.write(data);
  })()
}

/**
 * 二进制包编码函数
 */
function encode (data) {
  // 正常情况下，这里应该是使用 protobuf 来encode一段代表业务数据的数据包
  // 为了不要混淆重点，这个例子比较简单，就直接把课程id转buffer发送
  const body = Buffer.alloc(4);
  body.writeInt32BE(LESSON_IDS[data.id]);
  // console.log(body)

  // 一般来说，一个rpc调用的数据包会分为定长的包头和不定长的包体两部分
  // 包头的作用就是用来记载包的序号和包的长度，以实现全双工通信
  const header = Buffer.alloc(6);
  header.writeInt16BE(seq)
  header.writeInt32BE(body.length, 2);
  // console.log(header)
  // 包头和包体拼起来发送
  const buffer = Buffer.concat([header, body])

  console.log(`包${seq}传输的课程id为${LESSON_IDS[data.id]}`);
  seq++;
  return buffer;
}