import axios from '@/utils/myaxios'
import {commUrl} from '@/env'

const getTransactionDetail = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/payinfo', {
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
export {
  getTransactionDetail
}
