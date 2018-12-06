import axios from '@/utils/myaxios'
import {commUrl} from '@/env'
import qs from 'qs'

const getInvoicedDetails = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/givenInvoice', {
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
    axios.put(commUrl + '/givenInvoice/modify', qs.stringify(editparam))
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
    axios.post(commUrl + '/givenInvoice/save', qs.stringify(postparam))
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
