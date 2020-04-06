<template>
  <div>
    <h1>api 测试页面{{project}}</h1>
    <p>store value a:{{ a }},b:{{b}}</p>
    <button>下一页</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    let { a, b } = this.$store.state;
    return { project: "default", a, b };
  },
  asyncData(context) {
    return { project: "nuxt" };
  },
  async fetch({ store, query }) {
    let { data } = await axios.get("http://localhost:8081/");
    store.commit("setA", data.a + query.a);
    await store.dispatch("getB");
  },
  watchQuery: ["page"]
};
</script>