<template>
  <div class="parent">
    <i :class="this.titleIcon" :style="iconStyle"></i>
    <b :style="textStyle" class="title">{{title}}</b>
    <div class="more" @click="clickMore()">更多</div>
  </div>
</template>

<script>
  export default {
    props: [
      'title', // 标题文字
      'titleColor', // 文字颜色
      'titleIcon', // 标题前的图标
      'titleIconColor' // 图标颜色
    ],
    data () {
      return {
        iconStyle: null,
        textStyle: null
      }
    },
    mounted: function () {
      let self = this

      self.iconStyle = 'color: ' + self.titleIconColor
      self.textStyle = 'color: ' + self.titleColor
    },
    methods: {
      clickMore () {
        this.$emit('clickMore')
      }
    }
  }
</script>

<style scoped>

  .parent {
    height: 25px;
    padding-bottom: 5px;
    border-bottom: 2px solid #409EFF;
  }

  i {
    line-height: 35px;
  }

  .title {
    line-height: 35px;
    padding-left: 5px;
  }

  .more {
    display: inline-block;
    float: right;
    color: #BCBCBC;
    line-height: 35px;
  }

  .more:hover {
    cursor: pointer;
  }

</style>

