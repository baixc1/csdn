<template>
  <div>
    <p class="p1"></p>
    <img src="@/assets/1.jpg" />
  </div>
</template>
<style scoped>
.p1 {
  width: 100px;
  height: 100px;
  background: url(~assets/1.jpg) no-repeat center/contain;
}
img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>