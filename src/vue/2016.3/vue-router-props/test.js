// define some components
var Foo = Vue.extend({
  template: '<p>This is foo!</p>{{x}}<router-view :x=x></router-view>',
  data: function(){
	  return {x:"zzz"}
  }
})

var Bar = Vue.extend({
  template: '<p>This is bar!</p>{{x}}',
  props:['x'],
})
var router = Vue.extend({
  template: '<div id="xpp"></div>'
})
var router1 = Vue.extend({
  template: '<div id="xpp1"><router-view></router-view></div>'
})
new Vue({
 el: 'body',
 components: {
 router: router
 }
 });
 

var App = Vue.extend({})
var router = new VueRouter()


router.map({
  '/': {
    component: Foo,
	 subRoutes: {
      '/bar': {
        component: Bar
      }
	 }
  }
})
router.start(router1, '#xpp')
