import Vue from 'vue'

Vue.prototype.$myInjectedFunction = string => console.log('This is an vue inject', string)