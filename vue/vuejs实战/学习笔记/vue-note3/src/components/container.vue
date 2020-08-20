<template>
  <div class="container">
    <div class="title">{{title}}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['title']
}
</script>
<style scoped lang="scss">
.container {
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  .title {
    text-align: left;
    font-weight: bold;
  }
}
</style>
