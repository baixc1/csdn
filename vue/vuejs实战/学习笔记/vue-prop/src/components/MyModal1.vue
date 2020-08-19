<template>
  <Modal v-model="value" title="弹窗">
    xxx
    <Button slot="footer" @click="close">关闭</Button>
  </Modal>
</template>
<script>
export default {
  props: ['value'],
  methods: {
    close(){
      this.$emit('input', false)
    }
  }
}
</script>