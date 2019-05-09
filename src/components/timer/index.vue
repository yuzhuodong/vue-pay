<template>
  <div class="timer">
      <i class="iconfont1 icon-jishiqi"></i>
      <span>
      剩余时间：{{time}}
      </span>
</div>
</template>

<script>
const props = {
  countTime: {
    type: Number,
    default: 10
  }
}
export default {
  data () {
    return {
      limitTime: this.countTime,
      time: '',
      stop: false
    }
  },
  props: props,
  methods: {
    timeDown () {
      let limit_time = this.limitTime
      let d = parseInt(limit_time / (24 * 60 * 60))
      let h = this.formate(parseInt(limit_time / (60 * 60) % 24))
      let m = this.formate(parseInt(limit_time / 60 % 60))
      let s = this.formate(parseInt(limit_time % 60))
      if (limit_time <= 0) {
       // let btn = document.getElementsByClassName("btn")[0].firstChild;
        this.stop = true
        this.time = '订单超时，请重新下单'
        // btn.setAttribute("disabled", true);
        return
      }
      if (d > 0) {
        this.time = `${d}天${h}小时${m}分${s}秒`
      }
      if (d <= 0 && h > 0) {
        this.time = `${h}小时${m}分${s}秒`
      }
      if (d <= 0 && h <= 0) {
        this.time = `${m}分${s}秒`
      }
    },
    formate (time) {
      if (time >= 10) {
        return time
      } else {
        return `0${time}`
      }
    }
  },
  mounted () {
    this.timeDown()
    // let timer =
    var that = this
    this.$options.timer = setInterval(() => {
      if (this.stop === true) {
        clearInterval(that.$options.timer)
      }
      this.limitTime --
      this.timeDown()
    }, 1000)
  },
  // 是否需要
  beforeDestroy () {
    clearInterval(this.$options.timer)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';

.timer {
      margin-bottom: 0.1rem;
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      background: #fffae4;
      @include sc(0.22rem, rgb(233, 159, 63));
    }
</style>
