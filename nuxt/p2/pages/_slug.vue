<template>
  <div>
    <h1>slug page</h1>
    <p>params: {{params}}</p>
    <p>query: {{query}}</p>
  </div>
</template>
<script>
export default {
  asyncData({ params, query, error }) {
    // return { params, query };
    return error({ statusCode: 404, message: "Post not found" });
  }
};
</script>