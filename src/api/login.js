import {loginService} from '@/utils/loginaxios'
import {authUrl} from '@/env'
import qs from 'qs'
const userLogin = (postparam) => {
  return new Promise((resolve, reject) => {
    loginService.post(authUrl + '/oauth/token', qs.stringify(postparam)
    ).then(response => {
      resolve(response)
    }).catch(e => {
      reject(e)
    })
  })
}
export {
  userLogin
}
