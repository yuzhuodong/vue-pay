<template>
  <div class="header">
    <div class="logo">鑫亿统一支付平台</div>
    <div class="user-info">
      <span>
        <span style="position: relative;top: 5px"><img src="../../assets/img/user.png" height="25" width="25"/></span>
        <span>欢迎您，{{this.$store.getters.getToken.userName}}</span>
      </span>
      <span @click="logout">
        <span style="position: relative;top: 5px;margin-left: 15px">
          <img src="../../assets/img/exit.png" height="22" width="22"/>
        </span>
        <span>退出</span>
      </span>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    ...mapMutations(['logOut']),
    logout: function () {
      const self = this
      self.$confirm('是否退出登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action, instance) {
          if (action === 'confirm') {
            self.$router.push({path: '/login'})
            location.reload()
            self.$store.dispatch('logOut').then(() => {
            })
          }
        }
      })
    }
    /* logout: function () {
      this.$router.push({path: '/login'})
      this.$store.dispatch('logOut').then(() => {
        location.reload()
      })
    } */
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/vars.scss';
@import '~@/assets/css/mixin.scss';
.header {
    position: relative;
    box-sizing: border-box;
    /*width: calc(100% - 250px);*/
    width: 100%;
    height: 60px;
    font-size: 22px;
    line-height: 60px;
    color: #fff;
    /*float: right;*/
    // background-color: $main-background-color;
    @include backgroundColor($main-background-color)
}

.header .logo {
    float: left;
    font-size: 22px;
    color: #fff;
    text-align: center;
    font-weight: bold;
    padding-left: 10px;
}
.user-info {
    float: right;
    margin-right: 50px;
    font-size: 14px;
    color: #fff;
}
  .el-dropdown-link{
    color: white;
  }
</style>
