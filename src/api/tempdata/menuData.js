const menus = [
  {
    itemCode: '01',
    itemName: '',
    icon: 'el-icon-menu',
    title: '查询明细',
    path: '01',
    subs: [{
      itemCode: '0101',
      itemName: '',
      icon: '',
      title: '交易明细',
      path: 'transactionDetail'
    },
    {
      itemCode: '0102',
      itemName: '',
      icon: '',
      title: '退款明细',
      path: 'refundDetail'
    },
    {
      itemCode: '0103',
      itemName: '',
      icon: '',
      title: '账单下载',
      path: 'billDownload'
    },
    {
      itemCode: '0104',
      itemName: '',
      icon: '',
      title: '发票明细',
      path: 'invoiceDetails'
    },
    {
      itemCode: '0104',
      itemName: '',
      icon: '',
      title: '已开发票明',
      path: 'invoicedDetails'
    },
    {
      itemCode: '0106',
      itemName: '',
      icon: '',
      title: '发票报表',
      path: 'invoiceReport'
    }]
  },
  {
    itemCode: '02',
    itemName: '',
    icon: 'el-icon-menu',
    title: '系统设置',
    path: '02',
    subs: [{
      itemCode: '0201',
      itemName: '',
      icon: '',
      title: '白名单',
      path: 'whiteList'
    },
    {
      itemCode: '0202',
      itemName: '',
      icon: '',
      title: '参数设置',
      path: 'parameterSettings'
    },
    {
      itemCode: '0203',
      itemName: '',
      icon: '',
      title: '角色设置',
      path: 'role'
    },
    {
      itemCode: '0204',
      itemName: '',
      icon: '',
      title: '用户设置',
      path: 'user'
    }]
  },
  {
    itemCode: '03',
    itemName: '',
    icon: 'el-icon-menu',
    title: '个人中心',
    path: '03',
    subs: [{
      itemCode: '0301',
      itemName: '',
      icon: '',
      title: '基本信息',
      path: 'basicInformation'
    },
    {
      itemCode: '0302',
      itemName: '',
      icon: '',
      title: '商户信息',
      path: 'merchant'
    }]
  }
]
const defaultMenu = [
  {
    itemCode: '0301',
    itemName: '',
    icon: '',
    path: 'basicInformation',
    title: '基本信息'
  }]
export {
  menus, defaultMenu
}

