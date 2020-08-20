<template>
  <div class="container">
    <div class="d1">
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
    <div class="d2">
      <CustomHeader>
        <slot name="header"></slot>
      </CustomHeader>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
<script>
import CustomHeader from './header'
export default {
  components: {
    CustomHeader
  }
}
</script>
<style scoped>
.d1 {
  background: red;
}
.d2 {
  background: green;
}
</style>
