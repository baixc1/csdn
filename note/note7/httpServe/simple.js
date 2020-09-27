const http = require('http')
const fs = require('fs')

// http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('hello1')
// }).listen(8888)

http.createServer(function(req, res) {
  console.log(req.url)
  // The filename is simple the local directory and tacks on the requested url
  var filename = __dirname+req.url;

  // This line opens the file as a readable stream
  var readStream = fs.createReadStream(filename);

  // This will wait until we know the readable stream is actually valid before piping
  readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });

  // This catches any errors that happen while creating the readable stream (usually invalid names)
  readStream.on('error', function(err) {
    res.end(err);
  });
}).listen(8888);