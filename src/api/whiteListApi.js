import axios from '@/utils/myaxios'
import qs from 'qs'

const getWhiteList = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get('/whitelist', {
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
const saveWhiteList = (postparam) => {
  return new Promise((resolve, reject) => {
    axios.post('/whitelist', qs.stringify(postparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}
const deleteWhiteList = (deleteparam) => {
  return new Promise((resolve, reject) => {
    axios.delete('/whitelist', {
      params: deleteparam
    })
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export {
  getWhiteList,
  saveWhiteList,
  deleteWhiteList
}
