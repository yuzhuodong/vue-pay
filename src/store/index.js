import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'
import errorLog from './modules/errorLog'
import patient from './modules/patient'
import nav from './modules/nav'
import menu from './modules/menu'
// import * as types from './mutationTypes'
// import * as lstore from '@/utils/storage'

Vue.use(Vuex)

const state = {
  // isLoading: false,
  // menus: JSON.parse(sessionStorage.getItem(types.MENUS)) || {}
  // menus: JSON.parse(lstore.getLStore(types.MENUS)) || {}
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    user,
    app,
    errorLog,
    patient,
    nav,
    menu
  }
})
