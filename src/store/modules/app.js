import * as types from '../mutationTypes'
import * as lstore from '@/utils/storage'

const states = {
  config: {},
  isLoading: false,
  message: lstore.getLStore(types.MESSAGE) || [],
  task: lstore.getLStore(types.TASK) || []
}

const mutations = {
  [types.UPDATELODINGSTATUS] (state, data) {
    state.isLoading = data.isLoading
  },
  saveMessage (state, data) {
    lstore.setLStore(types.MESSAGE, data)
    state.message = data
  },
  saveTask (state, data) {
    lstore.setLStore(types.TASK, data)
    state.task = data
  },
  removeMessage (state) {
    lstore.removeLStore(types.MESSAGE)
    state.message = []
  },
  removeTask (state) {
    lstore.removeLStore(types.TASK)
    state.task = []
  }
}

const getters = {
  isLoading: state => state.isLoading,
  getMessage: state => {
    return state.message
  },
  getTask: state => {
    return state.task
  }
}

export default {
  state: states,
  mutations: mutations,
  getters: getters
}
