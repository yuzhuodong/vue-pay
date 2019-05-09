<template>
  <div class="event-drops">
    <!-- 就诊时间轴 -->
    <div class="time-axis">
      <div class="time-pick">
        <div class="time-button-group">
          <i :class="this.titleIcon" :style="this.iconStyle"></i>
          <b class="title">{{title}}</b>
          <div class="ed-slot">
            <slot></slot>
          </div>
          <!--<el-button type="primary" style="float: right; margin: 0 20px;" size="mini"><i class="el-icon-picture" style="font-size: 16px;">图片展示</i></el-button>-->
          <el-radio-group v-if="innerRangeOption.length > 0" v-model="tabPosition" style="margin-right: 50px;float: right; border: 1px solid #409EFF; border-radius: 5px;" size="mini" @change="timeScale()">
            <el-radio-button :key="range.label" v-for="range in innerRangeOption" :label="range.label">{{range.text}}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <nodata v-if="data == null"></nodata>
      <div class="eventdrops" ref="eventdrops"></div>
      <div class="tooltip"></div>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import eventDrops from 'event-drops'
  import nodata from '@/components/frame/nodata.vue'
//  import cnLocale from 'd3-time-format/locale/zh-CN.json'

  export default {
    components: {
      nodata
    },
    props: [
      'data', // 数据
      'title', // 标题文字
      'titleIcon', // 标题前的图标
      'titleIconColor', // 图标颜色
      'getData', // 获取数据的方法
      'tooltipTpl', // 一个返回"提示模板html"的方法
      'edOption', // eventDrops的初始化参数
      'rangeOption' // 时间选项
    ],
    data () {
      return {
        iconStyle: null,
        chart: null,
        tabPosition: '10y',
        innerRangeOption: [
          {text: ' 全    部 ', label: '10y'},
          {text: '最近7天', label: '7d'},
          {text: '最近30天', label: '30d'},
          {text: '最近3个月', label: '3m'},
          {text: '最近半年', label: '6m'},
          {text: '最近1年', label: '1y'},
          {text: '最近5年', label: '5y'}
        ],
        tooltip: null,
        innerEdOption: null
      }
    },
    created: function () {
      let self = this
      self.$watch('data', function (newValue, oldValue) {
        self.innerEdOption = self.getInnerEdOption()
        self.showTimeAxis()
      })

      self.iconStyle = 'color: ' + self.titleIconColor
      self.innerRangeOption = self.rangeOption || self.innerRangeOption

      // eventDrops 的 locale 属性第一次展现时不起作用，需要再调用一次，而且 innerEdOption 必须是一个新的对象
//      self.innerEdOption = self.getInnerEdOption()
//      self.showTimeAxis()

//      setTimeout(function () {
//        let lines = self.$el.getElementsByTagName('line')
//        for (let index = 0; index < lines.length; index++) {
//          lines[index].style = 'stroke-width: 1px; stroke: #777; fill: none;'
//        }
//      }, 1)
    },
    mounted: function () {
      let self = this
      if (self.tooltip == null) {
        self.tooltip = d3.select(self.$el.getElementsByClassName('tooltip')[0]).style('opacity', 0).style('pointer-events', 'auto')
      }

      self.innerEdOption = self.getInnerEdOption()
      self.showTimeAxis()
    },
    activated: function () {
      let self = this
      if (self.chart == null) {
        self.innerEdOption = self.getInnerEdOption()
        self.showTimeAxis()
      }
    },
    deactivated: function () {
      let self = this
      if (self.chart) {
        self.chart.destroy()
        self.chart = null
      }
    },
    beforeDestroy: function () {
      let self = this
      if (self.chart) {
        self.chart.destroy()
        self.chart = null
      }
    },
    methods: {
      getInnerEdOption () {
        let self = this
        let tmp = {
          d3,
          locale: {
            'dateTime': '%x %A %X',
            'date': '%Y年%-m月%-d日',
            'time': '%H:%M:%S',
            'periods': ['上午', '下午'],
            'days': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            'shortDays': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            'months': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            'shortMonths': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
          },
          bound: {
            format: d3.timeFormat('%Y年%B月%d日')
          },
          axis: {
            formats: {
              milliseconds: '%H:%M:%S.%L',
              seconds: '%H:%M:%S',
              minutes: '%H:%M',
              hours: '%H:%M',
              days: '%b月%d日', // '%a'
              weeks: '%b月%d日',
              months: '%B月',
              year: '%Y年'
            }
          },
          line: {
            color: (d, index) => index % 2 === 0 ? '#409EFF' : '#67C23A',
            height: 60
          },
          drop: {
            radius: 10,
            onClick: data => {
            },
            onMouseOver: data => {
              this.tooltip
              .transition()
              .duration(100)
              .style('opacity', 0.8)
              .style('pointer-events', 'auto')

              this.tooltip
              .html(
                self.tooltipTpl(data)
//              `
//                    <div class="commit">
//                      ${data.date + '&nbsp;&nbsp;&nbsp;&nbsp;' + data.deptName + '&nbsp;&nbsp;&nbsp;&nbsp;' + data.diagnosis}
//                    </div>
//                `
              )
              .style('left', `${d3.event.pageX - 10}px`)
              .style('top', `${d3.event.pageY + 20}px`)
            },
            onMouseOut: data => {
              this.tooltip
              .transition()
              .style('opacity', 0)
              .style('pointer-events', 'none')
            },
            date: d => new Date(d.date)
          },
          label: {
            width: 100
          }
        }
        if (self.edOption != null) {
          for (let key in self.edOption) {
            tmp[key] = self.edOption[key]
          }
        }
        return tmp
      },
      timeScale () {
        let self = this
        let startDate = new Date()
        let offset = parseInt(self.tabPosition.substring(0, self.tabPosition.length - 1))
        if (self.tabPosition.endsWith('d')) {
          startDate.setDate(startDate.getDate() - offset)
        } else if (self.tabPosition.endsWith('m')) {
          startDate.setMonth(startDate.getMonth() - offset)
        } else if (self.tabPosition.endsWith('y')) {
          startDate.setYear(startDate.getYear() + 1900 - offset)
        }

        self.innerEdOption = self.getInnerEdOption()

        let range = {
          start: startDate,
          end: new Date()
        }

        self.innerEdOption.range = range
        self.showTimeAxis()
      },
      showTimeAxis () {
        let self = this

        if (self.data == null) {
          return
        }

        if (self.chart != null) {
          self.chart.destroy()
          let svg = self.$refs.eventdrops.getElementsByTagName('svg')[0]
          self.$refs.eventdrops.removeChild(svg)
        }

        self.chart = eventDrops(self.innerEdOption)

        d3.select(self.$el.getElementsByClassName('eventdrops')[0])
        .data([self.data || []])
        .call(self.chart)
      }
    }
  }
