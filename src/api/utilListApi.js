import axios from '@/utils/myaxios'
import qs from 'qs'
import {commUrl} from '@/env'

const getSms = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.post(commUrl + '/sms/send_code?' + qs.stringify(getparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export {
  getSms
}
