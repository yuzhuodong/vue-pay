import {smsService} from '@/utils/loginaxios'
import qs from 'qs'

const getSms = (getparam) => {
  return new Promise((resolve, reject) => {
    smsService.post('/sms/send_code?' + qs.stringify(getparam))
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
