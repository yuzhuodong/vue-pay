import * as types from '../mutationTypes'
import * as lstore from '@/utils/storage'

export default {
  state: {
    // patient: JSON.parse(lstore.getLStore(types.PATIENT)) || {}
    patient: {age: '18', areaName: '18号病区', bedNo: '2', cardNo: '3002211', deptName: null, name: '零一二', sex: '男', visitDate: '20180730'}
  },
  mutations: {
    SAVEPATIENT (state, data) {
      lstore.setLStore(types.PATIENT, JSON.stringify(data))
      state.patient = data
    }
  },
  actions: {
    savePatient ({commit}, data) {
      commit('SAVEPATIENT', data)
    }
  },
  getters: {
    getPatient (state) {
      return state.patient
    }
  }
}
