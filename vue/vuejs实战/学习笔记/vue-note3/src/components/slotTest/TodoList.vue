<template>
  <ul>
    <li
      v-for="(todo,index) in todos"
      :key="index"
    >
      <!--
    我们为每个 todo 准备了一个插槽，
    将 `todo` 对象作为一个插槽的 prop 传入。
    -->
      <slot
        name="todo"
        :todo="todo"
      >
        <!-- 后备内容 -->
        {{ todo.text }}
      </slot>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['todos']
}
</script>
