<template>
  <el-container style="height: 100%;width: 100%;">
    <el-header style="height:auto">
      <el-row class="tap-row" style="width: 100%">
        <div style="display: inline-block;float: right">
          <el-input placeholder="请输入远程访问的IP或端口号" style="width: 300px;" v-model="query" @keyup.enter.native="search"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-button type="primary" icon="el-icon-plus" @click="create">新建数据</el-button>
        <whiteList-form ref="whiteListForm" @afterSubmit="getWhiteList"></whiteList-form>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="tableData" border v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(209, 209, 209, 0.6)" @selection-change="selsChange">
        <el-table-column prop="remoteIp" label="远程访问的IP" min-width="120" align="center">
        </el-table-column>
        <el-table-column  prop="remotePort" label="远程访问的端口" min-width="120" align="center">
        </el-table-column>
        <el-table-column  prop="remoteSysName" label="系统名称" min-width="120" align="center">
        </el-table-column>
        <el-table-column  prop="remoteSysCode" label="系统编码" min-width="120" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="deleteWhiteList(scope.row)">删除</el-button>
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
  import whiteListForm from './whiteList-form'
  import { getWhiteList, deleteWhiteList } from '@/api/getData'

  export default {
    mounted () {
      this.getWhiteList()
    },
    methods: {
      create: function () {
        this.$refs.whiteListForm.add()
        this.$refs.whiteListForm.open()
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      getWhiteList () {
        const self = this
        let param = {}
        param.pageSize = self.pageSize
        param.pageNum = self.pageNum
        param.query = self.query
        getWhiteList(param)
          .then(data => {
            if (data.code) {
              self.tableData = data.data.dataInfo
              self.totalCount = data.data.pageInfo.totalCount
              this.loading2 = false
              if (data.data.pageInfo.pageNum > data.data.pageInfo.totalPageNum) {
                self.pageNum = data.data.pageInfo.totalPageNum
                self.getWhiteList()
              }
            } else {
              self.$message.warn(data.message)
            }
          })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      deleteWhiteList: function (row) {
        var ids = row.id
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const param = {}
            param.ids = ids
            deleteWhiteList(param)
              .then(data => {
                if (data.code) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  this.getWhiteList()
                }
              })
              .catch(e => {
                self.$message.error('服务端出错')
                console.error(e)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      current_change: function (currentPage) {
        this.pageNum = currentPage
        this.getWhiteList()
      },
      selsChange (sels) {
        console.info(333, sels)
        this.sels = sels
      },
      search: function () {
        this.getWhiteList()
      }
    },
    components: {
      whiteListForm
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

