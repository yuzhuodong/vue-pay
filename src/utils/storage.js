import { AES, enc } from 'crypto-js'

const lw = 'one'

/**
 * 存储 localStorage(sessionStorage), 采用 store 替代该方案
 */
export const setLStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  } else {
  }
  // console.log('local store: x')
  // localStorage.setItem(name, content)
  sessionStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getLStore = name => {
  if (!name) return
  // let content = localStorage.getItem(name)
  let content = sessionStorage.getItem(name)
  if (content) {
    let bytes = content.toString()
    return bytes.toString(enc.Utf8)
  } else {
    return content
  }
}

/**
 * 存储 localStorage(sessionStorage), 采用 store 替代该方案
 */
export const setLStore1 = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = AES.encrypt(JSON.stringify(content), lw)
  } else {
    content = AES.encrypt(content, lw)
  }
  // console.log('local store: x')
  // localStorage.setItem(name, content)
  sessionStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getLStore1 = name => {
  if (!name) return
  // let content = localStorage.getItem(name)
  let content = sessionStorage.getItem(name)
  if (content) {
    let bytes = AES.decrypt(content.toString(), lw)
    return bytes.toString(enc.Utf8)
  } else {
    return content
  }
}
/**
 * 删除localStorage
 */
export const removeLStore = name => {
  if (!name) return
  // localStorage.removeItem(name)
  sessionStorage.removeItem(name)
}
