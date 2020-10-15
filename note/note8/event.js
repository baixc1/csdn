//event.js 文件
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
console.log(EventEmitter.prototype)
event.on('some_event', function () {
  console.log('some_event 事件触发');
});
setTimeout(function () {
  event.emit('some_event');
}, 1000); 
