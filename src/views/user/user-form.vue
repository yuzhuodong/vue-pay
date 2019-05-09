<template>
  <div>
    <el-dialog title="新建用户字典" :visible.sync="dialogFormValue" :close-on-click-modal="false" :before-close="cancel">
      <el-form :model="form" ref="userForm" :rules="rules">
        <el-form-item label="用户姓名" :label-width="formLabelWidth" class="form-item" prop="name" style="min-width: 300px">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth" class="form-item" prop="idNo" style="min-width: 300px">
          <el-input v-model="form.idNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" class="form-item" prop="mobileNum" style="min-width: 300px">
          <el-input v-model="form.mobileNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录名" :label-width="formLabelWidth" class="form-item"  style="min-width: 300px">
          <el-input v-model="form.mobileNum" auto-complete="off" :disabled="true"></el-input>
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
  import {user} from '@/api/getData'
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
          name: '',  //  用户姓名
          mobileNum: '', // 手机号码
          idNo: '',  // 身份证号
          type: '',   // 当前应用类别
          userName: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'}
          ],
          mobileNum: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          idNo: [
            {required: true, message: '请输入身份证号', trigger: 'blur'}
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
        this.$refs['userForm'].resetFields()
        this.form = {}
      },
      onSubmit: function () {
        const self = this
        if (self.type === 'add') {
          self.$refs['userForm'].validate(valid => {
            if (valid) {
              user.saveUser(self.form)
                .then(data => {
                  if (data.code === 'SUCCESS') {
                    this.$message({
                      type: 'success',
                      message: '保存成功!'
                    })
                    self.dialogFormValue = false
                    self.$emit('afterSubmit')
                    self.$refs['userForm'].resetFields()
                    self.form = {}
                  } else {
                    // self.$message.warn(data.failMsg)
                    self.$message.error(data.failMsg)
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
          self.$refs['userForm'].validate(valid => {
            if (valid) {
              self.form.userName = self.form.mobileNum
              user.editUser(self.form.id, self.form)
                .then(data => {
                  if (data.code) {
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    })
                    self.dialogFormValue = false
                    self.$emit('afterSubmit')
                    self.$refs['userForm'].resetFields()
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
  .address {
    display: inline-block;
    width: 21%;
  }
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
