<template>
  <div id="app">
    <SlotTest />
    <DAA />
  </div>
</template>

<script>
import SlotTest from './components/slotTest'
import DAA from './components/directiveAndAttr'

export default {
  name: 'App',
  components: {
    SlotTest,
    DAA
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
</style>
