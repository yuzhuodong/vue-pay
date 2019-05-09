import axios from '@/utils/myaxios'

const getTransactionDetail = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get('/payinfo', {
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
