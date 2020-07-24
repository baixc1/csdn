Vue.component('pane', {
  name: 'pane',
  template: `
    <div class="pane" v-show="show">
      <slot></slot>
      <input placeholder="修改tab名" v-model="value" />
    </div>
  `,
  data () {
    var a = "1"
    return {
      show: true
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: String
  },
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  },
  watch: {
    value () {
      this.updateNav()
    }
  },
  mounted () {
    this.updateNav()
  }
})