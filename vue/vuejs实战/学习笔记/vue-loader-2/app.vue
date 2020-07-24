<template>
  <div>Hello {{name}}</div>
</template>
<script>
export default {
  data(){
    return {
      name: 'World!'
    }
  }
}
</script>
<style scoped>
div{
  font-size: 30px;
  color: #f60;
}
</style>