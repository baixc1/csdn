<template>
  <div>i am users-id</div>
</template>
<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
};
</script>