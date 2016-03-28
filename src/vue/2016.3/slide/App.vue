<template>
  <div id="app">
  <slider :control="true" :dot="true" :auto="true" dot-float="center">
  <slide v-for="item in items">
  <li><div>{{$index}}</div></li>
  </slide>
</slider>
  </div>
</template>

<script>
import slider from './slider'
import slide from './slide'
import Hello from './components/Hello'

export default {
  data: function(){
    return {
      items:[1,2,3]
    }
  }, 
  components: {
    Hello,
     'slider': slider,
    'slide': slide
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  margin-top: -100px;
  max-width: 600px;
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
