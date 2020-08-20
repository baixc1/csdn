<template>
  <div>i am bar
    <slot :msg="msg"></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'bar'
    }
  }
}
</script>
