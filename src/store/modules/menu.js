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
    }
  },
  actions: {
    saveMenus ({commit}, data) {
      commit('saveMenus', data)
    }
  },
  getters: {
    getMenus (state) {
      return state.menus
    }
  }
}