</script>

<style scoped>
  /*.time-axis {*/
    /*margin-bottom: 20px;*/
    /*height: 240px;*/
  /*}*/

  .time-axis .time-pick {
    position: relative;
    height: 40px;
  }

  .time-button-group {
    width: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    height: 30px;
  }

  .title-icon {
    line-height: 35px;
  }

  .title {
    line-height: 35px;
    padding-left: 5px;
  }

  .el-radio-button {
    border-right: 1px solid #409EFF;
  }

  .el-radio-group :last-child {
    border-right: 0;
  }

  .tooltip {
    position: fixed;
    background: #555;
    border: 3px solid #555;
    border-radius: 5px;
    padding: 0.1rem 0.1rem;
    color: white;
    line-height: 1.4rem;
  }

  .tooltip .commit {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .tooltip .avatar {
    width: 5rem;
    height: 5rem;
    border-radius: .5rem;
    margin-right: 1rem;
    flex: 0 0 5rem;
  }

  .tooltip .content {
    flex: 1 0 0;
  }

  .tooltip h3 {
    font-size: 1rem;
  }

  .tooltip p {
    font-size: .9rem;
    color: #777;
  }

  .line-separator {
    stroke-width: 1px;
    stroke: #777;
    fill: none;
  }

  .ed-slot {
    display: inline-block;
    float: right;
  }

</style>
