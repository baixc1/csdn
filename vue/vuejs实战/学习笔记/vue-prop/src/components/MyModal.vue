<template>
  <Modal v-model="modal" title="弹窗">
    xxx
    <Button slot="footer" @click="close">关闭</Button>
  </Modal>
</template>
<script>
export default {
  props: ['value'],
  data(){
    return {
      modal: false
    }
  },
  methods: {
    close(){
      this.modal = false
    }
  },
  watch:{
    value(v){ // 父 -> 子
      this.modal = v
    },
    modal(v){ // 子 -> 父
      this.$emit('input', v)
    }
  }
}
</script>