import Vue from 'vue'
import App from './App'

/* eslint-disable no-new */
var ECharts = require('vue-echarts/dist/vue-echarts')
// register component to use
Vue.component('chart', ECharts)

new Vue({
  el: 'body',
  components: { App }
})
