<template>
  <el-container style="height: 100%;width: 100%;">
    <el-header style="height:auto">
    </el-header>
    <parameterSettings-form ref="parameterSettingsForm" @afterSubmit="getParameter"></parameterSettings-form>
    <el-main>
      <el-table :data="tableData" border v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(209, 209, 209, 0.6)" @selection-change="selsChange">
        <el-table-column prop="code" label="参数代码" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="value" label="参数值" min-width="400" align="center">
        </el-table-column>
        <el-table-column  prop="note" label="参数描述" min-width="200" align="center">
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
</template>
<script>
  import parameterSettingsForm from './parameterSettings-form'
  import { getParameter } from '@/api/getData'

  export default {
    mounted () {
      this.getParameter()
    },
    methods: {
      edit: function (row) {
        row = this.deepClone(row)
        this.$refs.parameterSettingsForm.edit(row)
        this.$refs.parameterSettingsForm.open()
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      getParameter () {
        const self = this
        let param = {}
        param.pageSize = self.pageSize
        param.pageNum = self.pageNum
        getParameter(param)
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
        this.getParameter()
      },
      selsChange (sels) {
        console.info(333, sels)
        this.sels = sels
      },
      search: function () {
        this.getParameter()
      },
      deepClone (obj) {
        obj = JSON.parse(JSON.stringify(obj))
        return obj
      }
    },
    components: {
      parameterSettingsForm
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
</style>

