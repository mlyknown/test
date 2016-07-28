import Vue from 'vue'
import App from './App'
import Hello from './components/Hello'
import VueRouter from 'vue-router'

/* eslint-disable no-new */
var ECharts = require('vue-echarts/dist/vue-echarts')
// register component to use
Vue.component('chart', ECharts)
Vue.config.debug = true;

Vue.use(VueRouter);
// debugger
const router = new VueRouter();

router.map({
    '/xx/:id': {
      name:"xx",
        component: Hello
    }
})

// new Vue({
//   el: 'body',
//   components: { App }
// })
router.start(App, 'app');
