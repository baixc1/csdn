
import axios from "axios";

export const state = () => ({
    a: 0,
    b: 0
})
export const mutations = {
    setA(state, val) {
        state.a = val
    },
    setB(state, val) {
        state.b = val
    },
}
export const actions = {
    async getB({ commit }) {
        let { data } = await axios.get("http://localhost:8081/");
        commit("setB", data.a);
    }
}