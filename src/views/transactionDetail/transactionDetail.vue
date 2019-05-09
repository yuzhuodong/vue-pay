<template>
  <el-container style="height: 100%;width: 100%;">
    <el-header style="height:auto">
      <el-row class="tap-row" style="width: 100%">
        <div style="display: inline-block;float: right">
          <el-input placeholder="请输入商户订单号或订单标题" style="width: 300px;" v-model="query" @keyup.enter.native="search"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="tableData" border v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(209, 209, 209, 0.6)" @selection-change="selsChange">
        <el-table-column prop="outTradeNo" label="商户订单号" min-width="220" align="center">
        </el-table-column>
        <el-table-column  prop="totalAmount" label="订单总金额" min-width="120" align="center" sortable>
        </el-table-column>
        <el-table-column  prop="subject" label="订单标题" min-width="420" align="center">
        </el-table-column>
        <el-table-column  prop="timestamp" label="订单生成时间" min-width="180" align="center">
        </el-table-column>
        <el-table-column  prop="gmtPayment" label="付款时间" min-width="180" align="center">
        </el-table-column>
      </el-table>
    </el-main>
    <el-row class="pagination">
      <el-pagination background layout="prev, pager, next" :total=totalCount :page-size=pageSize @current-change="current_change">
      </el-pagination>
    </el-row>
  </el-container>
</template>
<script>
  import { getTransactionDetail } from '@/api/getData'
  export default {
    mounted () {
      this.getTransactionDetail()
    },
    methods: {
      getTransactionDetail () {
        const self = this
        let param = {}
        param.pageSize = self.pageSize
        param.pageNum = self.pageNum
        param.query = self.query
        getTransactionDetail(param)
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
        this.getTransactionDetail()
      },
      selsChange (sels) {
        this.sels = sels
      },
      search: function () {
        this.getTransactionDetail()
      }
    },
    data () {
      return {
        centerDialogVisible: false,
        tableData: [],
        sels: [],
        dialogFormVisible: false,
        formLabelWidth: '100px',
        pageSize: 10,
        pageNum: 1,
        totalCount: 0,
        query: '',
        loading2: 'true'
      }
    }
  }
</script>
<style type="text/css" scoped>
  .pagination {
    float: right;
    margin-top: 50px;
  }
  .form-item {
    display: inline-block;
    float: left;
  }
  .el-main{
    padding-left: 0;
  }
</style>

