<template>
  <div id="app">
    <!-- <timer-component :frequency=10000 /> -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "~@/assets/css/main.scss";
</style>

<script>
import { title } from 'src/utils'

export default {
  name: 'app',
  components: {
  },
  mounted () {
    title()
  }
}
</script>
