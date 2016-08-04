<template>
<div>

<select v-model="value.v1">
  <option selected>A</option>
  <option v-for="item in list.list1">{{item}}</option>
</select>

<select v-model="value.v2">
  <option selected>A</option>
  <option v-for="item in list.list1">{{item}}</option>
</select>

</div>



    

 
</template>

<script>
export default {
    props: {
      value:Object,
      list: Object
    }
}
</script>


<style scoped>

</style>
