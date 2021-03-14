// 复制多个对象的属性，生成新对象(合成原型成员)
function prototypeExtend() {
  var F = function () { },
    args = arguments,
    i = 0,
    len = args.length
  // 浅克隆
  for (; i < len; i++) {
    for (var key in args[i]) {
      F.prototype[key] = args[i][key]
    }
  }
  return new F()
}

// 根据多个模板对象，生成企鹅对象
var penguin = prototypeExtend({
  speed: 20,
  swim() {
    console.log('游泳速度：' + this.speed)
  }
}, {
  run(speed) {
    console.log('游泳速度：' + speed)
  }
}, {
  jump() {
    console.log('跳跃')
  }
})

penguin.swim()
console.log(penguin.__proto__)