import packageInfo from '../../package.json'
import { demo as _demo } from '@/env'

// Copyright @ 2005 - 2018 江苏鑫亿软件股份有限公司
var co = packageInfo.copyright
var year = new Date().getFullYear()
var copyright = `Copyright @ 2005 - ${year} ${co}`

export default {
  name: packageInfo.name,
  version: packageInfo.version,
  buildId: packageInfo.buildId,
  description: packageInfo.description,
  copyright: copyright,
  demo: _demo
}
