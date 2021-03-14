var Parent = function () { }
Parent.prototype = {
  getData() {
    return new Error('抽象方法不能调用')
  }
}

var instance = new Parent()
// 重写父类方法
instance.getData = () => console.log('i am instance')
instance.getData()