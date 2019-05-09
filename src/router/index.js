import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import * as examples from '@/views/examples'
import * as env from '@/env'
import axios from '@/utils/myaxios'
let commUrl = env.commUrl
let demo = env.demo

Vue.use(VueRouter)
let pageobj = {
  ...examples
}
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/video',
    component: resolve => require(['@/views/video.vue'], resolve)
  },
  {
    path: '/login',
    component: resolve => require(['@/views/login.vue'], resolve)
  },
  {
    path: '/personRegister',
    component: resolve => require(['@/views/personRegister.vue'], resolve)
  },
  {
    path: '/merchantRegister',
    component: resolve => require(['@/views/merchantRegister.vue'], resolve)
  },
  {
    path: '/home',
    component: resolve => require(['@/views/home.vue'], resolve),
    children: [
      {
        path: '/',
        components: pageobj,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: resolve => require(['@/views/404.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes: [...routes],
  strict: process.env.NODE_ENV !== 'production'
})

router.beforeEach((to, from, next) => {
  console.log('goto: ', to)
  console.log('from: ', from)
  console.log('next: ', next)
  if (demo) {
    runDemo(to, from, next)
  } else {
    run(to, from, next)
  }
})

function runDemo (to, from, next) {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.getters.getToken) {  // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
}

function run (to, from, next) {
  var ektoken = ''
  console.info(to)
  if (to && to.query) {
    ektoken = to.query.ektoken
  }
  dealEktokenInfo(ektoken, to, from, next)
}

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', { isLoading: false })
  if (process.env.NODE_ENV === 'production') {
  }
})

function dealEktokenInfo (ektoken, to, from, next) {
  if (ektoken) {
    console.log('use ektoken', ektoken)
    axios
      .post(commUrl + '/ekapi/getTokenInfo?ektoken=' + ektoken, {})
      .then(response => {
        var resdata = response.data
        if (resdata.code === '0') {
          // var udata = resdata.data
          // var userinfo = udata.user
          sessionStorage.setItem('token', ektoken)
          initrouter(to, from, next)
        } else {
          initrouter(to, from, next)
        }
      })
      .catch(e => {
        initrouter(to, from, next)
      })
  } else {
    initrouter(to, from, next)
  }
}

function initrouter (to, from, next) {
  console.info(next)
  if (to.path !== '/login') {
    var sessiontokon = sessionStorage.getItem('token')
    if (sessiontokon) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    store.commit('updateLoadingStatus', { isLoading: true })
    next()
  }
}

export default router
