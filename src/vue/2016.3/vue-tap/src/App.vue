<template>
  <div id="app">
    xx
    <div v-tap='test(2, $event)' a="hi">cccccccc</div>
      <div v-tap='test(2, $event)'>3213213213</div>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  components: {
    Hello
  },
  methods:{
    test: function(i, e){
      debugger
      alert(e, i);
    }
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
