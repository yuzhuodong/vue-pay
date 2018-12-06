import axios from '@/utils/myaxios'
import qs from 'qs'
import {commUrl} from '@/env'

// 获取菜单树
const getMenuTrees = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/menutrees/tree?' + qs.stringify(getparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 根据角色获取菜单
const getMenuTreesByRoleCode = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/role-menu-rels/menu-of/' + getparam.roleCode, qs.stringify(getparam))
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 根据角色删除菜单
const deleteMenuTreesByRoleCode = (deleteparam) => {
  return new Promise((resolve, reject) => {
    axios.delete(commUrl + '/role-menu-rels/roleCode/' + deleteparam.roleCode, qs.stringify(deleteparam))
      .then(respose => {
        resolve(respose)
      })
      .catch(e => {
        reject(e)
      })
  })
}

const getMenuTreesByType = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/menutrees/treeByType?' + qs.stringify(getparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}
// 根据用户名查询菜单
const getMenuByUserName = (getparam) => {
  return new Promise((resolve, reject) => {
    axios.get(commUrl + '/menutrees/getMenuByUserName?' + qs.stringify(getparam))
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export {
  getMenuTrees,
  getMenuTreesByRoleCode,
  deleteMenuTreesByRoleCode,
  getMenuTreesByType,
  getMenuByUserName
}

