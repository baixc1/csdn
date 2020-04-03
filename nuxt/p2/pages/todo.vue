<template>
  <div>
    todo page
    <div v-for="(item,index) in list" :key="index">
      <input type="checkbox" :checked="item.done" @change="toggle(item)" />
      <span :class="{ done: item.done }">{{ item.text }}</span>
      <button @click="remove(index)">删除</button>
    </div>
    <p>
      <input placeholder="回车新增" @keyup.enter="add" />
    </p>
    <div>
      store count： {{count}}
      <button @click="countAdd">add</button>
    </div>
    <div>
      store count1： {{count1}}
      <button @click="countMinus">minus</button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  computed: {
    list() {
      return this.$store.state.todo.list;
    },
    count() {
      return this.$store.state.count;
    },
    count1() {
      return this.$store.state.count1;
    }
  },
  methods: {
    add(e) {
      this.$store.commit("todo/add", e.target.value);
      e.target.value = "";
    },
    remove(index) {
      this.$store.commit("todo/remove", index);
    },
    ...mapMutations({
      toggle: "todo/toggle",
      countAdd: "add",
      countMinus: "minus"
    })
  }
};
</script>
<style>
.done {
  text-decoration: line-through;
}
</style>