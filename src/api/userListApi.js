import axios from '@/utils/myaxios'
import qs from 'qs'
import {commUrl} from '@/env'

// 新增用户
const saveUser = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.post(commUrl + '/users?' + qs.stringify(getparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 获取用户信息
const getUserInfo = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/users/userName/' + getparam.userName + '/password/' + getparam.password + '', {
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

// 按账号获取用户信息
const getUserInfoByUserName = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/users/username/' + getparam.userName + '', {
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

// 查询用户
const getUser = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/users', {
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

// 按用户名添加用户角色
const saveRoleByUserName = (postparam) => {
  return new Promise((resolve, reject) => {
    axios.post(commUrl + '/users/username/' + postparam.userName + '/role', qs.stringify(postparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 按用户名更新用户信息
const editUserByUserName = (editparam) => {
  return new Promise((resolve, reject) => {
    axios.put(commUrl + '/users/username/' + editparam.userName + '', qs.stringify(editparam))
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 按用户名获取用户角色
const getRolesByUserName = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/users/username/' + getparam.userName + '/roles', qs.stringify(getparam))
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 编辑用户状态
const editUserStatus = (editparam) => {
  return new Promise((resolve, reject) => {
    axios.put(commUrl + '/users/username/' + editparam.userName + '/status', qs.stringify(editparam))
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 编辑用户信息
const editUser = (id, editparam) => {
  return new Promise((resolve, reject) => {
    axios.put(commUrl + '/users/id/' + id, qs.stringify(editparam))
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 按用户名删除用户角色
const deleteRolesByUserName = (deleteparam) => {
  console.info(deleteparam.roleCode)
  return new Promise((resolve, reject) => {
    axios.delete(commUrl + '/users/username/' + deleteparam.userName + '/single-role/' + deleteparam.roleCode + '', {
      params: deleteparam
    })
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 按用户id删除用户角色
const deleteRolesByUserId = (deleteparam) => {
  return new Promise((resolve, reject) => {
    axios.delete(commUrl + '/users/userId/' + deleteparam.userId + '', {
      params: deleteparam
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
  saveUser,
  getUser,
  saveRoleByUserName,
  getRolesByUserName,
  editUserStatus,
  getUserInfo,
  deleteRolesByUserId,
  deleteRolesByUserName,
  editUser,
  editUserByUserName,
  getUserInfoByUserName
}

