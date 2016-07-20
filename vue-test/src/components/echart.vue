<template>
  <div>
    <select v-model="selected">
      <option selected>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <span>Selected: {{ selected }}</span>

    <chart :options="option"></chart>
  </div>
</template>

<style>
.echarts {
  height: 300px;
}
</style>

<script>
export default {
  data: function () {
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }

    //
    return {
      selected:"A",
      mock:{
        "A":{
          titleArry:['门店员工','职能员工','促销员'],
          dataBarRespon:[{value:335, name:'门店员工'},{value:310, name:'职能员工'},{value:254, name:'促销员'}]
          },        
        "B":{
          titleArry:['门店员工','职能员工','促销员'],
          dataBarRespon:[{value:335, name:'门店员工'},{value:210, name:'职能员工'},{value:234, name:'促销员'}]
        },
        "C":{
          titleArry:['门店员工','职能员工','促销员'],
          dataBarRespon:[{value:335, name:'门店员工'},{value:310, name:'职能员工'},{value:234, name:'促销员'}]
        }
      },
      polar: {
        title : {
          text: '门店数量',
           x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal',
          bottom : 'bottom',
          data: ['门店员工','职能员工','促销员']
        },
        series : [
          {
            name: '门店数量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '51%'],
            data:[],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }

  },
  computed:{
    option:function(){
      let o = this.polar
      o.legend.data = this.mock[this.selected].titleArry
      o.series[0].data = this.mock[this.selected].dataBarRespon
      return o;
    }
  }
}
</script>

<!--data:[{value:335, name:'门店员工'},{value:310, name:'职能员工'},{value:234, name:'促销员'}]-->