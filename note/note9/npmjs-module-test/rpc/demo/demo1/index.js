const buffer1 = Buffer.from('geek');
const buffer2 = Buffer.from([1,2,3]);
const buffer3 = Buffer.alloc(10);

console.log(buffer1);
console.log(buffer2);
console.log(buffer3);

console.log(`${buffer1}`)

console.log(buffer2.readInt8(0));
buffer2.writeInt8(127, 1);
console.log(buffer2); // <Buffer 01 7f 03> 16*7+15
buffer2.writeInt16BE(128, 1);
console.log(buffer2); // <Buffer 01 00 80> 16*8
buffer2.writeInt16LE(128, 1);
console.log(buffer2); 

const buf = Buffer.from([0, 5]);
console.log(buf)
console.log(buf.readInt16BE(0));
console.log(buf.readInt16LE(0));  // 0x0500