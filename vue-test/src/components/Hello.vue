<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <img src="../../static/13.png"/>
    <img src="../assets/1.png"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello World!',
      id:21
    }
  },
  route: {
    data: function (transition) {
      debugger
      var id = transition.to.params.id
      return {
        id
      }
    }
  }
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>
