const app = new Vue({
  el: '#app',
  data: {
    columns: [
      {
        title: '姓名',
        key: 'name'
      },
      {
        title: '年龄',
        key: 'age'
      },
      {
        title: '地址',
        key: 'address'
      },
    ],
    data: [
      {
        name: '小白',
        age: 18,
        address: '上海浦东新区'
      }
    ]
  }
})