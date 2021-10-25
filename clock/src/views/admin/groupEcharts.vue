<template>
  <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
</template>


<script>
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import {
  BarChart,
  LineChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';
echarts.use(
    [ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, LineChart, CanvasRenderer]
);
import {getBarList} from "@/api/group";
export default {
  name: "groupEcharts",
  data() {
      return{
        listq: [],
        checkX: [],
      }
  },
  created() {
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine(){
      let _this = this
      getBarList().then(res => {
      let myChart = _this.$echarts.init(document.getElementById('myChart'))
        let clocknum1 = res.data.clocknum
        let gnum1 = res.data.groupnum
        //  计算折线率
        for(var i in gnum1){
          var listarr = clocknum1[i]/gnum1[i]*100
          this.listq.push(listarr)
        }
        console.log(this.listq)

        //  计算横坐标长度
        for(var i in gnum1){
          var listarr1 = i
          this.checkX.push(listarr1)
        }

      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['小组人数', '今日打卡数', '平均打卡率']
        },
        xAxis: [
          {
            type: 'category',
            // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            // data: ['1','2','3','4','5','6','7'],
            // data: this.checkX,
            data: res.data.groupname,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '小组人数',
            min: 0,
            max: 100,
            interval: 20,
            // axisLabel: {
            //   formatter: '{value} ml'
            // }
          },
          {
            type: 'value',
            name: '今日打卡数',
            min: 0,
            max: 100,
            interval: 20,
            // axisLabel: {
            //   formatter: '{value} °C'
            // }
          }
        ],
        series: [
          {
            name: '小组人数',
            type: 'bar',
            // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            data: res.data.groupnum
          },
          {
            name: '今日打卡数',
            type: 'bar',
            // data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            data: res.data.clocknum
          },
          {
            name: '平均打卡率',
            type: 'line',
            yAxisIndex: 1,
            data: this.listq
          }
        ]
      })

      })



    },
  },
}
</script>

<style scoped>

</style>
