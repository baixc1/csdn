<template>
  <div class="hello">
    <div>
      <el-input v-model="text" @input="input"></el-input>
      <el-button type="primary" @click="add">add</el-button>
    </div>
    <div>
      <div v-for="(item,index) in arr" :key="item.id">
        {{item.text}}
        <u @click="del(index)">Remove</u>
      </div>
    </div>
  </div>
</template>

<script>
let id = 0;
let timer;
export default {
  name: "HelloWorld",
  data() {
    return { text: "", arr: [] };
  },
  methods: {
    input() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        this.add();
        timer = null;
      }, 500);
    },
    add() {
      id++;
      let { text, arr } = this;
      this.arr = [{ text, id }, ...arr];
      this.updateEmit();
    },
    del(index) {
      this.arr.splice(index, 1);
      this.updateEmit();
    },
    updateEmit() {
      this.$emit("input", this.arr.map(item => item.text));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-input {
  margin-right: 10px;
  width: 180px;
}
</style>
