<template>
  <div id="app">
    <Response />
  </div>
</template>

<script>
import Response from './components/Response'

export default {
  name: 'App',
  components: {
    Response
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
