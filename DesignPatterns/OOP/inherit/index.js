var Book = (
  function () {
    // 静态私有属性
    var bookNum = 0
    // 静态私有方法
    function checkBook() { }

    function _book(newId, newName, newPrise) {
      // 私有变量
      var name, price
      // 私有方法
      function checkId() { }

      //特权方法
      this.getName = () => { }
      this.getPrice = () => { }
      this.setName = () => { }
      this.setPrice = () => { }

      // 共有属性（实例属性）
      this.id = newId
      // 共有方法
      this.copy = () => { }
      bookNum++
      if (bookNum > 100) {
        //...
      }
      // 构造器
      this.setName(name)
      this.setPrice(price)
    }


    _book.prototype = {
      //静态成员
      isJsBook: false,
      display: function () { }
    }

    return _book
  }
)()
