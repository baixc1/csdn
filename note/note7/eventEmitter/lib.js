const EventEmitter = require('events')
class Geektime extends EventEmitter{
  constructor(){
    super();
    setInterval(() => {
      this.emit('newlesson',{price:Math.random()* 100}) //触发事件
    }, 3000);
  }
}

const geektime = new Geektime;

module.exports = geektime
