<template>
  <div>
    <h1>pulgins vue</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(process.server);
    this.$myInjectedFunction("test");
    console.log(this)
  }
};
</script>