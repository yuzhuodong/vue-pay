import * as types from '../mutationTypes'
import * as lstore from '@/utils/storage'
import {defaultMenu} from '@/api/tempdata/menuData'

export default {
  state: {
    navList: JSON.parse(lstore.getLStore(types.NAV)) || defaultMenu,
    nowNav: lstore.getLStore(types.NOWNAV) || defaultMenu[0].path
  },
  mutations: {
    SAVENAV (state, data) {
      let one = state.navList.find(function (value, index, arr) {
        return value.path === data.path && value.title === data.title
      })
      if (!one) {
        if (state.navList.length > 5) {
          state.navList.splice(0, 1)
        }
        state.navList.push(data)
        lstore.setLStore(types.NAV, state.navList)
      }
    },
    SAVENOWNAV (state, data) {
      state.nowNav = data
      lstore.setLStore(types.NOWNAV, data)
    },
    clearNavList (state) {
      // Object.keys(state).forEach(k => Vue.delete(state, k))
      // Object.assign(state, {})
      state.navList = ''
    },
    clearNowNav (state) {
      lstore.removeLStore(types.NOWNAV)
      // Object.keys(state).forEach(k => Vue.delete(state, k))
      // Object.assign(state, {})
      state.nowNav = ''
    },
    DELETENAV (state, data) {
      state.navList = state.navList.filter(tab => tab.path !== data)
      lstore.setLStore(types.NAV, state.navList)
    }
  },
  actions: {
    saveNav ({commit}, data) {
      commit('SAVENAV', data)
      commit('SAVENOWNAV', data.path)
    },
    clearNowNav ({commit}) {
      commit('clearNowNav')
    },
    clearNavList ({commit}) {
      commit('clearNavList')
    }
  },
  getters: {
    getNav (state) {
      return state.navList
    },
    getNowNav (state) {
      return state.nowNav
    }
  }
}
