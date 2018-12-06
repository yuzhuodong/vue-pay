import * as types from '../mutationTypes'
import * as lstore from '@/utils/storage'

// 保存菜单信息
export default {
  state: {
    menus: JSON.parse(lstore.getLStore(types.MENUS)) || {}
  },
  mutations: {
    saveMenus (state, data) {
      lstore.setLStore(types.MENUS, data)
      state.menus = data
    },
    clearMenus (state) {
      lstore.removeLStore(types.MENUS)
      // Object.keys(state).forEach(k => Vue.delete(state, k))
      // Object.assign(state, {})
      state.menus = {}
    }
  },
  actions: {
    saveMenus ({commit}, data) {
      commit('saveMenus', data)
    },
    clearMenus ({commit}) {
      commit('clearMenus')
    }
  },
  getters: {
    getMenus (state) {
      return state.menus
    }
  }
}
