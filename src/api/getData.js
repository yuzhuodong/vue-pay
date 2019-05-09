import appInfo from '@/utils/appInfo'
// import { login } from './login'
import { token } from './tempdata/token'
import { Message } from 'element-ui'
import * as loginApi from './login'
import * as utilListApi from './utilListApi'
import * as userListApi from './userListApi'
import * as roleListApi from './roleListApi'
import * as menuListApi from './menuListApi'
import * as parameterSettingsListApi from './parameterSettingsListApi'
import * as whiteListApi from './whiteListApi'
import * as transactionDetailLitApi from './transactionDetailListApi'
import * as refundDetailListApi from './refundDetailListApi'
import * as invoiceDetailListApi from './invoiceDetailListApi'
import * as invoicedDetailsListApi from './invoicedDetailsListApi'
// 模仿 axios
const setPromise = data => {
  return new Promise((resolve, reject) => {
    console.log('use demo...')
    console.log(data)
    if (!data.success) {
      Message.error({message: data.msg || '访问出错'})
      return reject(data)
    }
    resolve(data)
  })
}
let sysDatas = {
  success: true,
  code: 0,
  message: 'ok'
}

var getSysDatas = () => setPromise(sysDatas)
var processLogin = () => setPromise(token)

var login = {
  userLogin: (param) => setPromise()
}

var user = {
  saveUser: (param) => setPromise(),
  saveMerchantMsg: (param) => setPromise(),
  getMerchantMsg: (param) => setPromise(),
  getUser: (param) => setPromise(),
  getUserInfoByUserName: (param) => setPromise(),
  saveRoleByUserName: (param) => setPromise(),
  getRolesByUserName: (param) => setPromise(),
  editUserStatus: (param) => setPromise(),
  editUserByUserName: (param) => setPromise(),
  getUserInfo: (param) => setPromise(),
  deleteRolesByUserId: (param) => setPromise(),
  deleteRolesByUserName: (param) => setPromise(),
  editUser: (parm) => setPromise(),
  addRolesByUserName: (parm) => setPromise()
}

var role = {
  getRoleList: (param) => setPromise(),
  saveRoleMenu: (param) => setPromise(),
  editRole: (param) => setPromise(),
  saveRole: (param) => setPromise(),
  deleteRole: (param) => setPromise()
}

var menu = {
  getMenuTrees: (param) => setPromise(),
  getMenuTreesByRoleCode: (param) => setPromise(),
  deleteMenuTreesByRoleCode: (param) => setPromise(),
  getMenuTreesByType: (param) => setPromise(),
  getMenuByUserName: (param) => setPromise()
}

var getParameter = (getparam) => parameterSettingsListApi.getParameter(getparam)
var editParameter = (editparam) => parameterSettingsListApi.editParameter(editparam)
var getParameterById = (getparam) => parameterSettingsListApi.getParameterById(getparam)
var getParameterByCode = (getparam) => parameterSettingsListApi.getParameterByCode(getparam)

var getWhiteList = (getparam) => whiteListApi.getWhiteList(getparam)
var saveWhiteList = (postparam) => whiteListApi.saveWhiteList(postparam)
var deleteWhiteList = (deleteparam) => whiteListApi.deleteWhiteList(deleteparam)

var getTransactionDetail = (getparam) => transactionDetailLitApi.getTransactionDetail(getparam)

var getRefundDetail = (getparam) => refundDetailListApi.getRefundDetail(getparam)

var getInvoiceDetail = (getparam) => invoiceDetailListApi.getInvoiceDetail(getparam)
var getUnDrawInvoiceDetail = (getparam) => invoiceDetailListApi.getUnDrawInvoiceDetail(getparam)

var getInvoicedDetails = (getparam) => invoicedDetailsListApi.getInvoicedDetails(getparam)
var editInvoicedDetails = (editparam) => invoicedDetailsListApi.editInvoicedDetails(editparam)
var saveInvoicedDetails = (postparam) => invoicedDetailsListApi.saveInvoicedDetails(postparam)

// var getUserInfo = (getparam) => login.getUserInfo(getparam)

var getSms = (getparam) => utilListApi.getSms(getparam)

// 非演示环境替换为真实请求
if (appInfo.demo) {
  // processLogin = login
  login.userLogin = loginApi.userLogin
  user.saveUser = userListApi.saveUser
  user.saveMerchantMsg = userListApi.saveMerchantMsg
  user.getMerchantMsg = userListApi.getMerchantMsg
  user.getUser = userListApi.getUser
  user.getUserInfoByUserName = userListApi.getUserInfoByUserName
  user.editUserStatus = userListApi.editUserStatus
  user.editUserByUserName = userListApi.editUserByUserName
  user.getRolesByUserName = userListApi.getRolesByUserName
  user.saveRoleByUserName = userListApi.saveRoleByUserName
  user.getUserInfo = userListApi.getUserInfo
  user.deleteRolesByUserId = userListApi.deleteRolesByUserId
  user.deleteRolesByUserName = userListApi.deleteRolesByUserName
  user.editUser = userListApi.editUser
  user.addRolesByUserName = userListApi.addRolesByUserName
  role.editRole = roleListApi.editRole
  role.getRoleList = roleListApi.getRoleList
  role.saveRoleMenu = roleListApi.saveRoleMenu
  role.saveRole = roleListApi.saveRole
  role.deleteRole = roleListApi.deleteRole
  menu.deleteMenuTreesByRoleCode = menuListApi.deleteMenuTreesByRoleCode
  menu.getMenuTrees = menuListApi.getMenuTrees
  menu.getMenuTreesByRoleCode = menuListApi.getMenuTreesByRoleCode
  menu.getMenuTreesByType = menuListApi.getMenuTreesByType
  menu.getMenuByUserName = menuListApi.getMenuByUserName
}
export {
  processLogin,
  getSysDatas,
  user,
  role,
  menu,
  getSms,
  login,
  getParameter,
  editParameter,
  getParameterById,
  getParameterByCode,
  getWhiteList,
  saveWhiteList,
  deleteWhiteList,
  getTransactionDetail,
  getRefundDetail,
  getInvoiceDetail,
  getUnDrawInvoiceDetail,
  getInvoicedDetails,
  editInvoicedDetails,
  saveInvoicedDetails
}
