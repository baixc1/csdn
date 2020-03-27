<template>
  <div>
    <h1>i am child1</h1>
    <p>foobar: {{foobar}}</p>
  </div>
</template>
<script>
export default {
  props: ["foobar"]
};
</script>