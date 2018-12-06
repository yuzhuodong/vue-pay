<template>
  <div>
    <el-container style="height: 100%;width: 100%;">
      <invoicedDetails-form ref="invoicedDetailsForm" @afterSubmit="getInvoicedDetails"></invoicedDetails-form>
      <el-header style="height:auto;padding: 20px 0">
        <el-row class="tap-row" style="width: 100%">
          <div style="display: inline-block;float: right">
            <el-input placeholder="请输入购方名称" style="width: 300px;" v-model="query" @keyup.enter.native="search"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData" border v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(209, 209, 209, 0.6)" @selection-change="selsChange">
          <el-table-column prop="fpzl" label="发票种类" min-width="150" align="center">
          </el-table-column>
          <el-table-column  prop="fpdm" label="发票代码" min-width="120" align="center" >
          </el-table-column>
          <el-table-column  prop="fphm" label="发票号码" min-width="130" align="center" >
          </el-table-column>
          <el-table-column  prop="gfmc" label="购方名称" min-width="200" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="gfsh" label="购方税号" min-width="200" align="center">
          </el-table-column>
          <el-table-column  prop="kprq" label="开票日期" min-width="120" align="center" sortable>
          </el-table-column>
          <el-table-column  prop="je" label="金额" min-width="120" align="center" sortable>
          </el-table-column>
          <el-table-column  prop="slv" label="税率" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="kce" label="合计税额" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="jshj" label="价税合计" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="spmc" label="主要商品名称" min-width="120" align="center">
          </el-table-column>
          <el-table-column  prop="bz" label="备注" min-width="120" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="zfbz" label="作废标志" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="qdbz" label="清单标志" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="xfmc" label="销方名称" min-width="120" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="xfsh" label="销方税号" min-width="180" align="center">
          </el-table-column>
          <el-table-column  prop="xfdzdh" label="销方地址电话" min-width="120" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="xfyhzh" label="销方银行账号" min-width="120" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="bszt" label="报送状态" min-width="100" align="center">
          </el-table-column>
          <el-table-column  prop="kpr" label="开票人" min-width="100" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="edit(scope.row)">编辑</el-button>
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
  import invoicedDetailsForm from './invoicedDetails-form'
  import { getInvoicedDetails } from '@/api/getData'
  export default {
    mounted () {
      this.getInvoicedDetails()
    },
    methods: {
      edit: function (row) {
        row = this.deepClone(row)
        this.$refs.invoicedDetailsForm.edit(row)
        this.$refs.invoicedDetailsForm.open()
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      getInvoicedDetails () {
        const self = this
        let param = {}
        param.pageSize = self.pageSize
        param.pageNum = self.pageNum
        param.gfmc = self.query
        getInvoicedDetails(param)
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
      current_change: function (currentPage) {
        this.pageNum = currentPage
        this.getInvoicedDetails()
      },
      selsChange (sels) {
        console.info(333, sels)
        this.sels = sels
      },
      search: function () {
        this.getInvoicedDetails()
      },
      deepClone (obj) {
        obj = JSON.parse(JSON.stringify(obj))
        return obj
      }
    },
    components: {
      invoicedDetailsForm
    },
    data () {
      return {
        centerDialogVisible: false,
        tableData: [],
        sels: [],
        dialogFormVisible: false,
        formLabelWidth: '100px',
        pageSize: 5,
        pageNum: 1,
        totalCount: 0,
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
  .el-main{
    padding: 0;
  }
</style>
