<template>
  <div class="menu">
    <el-menu ref="menu"
             :default-active="nowNav"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#324157"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse="collapse"
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
    <div style="width: 60px;height: 60px; position: absolute;bottom: 20px;" v-on:click="telescopic" >
      <img  :src="imgUrl"  height="50" width="50"/>
    </div>
  </div>

</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import SidebarItem from './SidebarItem'
  import {menu} from '@/api/getData'
  export default {
    mounted () {
      this.getMenuTree()
    },
    components: { SidebarItem },
    computed: {
      ...mapState({
        nowNav: state => state.nav.nowNav
      })
    },
    watch: {
      nowNav () {
      }
    },
    data () {
      return {
        value: '',
        collapse: false,
        state: true,
        permission_routers: [],
        iconclass: 'el-icon-arrow-left',
        imgUrl: require('@/assets/img/close.png')
      }
    },
    methods: {
      ...mapActions([
        'saveNav', 'saveMenus'
      ]),
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleSelect (item) {
        const data = {}
        data.path = item.path
        data.title = item.title
        this.saveNav(data)
      },
      telescopic () {
        if (this.state) {
          this.collapse = true
          this.$emit('increment', this.state)
          this.imgUrl = require('@/assets/img/open.png')
          this.state = false
        } else {
          this.collapse = false
          this.$emit('increment', this.state)
          this.imgUrl = require('@/assets/img/close.png')
          this.iconclass = 'el-icon-arrow-left'
          this.state = true
        }
      },
      getMenuTree: function () {
        const self = this
        let userName = this.$store.getters.getToken.userName
        let param = {}
        param.userName = userName
        menu.getMenuByUserName(param).then(data => {
          self.permission_routers = data.data.dataInfo.children
          self.saveMenus(data.data.dataInfo.children)
        })
      }
    }
  }

</script>

<style scoped>
  .menu {
    background-color: #324157;
    height: 100%;
  }
  .el-menu:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
  }
</style>
