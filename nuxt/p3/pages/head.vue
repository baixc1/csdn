<template>
  <div>
    <h1>api-head</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "head"
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  }
};
</script>