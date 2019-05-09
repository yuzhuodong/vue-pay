import axios from 'axios'
import appInfo from './appInfo'
import store from '../store'
import { baseUrl } from '../env'
import { Message } from 'element-ui'

let userAgent = 'front/' + appInfo.name + '/' + appInfo.version
const CONTENTTYPE = 'application/x-www-form-urlencoded;charset=UTF-8'

// 创建axios实例

const loginService = axios.create({
  baseURL: baseUrl,
  timeout: 15000, // 请求超时时间
  headers: {'Content-Type': CONTENTTYPE}
})
const smsService = axios.create({
  baseURL: baseUrl,
  timeout: 15000, // 请求超时时间
  headers: {'Content-Type': CONTENTTYPE}
})
const registerService = axios.create({
  baseURL: baseUrl,
  timeout: 15000, // 请求超时时间
  headers: {'Content-Type': CONTENTTYPE}
})
const merchantService = axios.create({
  baseURL: baseUrl,
  timeout: 15000, // 请求超时时间
  headers: {'Content-Type': CONTENTTYPE}
})
const merchantMsgService = axios.create({
  baseURL: baseUrl,
  timeout: 15000, // 请求超时时间
  headers: {'Content-Type': CONTENTTYPE}
})
const roleService = axios.create({
  baseURL: baseUrl,
  timeout: 15000, // 请求超时时间
  headers: {'Content-Type': CONTENTTYPE}
})

// http request 拦截器

// http request 拦截器
loginService.interceptors.request.use(
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

    config.headers['Authorization'] = 'Basic YXBwMzoxMjM='
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
smsService.interceptors.request.use(
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
registerService.interceptors.request.use(
  config => {
    config.headers.MUserAgent = userAgent
    // isLogin
    if (store.getters.isLogin) {
    }
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
merchantService.interceptors.request.use(
  config => {
    config.headers.MUserAgent = userAgent
    // isLogin
    if (store.getters.isLogin) {
    }
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
merchantMsgService.interceptors.request.use(
  config => {
    config.headers.MUserAgent = userAgent
    // isLogin
    if (store.getters.isLogin) {
    }
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
roleService.interceptors.request.use(
  config => {
    config.headers.MUserAgent = userAgent
    // isLogin
    if (store.getters.isLogin) {
    }
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

 // http response 拦截器
loginService.interceptors.response.use(
  response => {
    if (response.status !== 200) {
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
      return Promise.reject(error)
    }
    console.error(JSON.stringify(error)) // console : Error: Reques'serviceSys't failed with status code 402
    // console.error(error)
    // malert.malert('网络访问出错')
    // alert(error)
    return Promise.reject(error)
  })
smsService.interceptors.response.use(
  response => {
    if (response.status !== 200) {
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
      return Promise.reject(error)
    }
    console.error(JSON.stringify(error)) // console : Error: Reques'serviceSys't failed with status code 402
    // console.error(error)
    // malert.malert('网络访问出错')
    // alert(error)
    return Promise.reject(error)
  })
registerService.interceptors.response.use(
  response => {
    if (response.status !== 200) {
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
      return Promise.reject(error)
    }
    console.error(JSON.stringify(error)) // console : Error: Reques'serviceSys't failed with status code 402
    // console.error(error)
    // malert.malert('网络访问出错')
    // alert(error)
    return Promise.reject(error)
  })
merchantService.interceptors.response.use(
  response => {
    if (response.status !== 200) {
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
      return Promise.reject(error)
    }
    console.error(JSON.stringify(error)) // console : Error: Reques'serviceSys't failed with status code 402
    // console.error(error)
    // malert.malert('网络访问出错')
    // alert(error)
    return Promise.reject(error)
  })
merchantMsgService.interceptors.response.use(
  response => {
    if (response.status !== 200) {
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
      return Promise.reject(error)
    }
    console.error(JSON.stringify(error)) // console : Error: Reques'serviceSys't failed with status code 402
    // console.error(error)
    // malert.malert('网络访问出错')
    // alert(error)
    return Promise.reject(error)
  })
roleService.interceptors.response.use(
  response => {
    if (response.status !== 200) {
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
      return Promise.reject(error)
    }
    console.error(JSON.stringify(error)) // console : Error: Reques'serviceSys't failed with status code 402
    // console.error(error)
    // malert.malert('网络访问出错')
    // alert(error)
    return Promise.reject(error)
  })

export {
  loginService,
  smsService,
  registerService,
  merchantService,
  merchantMsgService,
  roleService
}
