
const fs = require('fs');
const protobuf = require('protocol-buffers')

const schemas = protobuf(fs.readFileSync(`${__dirname}/test.proto`));

const buffer = schemas.Course.encode({
    id: 1,
    name: 'hh',
    price: 30.1
})
console.log(buffer);
console.log(schemas.Course.decode(buffer));
