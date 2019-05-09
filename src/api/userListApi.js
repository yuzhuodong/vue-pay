import axios from '@/utils/myaxios'
import {registerService, merchantService, merchantMsgService, roleService} from '@/utils/loginaxios'
import qs from 'qs'

// 新增用户
const saveUser = (postparam) => {
  return new Promise((resolve, reject) => {
    registerService.post('/users?' + qs.stringify(postparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}
// 保存商户信息
const saveMerchantMsg = (postparam) => {
  return new Promise((resolve, reject) => {
    merchantService.post('/merchant?' + qs.stringify(postparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}
// 根据用户名查询商户信息
const getMerchantMsg = (getparam) => {
  return new Promise((resolve, reject) => {
    merchantMsgService.get('/merchant/userName?' + qs.stringify(getparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 按用户名获取用户信息
const getUserInfo = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get('/users/userName/' + getparam.userName + '/password/' + getparam.password + '', {
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
    axios.get('/users/username/' + getparam.userName + '', {
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
    axios.get('/users', {
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
    axios.post('/users/username/' + postparam.userName + '/role', qs.stringify(postparam))
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
    axios.put('/users/username/' + editparam.userName + '', qs.stringify(editparam))
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
    axios.get('/users/username/' + getparam.userName + '/roles', qs.stringify(getparam))
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
    axios.put('/users/username/' + editparam.userName + '/status', qs.stringify(editparam))
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
    axios.put('/users/id/' + id, qs.stringify(editparam))
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
  return new Promise((resolve, reject) => {
    axios.delete('/users/username/' + deleteparam.userName + '/single-role/' + deleteparam.roleCode + '', {
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
    axios.delete('/users/userId/' + deleteparam.userId + '', {
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
// 按用户名给用户分配一个角色
const addRolesByUserName = (postparam) => {
  return new Promise((resolve, reject) => {
    roleService.post('/users/username/' + postparam.userName + '/single-role/' + postparam.roleCode + '', {
      params: postparam
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
  getUserInfoByUserName,
  saveMerchantMsg,
  getMerchantMsg,
  addRolesByUserName
}

