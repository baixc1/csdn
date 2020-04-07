<template>
  <div>
    <h1>api 测试页面{{project}}</h1>
    <p>store value a:{{ $store.state.a }},b:{{b}}</p>
    <button @click="next">下一页</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    let { a, b } = this.$store.state;
    return { project: "default", a, b, page: 1 };
  },
  asyncData({ query }) {
    return { project: "nuxt", page: query.page };
  },
  async fetch({ store, query }) {
    let { data } = await axios.get("http://localhost:8081/");
    store.commit("setA", data.a + "," + query.page);
    await store.dispatch("getB");
  },
  watchQuery: ["page"],
  methods: {
    next() {
      this.page++;
      this.$router.push("api?page=" + this.page);
    }
  }
};
</script>