<template>
  <a
    :href="url"
    class="nav-link"
  >
    <slot>默认内容</slot>
  </a>
</template>
<script>
export default {
  props: ['url']
}
</script>
