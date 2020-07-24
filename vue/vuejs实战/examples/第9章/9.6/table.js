Vue.component('vTable', {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentColumns: [],
      currentData: []
    }
  },
  methods: {
    makeColumns () {
      this.currentColumns = this.columns.map((col, index) => {
        col._sortType = 'normal'
        col._index = index
        return col
      })
    },
    makeData () {
      this.currentData = this.data.map((row, index) => {
        row._index = index
        return row
      })
    },
    handleSort (index, isAsc) {
      const { currentData, currentColumns } = this
      const { key } = currentColumns[index]
      currentColumns.forEach(col => col._sortType = 'normal')
      currentColumns[index]._sortType = isAsc ? 'asc' : 'desc'
      currentData.sort((a, b) => {
        const rate = isAsc ? 1 : -1
        return (a[key] - b[key]) * rate
      })
    }
  },
  mounted () {
    this.makeColumns()
    this.makeData()
  },
  render (h) {
    const ths = this.currentColumns.map(item => {
      const { _sortType, title } = item
      if (_sortType) {
        const hEle = isAsc => {
          h('a', {
            class: {
              on: isAsc
            },
            on: {
              click: () => {
                this.handleSort(index, isAsc)
              }
            }
          })
        }
        return h('th', [
          h('span', title),
          hEle(true),
          hEle(false)
        ])
      } else {
        return h('th', title)
      }
    })
    const trs = this.currentData.map(item => {
      return h('tr', this.currentColumns.map(subItem => {
        return h('td', item[subItem.key])
      }))
    })

    return h('table', [
      h('thead', [
        h('tr', ths)
      ]),
      h('tbody', trs)
    ])
  }
})