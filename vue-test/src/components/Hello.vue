<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
  <li v-for="item in arr" @click="onClick($event, item)" track-by="$index">
    {{ item }} 
  </li>

 
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello World!',
      id:21,
      arr:[3,4,5]
    }
  },
  route: {
    data: function (transition) {
     console.log(transition)
    }
  },
  methods:{
      onClick(i, v){
      console.log(v);
         this.$router.go({ name: 'xx', params: { id: 123 }})
      }
  }
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>
