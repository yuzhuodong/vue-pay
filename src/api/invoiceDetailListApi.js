import axios from '@/utils/myaxios'
import qs from 'qs'

const getInvoiceDetail = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get('/invoice', {
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

// 查询待开发票信息
const getUnDrawInvoiceDetail = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get('/invoice/unDraw', {
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

const saveInvoiceDetail = (postparam) => {
  return new Promise((resolve, reject) => {
    axios.post('/invoice', qs.stringify(postparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export {
  getInvoiceDetail,
  saveInvoiceDetail,
  getUnDrawInvoiceDetail
}
