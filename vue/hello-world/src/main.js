import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import { routes } from './router'
import Vuex from 'vuex'
import storeOptions from './store'

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

const store = new Vuex.Store(storeOptions)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})