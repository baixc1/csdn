<template>
  <div class="hello">
    <component-a></component-a>
    <AsyncComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  name: "HelloWorld",
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "my-chunk-name" */ "./components/AsyncComponent.vue"
      )
    ),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
