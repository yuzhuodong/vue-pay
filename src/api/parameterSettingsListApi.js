import axios from '@/utils/myaxios'
import qs from 'qs'
import {commUrl} from '@/env'

const getParameter = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/appParam', {
      params: getparam
    })
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 按照id查询参数
const getParameterById = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/appParam/' + getparam.id + '', {
      params: getparam
    })
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 按照code查询参数
const getParameterByCode = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/appParam/code/' + getparam.code + '', {
      params: getparam
    })
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

const editParameter = (editparam) => {
  return new Promise((resolve, reject) => {
    axios.put(commUrl + '/appParam', qs.stringify(editparam))
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export {
  getParameter,
  editParameter,
  getParameterById,
  getParameterByCode
}
