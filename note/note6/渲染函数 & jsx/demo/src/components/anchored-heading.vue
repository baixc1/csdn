<template>
  <h1>
    <a name="hello-world" :href="`#hello-world${level}`">
      <slot></slot>
    </a>
  </h1>
</template>
<script>
export default {
  props: ['level']
}
</script>