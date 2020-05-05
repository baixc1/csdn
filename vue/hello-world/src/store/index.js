export default {
    state: {
        arr: []
    },
    getters: {
        arrFormat(state) {
            let { arr } = state
            return arr.length ? JSON.stringify(arr) : 'no data'
        }
    },
    mutations: {
        arrChange(state, arr) {
            state.arr = arr
        }
    },
    actions: {
        arrChange(context, arr) {
            context.commit('arrChange', arr)
        }
    }
}