<template>
  <div>
    <h1>我是子级页面</h1>
    <p>foobar：{{foobar}}</p>
  </div>
</template>
<script>
export default {
  props: ["foobar"]
};
</script>