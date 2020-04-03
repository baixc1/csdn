//state数据管理
export const state = () => ({
    list: []
})
//state数据改变方法
export const mutations = {
    add(state, text) {
        state.list.push({
            text,
            done: false
        })
    },
    remove(state, index) {
        state.list.splice(index, 1)
    },
    toggle(state, todo) {
        todo.done = !todo.done
    }
}