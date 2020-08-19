<template>
  <Modal v-model="modal" title="弹窗">
    xxx
    <Button slot="footer" @click="close">关闭</Button>
  </Modal>
</template>
<script>
export default {
  props: ['visible'],
  methods: {
    close(){
      this.modal = false
    }
  },
  computed: {
    modal: {
      get(){ // 父 -> 子
        return this.visible
      },
      set(v){ // 子 -> 父
        this.$emit('update:visible', v)
      }
    }
  }
}
</script>