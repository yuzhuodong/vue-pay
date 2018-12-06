import procenv from 'procenv'
import devenv from 'devenv'

let demo = procenv.demo
let baseUrl
let authUrl
let commUrl
if (process.env.NODE_ENV === 'production') {
  baseUrl = procenv.baseUrl
  commUrl = procenv.commUrl
  authUrl = procenv.authUrl
  demo = procenv.demo
} else {
  baseUrl = devenv.baseUrl
  commUrl = devenv.commUrl
  authUrl = devenv.authUrl
  demo = devenv.demo
}

export {
  baseUrl,
  commUrl,
  authUrl,
  demo
}
