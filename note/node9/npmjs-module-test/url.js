var url = require('url');

console.log(urlObj = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash'))
console.log(url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash',true))

console.log(url.format(urlObj))