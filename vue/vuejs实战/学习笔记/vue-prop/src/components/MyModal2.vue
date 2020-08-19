<template>
  <Modal v-model="modal" title="弹窗">
    xxx
    <Button slot="footer" @click="close">关闭</Button>
  </Modal>
</template>
<script>
export default {
  props: ['value'],
  methods: {
    close(){
      this.modal = false
    }
  },
  computed: {
    modal: {
      get(){ // 父 -> 子
        return this.value
      },
      set(v){ // 子 -> 父
        this.$emit('input', v)
      }
    }
  }
}
</script>