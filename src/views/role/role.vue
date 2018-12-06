<template>
  <div class="container" style="height: 100%">
    <div class="header" style="margin-bottom: 20px">
      <el-button type="primary" icon="el-icon-plus" @click="create">新建数据</el-button>
      <role-Form ref="roleForm" @afterSubmit="getRoleList"></role-Form>
    </div>
    <div style="height: 85%">
      <el-table style="display: inline-block;width: 80%;vertical-align: top" :data="tableData" ref="table" border
                v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(209, 209, 209, 0.6)" @selection-change="selsChange"
                highlight-current-row @row-click="currentRow">
        <el-table-column fixed="left" prop="itemName" label="角色名称" align="center">
        </el-table-column>
        <el-table-column prop="comments" label="描述" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="400" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="medium" @click="deleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: inline-block;width: 19%">
        <el-tree
          :data="menu"
          show-checkbox
          default-expand-all
          node-key="menuCode"
          ref="tree"
          highlight-current
          emptyText=""
          @check="checkChange"
          :props="defaultProps">
        </el-tree>
      </div>
    </div>
    <div>
      <el-row class="pagination">
        <el-pagination background layout="prev, pager, next" :total=totalCount :page-size=pageSize
                       @current-change="current_change">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {role, menu} from '@/api/getData'
  import roleForm from './role-form'
  export default {
    mounted () {
      this.getRoleList()
    },
    methods: {
      // 查询所有角色
      getRoleList () {
        const self = this
        let param = {}
        param.pageNum = self.pageNum
        param.pageSize = self.pageSize
        role.getRoleList(param)
          .then(data => {
            if (data.code) {
              self.tableData = data.data.dataInfo
              self.totalCount = data.data.pageInfo.totalCount
              if (self.tableData.length > 0) {
                self.role = self.tableData[0]
                self.allotMenu(self.role)
              } else {
                self.getMenuTrees()
              }
              self.loading2 = false
              self.$refs.table.setCurrentRow(self.tableData[0])
            } else {
              self.$message.error(data.failMsg)
            }
          })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      // 查询菜单树
      getMenuTrees: function () {
        const self = this
        let param = {}
        param.moduleCode = 'module_00'
        param.clientCode = 'client_01'
        menu.getMenuTrees(param).then(data => {
          if (data.code === 'SUCCESS') {
            self.menu = data.data.dataInfo.children
          } else {
            self.$message.error(data.failMsg)
          }
        }).catch(e => {
          self.$message.error('服务端出错')
          console.error(e)
        })
      },
      show: function (e) {
        this.type = e
        this.getRoleList()
        this.getMenuTrees()
      },
      create: function () {
        this.$refs.roleForm.add(this.type)
        this.$refs.roleForm.open()
      },
      edit: function (row) {
        row = this.deepClone(row)
        this.$refs.roleForm.edit(row)
        this.$refs.roleForm.open()
      },
      deleteRole: function (row) {
        const self = this
        self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            role.deleteRole(row.id)
              .then(data => {
                if (data.code === 'SUCCESS') {
                  self.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  self.getRoleList()
                } else {
                  self.$message.error(data.failMsg)
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
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        this.dialogVisible = false
        console.log(key, keyPath)
      },
      allotMenu (row) {
        this.role = row
        this.getMenuTrees()
        this.$nextTick(() => {
          this.getMenuTreesByRoleCode()
        })
      },
      setCheckedKeys () {
        const self = this
        self.$refs.tree.setCheckedKeys(self.data1)
      },
      current_change: function (currentPage) {
        this.pageNum = currentPage
        this.getRoleList()
      },
      selsChange (sels) {
        this.sels = sels
      },
      search: function () {
        this.getRoleList()
      },
      getMenuTreesByRoleCode: function () {
        const self = this
        let param = {}
        param.roleCode = self.role.itemCode
        menu.getMenuTreesByRoleCode(param).then(data => {
          if (data.code === 'SUCCESS') {
            self.data1 = data.data.dataInfo
            this.setCheckedKeys()
          } else {
            self.$message.error(data.failMsg)
          }
        })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      deleteMenuTreesByRoleCode: function (roleCode) {
        const self = this
        let param = {}
        param.roleCode = roleCode
        menu.deleteMenuTreesByRoleCode(param).then(data => {
          if (data.code) {
          } else {
            self.$message.error(data.failMsg)
          }
        })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      checkChange: function (data, value) {
        const self = this
        let param = {}
        let menu = ''
        // let keys = value.checkedKeys.concat(value.halfCheckedKeys)
        let keys = value.checkedKeys
        for (var index in keys) {
          menu = keys[index] + ',' + menu
        }
        menu = menu.substring(0, menu.length - 1)
        param.roleCode = self.role.itemCode
        param.menuCode = menu
        self.deleteMenuTreesByRoleCode(self.role.itemCode)
        role.saveRoleMenu(param).then(data => {
          if (data.code === 'SUCCESS') {
            self.dialogVisible = false
            this.$message({
              message: '菜单分配成功',
              type: 'success',
              duration: 1500
            })
          } else {
            self.$message.error(data.failMsg)
          }
        })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      currentRow: function (row) {
        this.user = row
        this.allotMenu(row)
      },
      deepClone (obj) {
        obj = JSON.parse(JSON.stringify(obj))
        return obj
      }
    },
    components: {
      roleForm
    },
    data () {
      return {
        dialogVisible: false,
        menu: [],
        data1: [],
        query: '',
        role: [], // 当前role
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'nodeText'
        },
        loading2: 'true',
        pageNum: 1,
        pageSize: 5,
        totalCount: 0,
        type: 'operation'  // 当前应用类型
      }
    }
  }
</script>
<style type="text/css">
  .pagination {
    float: right;
  }
  .el-tabs-content >>> .a {
    height: 100%
  }
</style>
