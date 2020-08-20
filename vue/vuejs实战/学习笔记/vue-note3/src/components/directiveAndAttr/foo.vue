<template>
  <div>i am foo
    <slot :msg="msg"></slot>
    <slot
      name="one"
      :msg="{msg: 1}"
    ></slot>
    <slot
      name="two"
      :msg="{msg: 2}"
    ></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'foo'
    }
  }
}
</script>
