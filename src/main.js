import Vue from 'vue'
import router from './router'
import store from './store/'
import axios from '@/utils/myaxios'
import viewerjs from 'viewerjs'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import sha1 from 'sha1'
import './assets/iconfont/iconfont.css'
import 'viewerjs/dist/viewer.css' // viewerjs css
import App from './App'
import '@/utils/errorLog'// error log
import 'jquery'
import { dateFormat } from '@/utils'
import toExcel from './excel/json2excel'
Vue.prototype.$axios = axios
// 时间格式化
Vue.prototype.$dateFormat = dateFormat
Vue.prototype.$viewerjs = viewerjs
Vue.prototype.$sha1 = sha1

Vue.use(Element, {
  size: 'mediu'
})

// 滤非法字符
Vue.filter('validate', function (val) {
  val = val.toString()
  let reg = '/[`~!@#$%^&*()_+<>?:"{},\\/;\']/im'
  if (reg.test(val)) {
    console.info(5555)
    $.alert('请勿输入非法字符", "温馨提示')
    // 返回时删除非法字符
    return val.substr(0, val.length - 1)
  } else {
    // 原内容返回
    return val
  }
})

Vue.config.productionTip = false

Vue.prototype.$toExcel = toExcel

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
