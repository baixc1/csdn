<template>
  <div id="example">{{message}}</div>
</template>
<script>
// import Vue from 'vue'
// const data = { a: 1, obj: {}, arr: [] }
// var vm = new Vue({
//   data
// })
// vm.b = 1
// vm.$set(data.obj, 'c', 1)
// vm.$set(data.arr, 1, 1)
// console.log(data) // 下图1
// console.log(vm)   // 下图2
// console.log(data === vm.$data) // true

export default {
  data () {
    return {
      message: '123'
    }
  },
  async mounted () {
    this.message = 'new message' // 更改数据
    console.log(this.$el.textContent === 'new message') // false
    console.log(this.$data.message)
    this.$nextTick(function () {
      console.log(this.$el.textContent === 'new message') // true
    })
    await this.$nextTick()
    console.log(this.$el.textContent === 'new message')  // true
  }
}
</script>