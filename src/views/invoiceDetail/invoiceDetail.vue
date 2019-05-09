<template>
  <div>
    <el-container style="height: 100%;width: 100%;">
      <div class="tips">
        <span style="line-height:50px;font-size: 14px;margin-left: 10px">
         温馨提醒：
          1. <span style="color: #01AAED">列【发票状态】分为两种状态：待开票，已开票。</span>
          2. <span style="color: #01AAED"> <a href="http://192.168.1.46:7500/sys/file/invoice_template.xls" style="color: red;text-decoration: underline">下载Excel模板</a> ①支持格式为：xls（97-2003），②第一行表头不可删除和更改。</span>
        </span>
      </div>
      <invoiceDetail-form ref="invoiceDetailForm" @afterSubmit="getInvoiceDetail"></invoiceDetail-form>
      <el-header style="height:auto;padding: 20px 0;min-width: 1024px">
        <el-row class="tap-row" style="width: 100%">
          <div style="display: inline-block;float: left">
            <el-button type="primary" icon="el-icon-download" @click="toExcel">导出待开发票信息</el-button>
            <el-button type="primary" icon="el-icon-download" @click="toAllExcel">一键导出所有待开发票信息</el-button>
            <el-upload
              class="upload-demo"
              :action="a"
              :on-success="success"
              list-type="picture"
              id="the">
              <el-button type="primary" icon="el-icon-upload">导入已开发票信息</el-button>
            </el-upload>
          </div>
          <div style="display: inline-block;float: right">
            <el-input placeholder="请输入购方名称" style="width: 300px;" v-model="query" @keyup.enter.native="search"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-row>
      </el-header>
      <el-main style="padding: 0">
        <el-table :data="tableData" border v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(209, 209, 209, 0.6)" @selection-change="selsChange" id="tableweb">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="outTradeNo" label="商户订单号" min-width="230" align="center">
          </el-table-column>
          <el-table-column  prop="gfmc" label="购方名称" min-width="220" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="gfsh" label="购方税号" min-width="200" align="center" sortable :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="spmc" label="货物或应税劳务、服务名称" min-width="200" align="center">
          </el-table-column>
          <el-table-column  prop="spbm" label="商品编码" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="sl" label="数量" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="dj" label="单价" min-width="150" align="center" sortable>
          </el-table-column>
          <el-table-column  prop="je" label="金额" min-width="100" align="center" sortable>
          </el-table-column>
          <el-table-column  prop="slv" label="税率" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="jshj" label="价税合计" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="isDraw" label="发票状态" min-width="120" align="center" sortable>
            <template slot-scope="scope">
              <el-button type="danger" v-if="scope.row.isDraw === '0'" size="mini">未开票</el-button>
              <el-button type="success" v-if="scope.row.isDraw === '1'" size="mini">已开票</el-button>
            </template>
          </el-table-column>
          <el-table-column  prop="gfdzdh" label="地址、电话" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="gfyhzh" label="开户行及账号" min-width="120" align="center">
          </el-table-column>
          <el-table-column  prop="ggxh" label="规格型号" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="jldw" label="单位" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="email" label="收票人邮箱" min-width="200" align="center">
          </el-table-column>
          <el-table-column  prop="address" label="收票人地址" min-width="120" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="phone" label="收票人电话" min-width="120" align="center">
          </el-table-column>
          <el-table-column  prop="name" label="收票人姓名" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="remoteSysName" label="来源系统" min-width="200" align="center">
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="create(scope.row.outTradeNo)" v-if="scope.row.isDraw === '0'">维护</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-row class="pagination">
        <el-pagination background layout="prev, pager, next" :total=totalCount :page-size=pageSize @current-change="current_change">
        </el-pagination>
      </el-row>
    </el-container>
  </div>
</template>

