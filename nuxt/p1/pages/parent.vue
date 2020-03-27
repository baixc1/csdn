<template>
  <div>
    <h1>i am parent</h1>
    <nuxt-link to="/parent">parent-index</nuxt-link>
    <nuxt-link to="/parent/child1">child1</nuxt-link>
    <nuxt-link to="/parent/child2">child2</nuxt-link>
    <nuxt-child :foobar="123" :a="321" />
  </div>
</template>