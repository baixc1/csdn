<template>
  <div>
    <h1>_ page</h1>
    <p>params: {{params}}</p>
    <p>query: {{query}}</p>
  </div>
</template>
<script>
export default {
  asyncData({ params, query }) {
    return { params, query };
  }
};
</script>