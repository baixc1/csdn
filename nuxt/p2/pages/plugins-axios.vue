<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "my"
    };
  },
  async asyncData({ req, res }) {
    let { data } = await axios.get("http://localhost:8081/");
    console.log(process.server);
    return { name: data.a };
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>

<style>
.red {
  color: red;
}
</style>