<template>
  <div>
    <nodata v-if="data == null"></nodata>
    <div v-if="data != null" class="square-body" ref="square"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import nodata from '@/components/frame/nodata.vue'

  export default {
    components: {
      nodata
    },
    props: [
      'data' // 数据
    ],
    data () {
      return {
        myChart: null,
        resizeListener: null
      }
    },
    mounted: function () {
      let self = this
      if (self.data != null) {
        self.showSquare()
      }
      self.$watch('data', function (newValue, oldValue) {
        console.log(newValue)
        self.showSquare()
      })
      self.resizeListener = function () {
        if (self.myChart) {
          self.myChart.resize()
        }
      }
      window.addEventListener('resize', self.resizeListener)
    },
    activated: function () {
      let self = this
      window.addEventListener('resize', self.resizeListener)
    },
    deactivated: function () {
      let self = this
      window.removeEventListener('resize', self.resizeListener)
    },
    beforeDestroy: function () {
      let self = this
      window.removeEventListener('resize', self.resizeListener)
    },
    methods: {
      showSquare () {
        let self = this
        if (self.myChart == null) {
          self.myChart = echarts.init(self.$refs.square)
        }
        let option = {
          tooltip: {
            textStyle: {
              color: '#FFF'
            }
          },
          series: [{
            type: 'treemap',
            left: 0,
            right: 0,
            top: 10,
            bottom: 0,
            roam: false,
            nodeClick: false,
            breadcrumb: {
              show: false
            },
            label: {
              color: '#000',
              fontSize: 20,
              fontWeight: 'bold',
              formatter: '{b} {c}次'
            },
            data: null,
            levels: [
              {
                color: ['#409EFF'],
                itemStyle: {
                  normal: {
                    borderWidth: 0
                  }
                }
              },
              {
                colorSaturation: [0.8, 0.65],
//                color: ['#942e38', '#aaa', '#269f3c'],
                itemStyle: {
                  normal: {
                    gapWidth: 5
                  }
                }
              }
            ]
          }]
        }
        option.series[0].data = self.data
        self.myChart.setOption(option)
      }
    }
  }
</script>

<style scoped>

  .square-body {
    height: 240px;
  }

</style>
