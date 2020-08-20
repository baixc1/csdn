<template>
  <div>i am baz
    <slot :msg="msg"></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'baz'
    }
  }
}
</script>
