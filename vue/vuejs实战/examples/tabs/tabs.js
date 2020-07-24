Vue.component('tabs', {
  template: `
    <div class="tabs">
      <div class="tabs-bar">
        <div 
        :class="tabCls(item)"
        v-for="(item,index) in navList"
        @click="handleChange(index)"
        >{{item.label}}</div>
      </div>
      <div class="tabs-content">
        <slot></slot>
      </div>
    </div>
  `,
  props: {
    value: {
      type: [String, Number]
    }
  },
  created () {
    // console.log(this.$options.__proto__)
  },
  data () {
    return {
      currentValue: this.value,
      navList: []
    }
  },
  methods: {
    tabCls (item) {
      return [
        'tabs-tab',
        { 'tabs-tab-active': item.name === this.currentValue }
      ]
    },
    getTabs () {
      // console.log(this.$children[0].$options.__proto__)
      return this.$children.filter(item => item.$options.name === 'pane')
    },
    updateNav () {
      // console.log('updateNav')
      this.navList = []
      // console.log(this.getTabs())
      this.getTabs().forEach((item, index) => {
        this.navList.push({
          label: item.value,
          name: index
        })
        item.name = index
      })
      this.updateStatus()
    },
    updateStatus () {
      this.getTabs().forEach(item => {
        return item.show = item.name === this.currentValue
      })
    },
    handleChange (index) {
      const { name } = this.navList[index]
      // this.currentValue = name
      this.$emit('input', name)
    }
  },
  watch: {
    value (val) {
      // console.log('watch-value')
      this.currentValue = val
    },
    currentValue () {
      // console.log('watch-currentValue')
      this.updateStatus()
    }
  }
})