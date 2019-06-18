// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import api from './request/api/'
import store from './store/store'

//import VueScroller from 'vue-scroller'
//Vue.use(VueScroller)

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$api = api;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
