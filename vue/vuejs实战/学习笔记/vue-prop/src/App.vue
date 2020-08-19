<template>
  <div id="app">
    <Button @click="open('myModalShow')">打开弹窗</Button>
    <Button @click="open('myModalShow1')">打开弹窗1</Button>
    <Button @click="open('myModalShow2')">打开弹窗2</Button>
    <Button @click="open('myModalShow3')">打开弹窗3</Button>
    <MyModal v-model="myModalShow" />
    <MyModal1 v-model="myModalShow1" />
    <MyModal2 v-model="myModalShow2" />
    <MyModal3 :visible.sync="myModalShow3" />
  </div>
</template>

<script>
import MyModal from './components/MyModal.vue'
import MyModal1 from './components/MyModal1.vue'
import MyModal2 from './components/MyModal2.vue'
import MyModal3 from './components/MyModal3.vue'

export default {
  name: 'App',
  components: {
    MyModal,
    MyModal1,
    MyModal2,
    MyModal3
  },
  data(){
    return {
      myModalShow: false,
      myModalShow1: false,
      myModalShow2: false,
      myModalShow3: false
    }
  },
  methods: {
    open(key){
      this[key] = true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button{
  margin-right: 10px !important;
}
</style>
