import axios from '@/utils/myaxios'
import qs from 'qs'

// 获取角色表
const getRoleList = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get('/roles?' + qs.stringify(getparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 新增角色菜单
const saveRoleMenu = (postparam) => {
  return new Promise((resolve, reject) => {
    axios.post('/role-menu-rels/roleCode-menuCode', qs.stringify(postparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 编辑角色
const editRole = (roleId, editparam) => {
  return new Promise((resolve, reject) => {
    axios.put('/roles/' + roleId, qs.stringify(editparam))
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 新增角色
const saveRole = (postparam) => {
  return new Promise((resolve, reject) => {
    axios.post('/roles', qs.stringify(postparam))
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 删除角色
const deleteRole = (roleId) => {
  return new Promise((resolve, reject) => {
    axios.delete('/roles/' + roleId)
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export {
  getRoleList,
  saveRoleMenu,
  editRole,
  saveRole,
  deleteRole
}
