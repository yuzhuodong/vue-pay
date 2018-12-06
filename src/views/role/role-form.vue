<template>
  <div>
    <el-dialog title="新建角色字典" :visible.sync="dialogFormValue" :close-on-click-modal="false" :before-close="cancel">
      <el-form :model="form" ref="roleForm" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" class="form-item" prop="itemName" style="min-width: 300px">
          <el-input v-model="form.itemName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="comments" style="min-width: 300px;max-width: 400px;">
          <el-input v-model="form.comments" auto-complete="off" type="textarea" rows="5"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {role} from '@/api/getData'
  export default {
    mounted () {
    },
    computed: {
    },
    data () {
      return {
        type: '',
        dialogFormValue: false,
        formLabelWidth: '140px',
        form: {
          itemName: '',  //  角色名
          comments: '' // 描述
        },
        rules: {
          itemName: [
            {required: true, message: '请输入角色名称'}
          ]
        }
      }
    },
    methods: {
      open: function () {
        this.dialogFormValue = true
      },
      add: function (e) {
        this.type = 'add'
        this.form.type = e
      },
      edit: function (row) {
        this.type = 'edit'
        this.form = row
      },
      show: function (row) {
        this.type = 'show'
        this.form = row
      },
      cancel: function () {
        this.dialogFormValue = false
        this.$refs['roleForm'].resetFields()
        this.form = {}
      },
      onSubmit: function () {
        const self = this
        if (self.type === 'add') {
          self.$refs['roleForm'].validate(valid => {
            if (valid) {
              role.saveRole(self.form)
                .then(data => {
                  if (data.code === 'SUCCESS') {
                    this.$message({
                      type: 'success',
                      message: '保存成功!'
                    })
                    self.dialogFormValue = false
                    self.$emit('afterSubmit')
                    self.$refs['roleForm'].resetFields()
                    self.form = {}
                  } else {
                    self.$message.error(data.message)
                  }
                })
                .catch(e => {
                  self.$message.error('服务端出错')
                  console.error(e)
                })
            } else {
              return false
            }
          })
        }
        if (self.type === 'edit') {
          self.$refs['roleForm'].validate(valid => {
            if (valid) {
              role.editRole(self.form.id, self.form)
                .then(data => {
                  if (data.code) {
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    })
                    self.dialogFormValue = false
                    self.$emit('afterSubmit')
                    self.$refs['roleForm'].resetFields()
                    self.form = {}
                  } else {
                    self.$message.error(data.message)
                  }
                })
                .catch(e => {
                  self.$message.error('服务端出错')
                  console.error(e)
                })
            } else {
              return false
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .form-item {
    display: inline-block;
    width: 30%;
  }
  .form-provinceNodeCode {
    display: inline-block;
    min-width: 200px;
    width: 34%;
  }
  .el-dialog__title {
    line-height: 24px;
    font-size: 80px;
    color: #303133;
  }
</style>
