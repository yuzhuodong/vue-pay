import axios from '@/utils/myaxios'
import qs from 'qs'

const getInvoicedDetails = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get('/givenInvoice', {
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
const editInvoicedDetails = (editparam) => {
  return new Promise((resolve, reject) => {
    axios.put('/givenInvoice/modify', qs.stringify(editparam))
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}
const saveInvoicedDetails = (postparam) => {
  return new Promise((resolve, reject) => {
    axios.post('/givenInvoice/save', qs.stringify(postparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export {
  getInvoicedDetails,
  editInvoicedDetails,
  saveInvoicedDetails
}
