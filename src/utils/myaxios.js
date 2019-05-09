import axios from 'axios'
import appInfo from './appInfo'
import store from '../store'
import { baseUrl } from '../env'
import { Message } from 'element-ui'

let userAgent = 'front/' + appInfo.name + '/' + appInfo.version

const CONTENTTYPE = 'application/x-www-form-urlencoded;charset=UTF-8'
// 创建axios实例
const service = axios.create({
  // withCredentials: true,
  // baseURL: 'http://localhost:3000',
  baseURL: baseUrl,
  timeout: 15000, // 请求超时时间
  headers: {'Content-Type': CONTENTTYPE}
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    config.headers.MUserAgent = userAgent
    // isLogin
    if (store.getters.isLogin) {
      // let token = store.state.user.token
      // jwt
      // const bearer = 'Bearer '
      // let str = `${bearer}${token}`
      // config.headers['Authorization'] = str
      // config.headers['uid'] = store.state.user.user.uid
    }

    config.headers['Authorization'] = 'Bearer ' + store.getters.getToken.access_token
    if (config.method === 'post') {
      config.data = config.data
    } else if (config.method === 'get') {
      config.params = config.params
    }
    return config
  },
  err => {
    // todo
    console.error(err)
    Promise.reject(err)
  })

// // http response 拦截器
service.interceptors.response.use(
  response => {
    if (response.status && response.status === 200 && !response.data.code) {
      Message.error({message: response.data.msg || '访问出错'})
      return Promise.reject(response)
    }
    // 返回数据
    return response.data
  },
  error => {
    if (error.response.status === 504 || error.response.status === 404) {
      Message.error({message: '服务器被吃了⊙﹏⊙∥'})
      console.error('服务器被吃了⊙﹏⊙∥, ', error)
    } else if (error.response.status === 403) {
      Message.error({message: '权限不足,请联系管理员!'})
      console.error('权限不足,请联系管理员!', error)
    } else {
      Message.error({message: '未知错误!'})
      console.error('服务端发生错误, ', error)
    }
    console.error(JSON.stringify(error)) // console : Error: Reques'serviceSys't failed with status code 402
    // console.error(error)
    // malert.malert('网络访问出错')
    // alert(error)
    return Promise.reject(error)
  })

// https://segmentfault.com/a/1190000012804684

export default service
