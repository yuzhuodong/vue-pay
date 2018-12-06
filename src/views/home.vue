<template>
  <div class="wrapper">
    <el-container style="height: 100%;width: 100%;overflow: scroll">
      <el-header>
        <v-head></v-head>
      </el-header>
      <el-container>
        <el-aside ref="aside" style="width: 250">
          <v-nav @increment="changeWidth"></v-nav>
        </el-aside>
        <el-main>
            <el-tabs v-model="nav.nowNav" type="card" closable @tab-remove="removeTab" @tab-click="currntTab" style="height: 100%;width: 100%">
              <el-tab-pane v-for="(item) in nav.navList" :key="item.path" :label="item.title" :name="item.path" style="height: 100%;width: 100%" >
                <router-view :name="item.path"></router-view>
              </el-tab-pane>
            </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vHead from '@/components/common/header.vue'
import vNav from '@/components/common/nav.vue'
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  mounted () {},
  computed: {
    ...mapState({
      nav: state => state.nav
    })
  },
  watch: {
    nav () {}
  },
  components: {
    vHead,
    vNav
  },
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['DELETENAV', 'SAVENOWNAV']),
    ...mapActions(['saveNav']),
    changeWidth (state) {
      /* if (state) {
        this.$refs.aside.width = 66 + 'px'
      } else {
        this.$refs.aside.width = 15 + '%'
      } */
    },
    removeTab (targetName) {
      console.log('handl tab edit...')
      let tabs = this.nav.navList
      if (this.nav.nowNav === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.path === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              this.SAVENOWNAV(nextTab.path)
            }
            if (nextTab === undefined) {
              this.SAVENOWNAV('')
            }
          }
        })
      }
      this.DELETENAV(targetName)
    },
    // handleTabsEdit (targetName, action) {
    //   if (action === 'remove') {
    //     let tabs = this.nav.navList
    //     let activeName = this.nav.nowNav
    //     if (activeName === targetName) {
    //       tabs.forEach((tab, index) => {
    //         if (tab.path === targetName) {
    //           let nextTab = tabs[index + 1] || tabs[index - 1]
    //           if (nextTab) {
    //             activeName = nextTab.path
    //           }
    //           if (nextTab === undefined) {
    //             activeName = ''
    //           }
    //         }
    //       })
    //     }
    //     this.nav.nowNav = activeName
    //     this.SAVENOWNAV(activeName)
    //     this.nav.navList = tabs.filter(tab => tab.path !== targetName)
    //     this.DELETENAV(targetName)
    //   }
    // },
    currntTab: function (tab, event) {
      this.SAVENOWNAV(tab.name)
    }
  }
}
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-tabs__content {
  height: calc(100% - 56px) ;
}
::-webkit-scrollbar {
  /*width: 4px;
  height: 4px;*/
}
::-webkit-scrollbar-thumb {
  /*border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #06c5d2;*/
}
::-webkit-scrollbar-track {
  /*-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);*/
}
</style>
