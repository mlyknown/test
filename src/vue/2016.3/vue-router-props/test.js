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


var App = Vue.extend({})
var router = new VueRouter()


router.map({
  '/foo': {
    component: Foo,
	 subRoutes: {
      '/bar': {
        component: Bar
      }
	 }
  }
})
router.start(App, '#app')
