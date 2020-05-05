<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld testProp="testProp" v-model="data" />
    <p>父元素：{{dataFormat}}</p>------------------------------------------------
    <p>
      <router-link to="/foo">Go to Foo</router-link>
    </p>
    <p>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    <p>store arr数据：{{arrFormat}}</p>
    <p>
      <router-link to="/hi">Go to Hi</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/Hello.vue";

export default {
  data() {
    return { data: [] };
  },
  computed: {
    dataFormat() {
      return this.data.length ? JSON.stringify(this.data) : "no data";
    },
    arrFormat() {
      return this.$store.getters.arrFormat;
    }
  },
  name: "App",
  components: {
    HelloWorld
  }
};
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
