import Vue from 'vue'
import App from './App'
import VueTap from './lib/vue-tap' 

Vue.test = {test:1}
Vue.use(VueTap)
debugger
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})


// 1.在update里的this指向是directive实例，而不是vm，也不是dom
// 2.在directive('name',{}) 对象里可自定义属性和方法。调用就是self.xxx
// 3.开启自定义指令接受内联语句 acceptStatement:true
// 4.最后的接口别忘了 Vue.use(obj)