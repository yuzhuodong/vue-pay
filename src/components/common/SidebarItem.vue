<template>
  <div class="side-bar-item">
    <template v-for="item in routes" class="">
      <!-- 一级菜单 -->
      <template v-if="item.children">
        <el-submenu :index="item.path"
                    @click="handleSelect(item)"
                    :key="item.menuCode">
          <template slot="title">
            <i class="el-icon-menu"></i><span slot="title">{{ item.nodeText }}</span>
          </template>
          <!-- 重新调用组件 -->
          <sidebar-item :routes="item.children"></sidebar-item>
        </el-submenu>
      </template>
      <!-- 二级菜单 -->
      <template v-else>
        <el-menu-item :index="item.path"
                      @click="handleSelect(item)"
                      :key="item.menuCode">
          <i :class="item.icon"></i><span slot="title">{{ item.nodeText }}</span>
        </el-menu-item>
      </template>

    </template>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'SidebarItem',
    nodeText: '',
    props: {
      routes: {
        type: Array
      }
    },
    methods: {
      ...mapActions([
        'saveNav'
      ]),
      handleSelect (item) {
        const data = {}
        data.path = item.path
        data.title = item.nodeText
        this.saveNav(data)
      }
    }
  }
</script>

<style>
  .el-menu--collapse >.side-bar-item >.el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }

  .el-menu--collapse > .side-bar-item > .el-submenu >.el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }

  /* .el-menu-item.is-active {
     background-color: rgb(231, 235, 240) !important;
  } */
</style>