<script>
  import invoiceDetailForm from './invoiceDetail-form'
  import {baseUrl} from '@/env'
  import { getInvoiceDetail, getUnDrawInvoiceDetail } from '@/api/getData'
  export default {
    mounted () {
      this.getInvoiceDetail()
      this.getAllInvoiceDetail()
      this.getTime()
      /* this.b = baseUrl + '/invoice/importExcel?access_token=' */
    },
    methods: {
      // 维护发票信息
      create: function (outTradeNo) {
        this.$refs.invoiceDetailForm.add(outTradeNo)
        this.$refs.invoiceDetailForm.open()
      },
      // 查询所有发票信息
      getInvoiceDetail () {
        /* this.c = this.$store.getters.getToken.access_token */
        /* this.a = this.b.concat(this.c) */
        this.a = baseUrl + '/invoice/importExcel?access_token=' + this.$store.getters.getToken.access_token + ''
        const self = this
        let param = {}
        param.pageSize = self.pageSize
        param.pageNum = self.pageNum
        param.gfmc = self.query
        getInvoiceDetail(param)
          .then(data => {
            if (data.code) {
              self.tableData = data.data.dataInfo
              self.totalCount = data.data.pageInfo.totalCount
              this.loading2 = false
            } else {
              self.$message.warn(data.message)
            }
          })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      // 查询已开发票信息
      getAllInvoiceDetail () {
        const self = this
        getUnDrawInvoiceDetail()
          .then(data => {
            if (data.code) {
              self.allData = data.data.dataInfo
              this.loading2 = false
            } else {
              self.$message.warn(data.message)
            }
          })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      // 导出勾选的发票信息
      toExcel () {
        const th = ['商户订单号', '购方名称', '购方税号', '货物或应税劳务、服务名称',
          '商品编码', '数量', '单价', '金额', '税率', '价税合计', '发票状态', '地址、电话', '开户行及账号',
          '规格型号', '单位', '收票人邮箱', '收票人地址', '收票人电话', '收票人姓名', '来源系统'
        ]
        const filterVal = ['outTradeNo', 'gfmc', 'gfsh', 'spmc',
          'spbm', 'sl', 'dj', 'je', 'slv', 'jshj', 'isDraw', 'gfdzdh',
          'gfyhzh', 'ggxh', 'jldw', 'email',
          'address', 'phone', 'name', 'remoteSysName'
        ]
        const data = this.sels.map(v => filterVal.map(k => v[k]))
        if (data.length === 0) {
          this.$message({
            message: '请选择待开发票',
            type: 'warning'
          })
        } else {
          const [fileName, fileType, sheetName] = ['发票信息-' + this.time + '', 'xlsx', '发票信息']
          this.$toExcel({th, data, fileName, fileType, sheetName})
        }
      },
      // 导出所有待开发票信息
      toAllExcel () {
        const th = ['商户订单号', '购方名称', '购方税号', '货物或应税劳务、服务名称',
          '商品编码', '数量', '单价', '金额', '税率', '价税合计', '发票状态', '地址、电话', '开户行及账号',
          '规格型号', '单位', '收票人邮箱', '收票人地址', '收票人电话', '收票人姓名', '来源系统'
        ]
        const filterVal = ['outTradeNo', 'gfmc', 'gfsh', 'spmc',
          'spbm', 'sl', 'dj', 'je', 'slv', 'jshj', 'isDraw', 'gfdzdh',
          'gfyhzh', 'ggxh', 'jldw', 'email',
          'address', 'phone', 'name', 'remoteSysName'
        ]
        const data = this.allData.map(v => filterVal.map(k => v[k]))
        const [fileName, fileType, sheetName] = ['发票信息-' + this.time + '', 'xlsx', '发票信息']
        this.$toExcel({th, data, fileName, fileType, sheetName})
      },
      // 分页显示
      current_change: function (currentPage) {
        this.pageNum = currentPage
        this.getInvoiceDetail()
      },
      // 监听勾选行
      selsChange (sels) {
        this.sels = sels
      },
      // 按条件查询发票信息
      search: function () {
        this.getInvoiceDetail()
      },
      // 把默认日期转换成指定的格式
      getTime () {
        let date = new Date()
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        this.time = y + '-' + m + '-' + d
      },
      // 导入成功后的事件
      success (response, file, fileList) {
        if (response.code === 'success') {
          this.$message({
            message: '导入成功',
            type: 'success'
          })
        } else {
          this.$message.error(response.exception)
        }
        this.getInvoiceDetail()
      },
      change () {

      }
    },
    components: {
      invoiceDetailForm
    },
    data () {
      return {
        centerDialogVisible: false,
        tableData: [],
        time: '',
        a: '',
       /* b: '','http://192.168.1.46:7500/sys/invoice/importExcel?access_token=',
        c: '', */
        sels: [],
        allData: [],
        billData: {},
        dialogFormVisible: false,
        formLabelWidth: '100px',
        pageSize: 5,
        pageNum: 1,
        totalCount: 1,
        query: '',
        loading2: 'true'
      }
    }
  }
</script>

<style scoped>
  .pagination {
    float: right;
    margin-top: 50px;
  }
  .form-item {
    display: inline-block;
    float: left;
  }
  .tips{
    width: 100%;
    height: 50px;
    background-color: rgb(242, 242, 242);
    border-left: 5px solid #30B08F;
    min-width: 1200px;
  }
  .upload-demo{
    display: inline-block;
  }
  #the >>> ul{
    display: none;
  }
</style>
