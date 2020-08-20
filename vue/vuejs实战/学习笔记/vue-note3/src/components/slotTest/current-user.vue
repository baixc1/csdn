<template>
  <div>
    <slot :user="user">{{ user.lastName }}</slot>
    <slot
      name="other"
      :other="other"
    >i am other default</slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        lastName: 'jack',
        firstName: 'son'
      },
      other: 'i am other'
    }
  }
}
</script>
