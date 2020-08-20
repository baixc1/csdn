<template>
  <div>
    <h3>插槽内容</h3>
    <navigation-link url="/see">
      {{text}}
    </navigation-link>
    <navigation-link url="/default">
    </navigation-link>
    <h3>具名插槽</h3>
    <base-layout>
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>

      <p>A paragraph for the main content.</p>
      <p>And another one.</p>

      <template #footer>
        <p>Here's some contact info</p>
      </template>
    </base-layout>
    <container title="作用域插槽">
      <current-user>
        <template v-slot:default="slotProps">
          {{ slotProps.user.firstName }}
        </template>
      </current-user>
      <current-user>222</current-user>
      <current-user></current-user>
      <current-user v-slot="slotProps">
        独占默认插槽的缩写语法:{{ slotProps.user.firstName }}
      </current-user>
      <current-user>
        <template v-slot:default="slotProps">
          {{ slotProps.user.firstName }} /
        </template>
        <template v-slot:other="{ other }">
          {{other}}
        </template>
        <template #[dynamicSlotName]></template>
      </current-user>
    </container>
    <container title="其它示例">
      <todo-list :todos="todos">
        <template #todo="{ todo }">
          <span v-if="todo.isComplete">✓</span>
          {{ todo.text }}
        </template>
      </todo-list>
      <todo-list :todos="todos"></todo-list>
    </container>
  </div>
</template>
<script>
import NavigationLink from './navigation-link'
import layout from './layout'
import container from '../container'
import currentUser from './current-user'
import TL from './TodoList'
export default {
  data () {
    return {
      text: '查看',
      dynamicSlotName: 'other',
      todos: [
        {
          text: '1',
          isComplete: false
        },
        {
          text: '2',
          isComplete: true
        },
        {
          text: '3',
          isComplete: false
        }
      ]
    }
  },
  components: {
    NavigationLink,
    baseLayout: layout,
    container,
    currentUser,
    todoList: TL
  }
}
</script>
<style scoped>
h3 {
  font-size: 36px;
  border-top: 1px solid #ddd;
}
</style>
