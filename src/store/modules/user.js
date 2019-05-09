// import Vue from 'vue'
import * as types from '../mutationTypes'
import * as lstore from '@/utils/storage'

// 2018.01.08 暂时只保存token，无user 信息
// https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
export default {
  // JSON.parse方法将一个字符串解析成一个JSON对象
  state: {
    // JSON.parse(
    user: JSON.parse(lstore.getLStore(types.USER)) || {},
    token: JSON.parse(lstore.getLStore(types.TOKEN)) || ''
  },
  mutations: {
    saveToken (state, data) {
      lstore.setLStore(types.TOKEN, data)
      state.token = data
      // 从一个对象中解析出字符串
      // sessionStorage.setItem(TOKEN, JSON.stringify(data))
      // ES6语法，从一个对象复制所有的属性到另一个对象，返回state对象
      // Object.assign(state.token, data)
    },
    saveUser (state, data) {
      lstore.setLStore(types.USER, JSON.stringify(data))
      state.user = data
    },
    logOut (state) {
      lstore.removeLStore(types.USER)
      lstore.removeLStore(types.TOKEN)
      lstore.removeLStore(types.NOWNAV)
      lstore.removeLStore(types.NAV)
      // Object.keys(state).forEach(k => Vue.delete(state, k))
      // Object.assign(state, {})
      state.user = {}
      state.token = ''
    }
  },
  actions: {
    saveToken ({commit}, data) {
      commit('saveToken', data)
    },
    logOut ({commit}) {
      commit('logOut')
    }
  },
  getters: {
    isLogin: state => {
      // return (state.user && state.user.id)
      return state.token
    },
    getUser (state) {
      return state.user
    },
    getToken (state) {
      return state.token
    }
  }
}
