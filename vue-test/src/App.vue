<template>
  <div id="app">
    <!--<hello></hello>
    <echart></echart>-->
   <!-- <a v-link="{ name: 'xx', params: { id: id },activeClass: 'class' }" :class="class">User</a>
    <div @click="toggleShow" :class="[isShow? 'icon-1':'icon-2' ]">hahah</div>
    <router-view></router-view>
    <hello></hello> -->
    <options :list="list" :value.sync="value"></options>
    {{value.v1}}{{value.v2}}
  </div>
</template>

<script>
import Hello from './components/Hello'
import Echart from './components/echart'
import Options from './components/select'

export default {
  data: function () {
    return {
      id:"2423",
      isShow:true,
      list:{list1:[1,2,"list3"],list1:["hah",2,"list3"]},
      value:{}
    }
  },
  methods:{
    toggleShow: function() {
      this.isShow = !this.isShow
    }
  },
  components: {
    Hello,
    Echart,
    Options
  },
  computed:{
    class(){
      const a = "icon-"
      
      return a+"this.$route.params.id";
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
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
