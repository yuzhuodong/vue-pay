<template>
  <el-container style="height: 100%;width: 100%">
    <el-header style="height:auto">
      <el-row class="tap-row" style="width: 100%">
        <user-Form ref="userForm" @afterSubmit="getUser"></user-Form>
      </el-row>
    </el-header>
    <el-main style="padding-left: 0">
      <el-table  ref="table" style="display: inline-block;width: 80%;vertical-align: top":data="tableData" border v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(209, 209, 209, 0.6)" @selection-change="selsChange" highlight-current-row @row-click="currentRow">
        <el-table-column  prop="userName" label="账号" align="center" min-width="150">
        </el-table-column>
        <el-table-column  prop="mobileNum" label="手机号" align="center" min-width="150">
        </el-table-column>
        <el-table-column  prop="disabled" label="状态" align="center" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.disabled">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column  prop="createTime" label="创建时间" align="center" min-width="150">
        </el-table-column>
        <el-table-column  prop="lastModifyTime" label="修改时间" align="center" min-width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="startUse(scope.row)" v-if="scope.row.disabled">启用</el-button>
            <el-button type="text" size="medium" @click="stopUse(scope.row)" v-else>禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: inline-block;width: 19%;">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin-top: 15px"></div>
        <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
          <el-checkbox  v-for="item in roleList" :label="item.itemCode" :key="item.itemCode" style="margin-left: 20px;display: block;margin-bottom: 10px">{{item.itemName}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-main>
    <el-row class="pagination">
      <el-pagination background layout="prev, pager, next" :total=totalCount :page-size=pageSize @current-change="current_change">
      </el-pagination>
    </el-row>

  </el-container>
</template>
<script>
  import userForm from './user-form'
  import { user, role } from '@/api/getData'
  export default {
    mounted () {
      this.getUser()
      this.getRoleList()
    },
    methods: {
      // 查询所有用户
      getUser () {
        const self = this
        let param = {}
        param.pageNum = self.pageNum
        param.pageSize = self.pageSize
        user.getUser(param)
          .then(data => {
            if (data.code) {
              self.tableData = data.data.dataInfo
              self.totalCount = data.data.pageInfo.totalCount
              self.loading2 = false
              if (self.tableData.length > 0) {
                self.user = self.tableData[0]
                self.allotMenu(self.user)
              } else {
                self.getRoleList()
              }
              self.loading2 = false
              self.$refs.table.setCurrentRow(self.tableData[0])
            } else {
              self.$message.error(data.message)
            }
          })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      // 分页查询用户
      current_change: function (currentPage) {
        this.pageNum = currentPage
        this.getUser()
      },
      // 查询所有角色
      getRoleList () {
        const self = this
        let param = {}
        param.pageNum = self.pageNum
        param.pageSize = self.pageSize
        role.getRoleList(param)
          .then(data => {
            if (data.code) {
              self.roleList = data.data.dataInfo
            } else {
              self.$message.error(data.message)
            }
          })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      // 根据登录名查询用户角色
      getRolesByUserName: function (userName) {
        const self = this
        let param = {}
        param.userName = userName
        user.getRolesByUserName(param).then(data => {
          if (data.code === 'SUCCESS') {
            self.checkedRoles = data.data.dataInfo
          } else {
            self.$message.error(data.failMsg)
          }
        })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      // 获取当前行用户的角色信息
      currentRow: function (row) {
        this.user = row
        this.allotMenu(row)
      },
      // 获取当前行用户的角色信息
      allotMenu (row) {
        this.user = row
        this.checkedRoles = []
        this.dialogVisible = true
        this.getRolesByUserName(row.userName)
        this.$nextTick(() => {
        })
      },
      // 新建用户
      create: function () {
        this.$refs.userForm.add(this.type)
        this.$refs.userForm.open()
      },
      // 编辑用户
      edit: function (row) {
        row = this.deepClone(row)
        this.$refs.userForm.edit(row)
        this.$refs.userForm.open()
      },
      // 打开对话框
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      // 关闭对话框
      handleClose (key, keyPath) {
        this.dialogVisible = false
        console.log(key, keyPath)
      },
      // 选项改变时的事件
      selsChange (sels) {
        this.sels = sels
      },
      // 按条件查询用户
      search: function () {
        this.getUser()
      },
      // 编辑用户状态
      editUserStatus: function (param) {
        const self = this
        user.editUserStatus(param).then(data => {
          if (data.code === 'SUCCESS') {
            self.getUser()
          } else {
            self.$message.error(data.failMsg)
          }
        })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      // 启用用户
      startUse (row) {
        let param = {}
        param.userName = row.userName
        param.disabled = false
        this.editUserStatus(param)
      },
      // 禁用用户
      stopUse (row) {
        let param = {}
        param.userName = row.userName
        param.disabled = true
        this.editUserStatus(param)
      },
      // 全选角色
      handleCheckAllChange (val) {
        const self = this
        let roleAll = []
        for (var index in self.roleList) {
          roleAll.push(self.roleList[index].itemCode)
        }
        self.checkedRoles = val ? roleAll : []
        self.isIndeterminate = false
        let param1 = {}
        param1.userId = self.user.id
        user.deleteRolesByUserId(param1)
        let result = ''
        let param2 = {}
        for (var key in self.checkedRoles) {
          result = self.checkedRoles[key] + ',' + result
        }
        result = result.substring(0, result.length - 1)
        param2.userName = self.user.userName
        param2.roleCodes = result
        user.saveRoleByUserName(param2).then(data => {
          if (data.code === 'SUCCESS') {
            self.dialogVisible = false
            self.$message({
              message: '角色分配成功',
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
      // 添加和删除用户的角色
      handleCheckedCitiesChange (value) {
        const self = this
        let checkedCount = value.length
        self.checkAll = checkedCount === self.roleList.length
        self.isIndeterminate = checkedCount > 0 && checkedCount < self.roleList.length
        let param1 = {}
        param1.userId = self.user.id
        user.deleteRolesByUserId(param1)
        let result = ''
        let param2 = {}
        for (var index in self.checkedRoles) {
          result = self.checkedRoles[index] + ',' + result
        }
        result = result.substring(0, result.length - 1)
        param2.userName = self.user.userName
        param2.roleCodes = result
        user.saveRoleByUserName(param2).then(data => {
          if (data.code === 'SUCCESS') {
            this.dialogVisible = false
            this.$message({
              message: '角色分配成功',
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
      // 深拷贝行信息
      deepClone (obj) {
        obj = JSON.parse(JSON.stringify(obj))
        return obj
      }
    },
    components: {
      userForm
    },
    data () {
      return {
        checkAll: false,
        checkedRoles: [],
        isIndeterminate: true,
        dialogVisible: false,
        query: '',
        pageSize: 5,
        pageNum: 1,
        tableData: [],
        totalCount: 0,
        loading2: 'true',
        roleList: [],
        user: [] // 当前用户,
      }
    }
  }
</script>
<style type="text/css" scoped>
  .pagination {
    float: right;
    margin-top: 50px;
  }


</style>

