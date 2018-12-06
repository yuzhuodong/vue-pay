<template>
  <div>
    <el-dialog title="新增白名单" :visible.sync="dialogFormValue" :close-on-click-modal="false" :before-close="cancel" style="min-width: 1100px">
      <el-form :model="form" ref="whiteListForm" :rules="rules">
        <el-form-item label="IP" :label-width="formLabelWidth" class="form-item" prop="remoteIp" style="min-width: 500px;width: 80%">
          <el-input v-model="form.remoteIp" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="端口" :label-width="formLabelWidth" class="form-item" prop="remotePort" style="width: 80%;min-width: 500px">
          <el-input v-model="form.remotePort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="系统名称" :label-width="formLabelWidth" class="form-item" prop="remoteSysName" style="min-width: 500px;width: 80%">
          <el-input v-model="form.remoteSysName" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="系统编码" :label-width="formLabelWidth" class="form-item" prop="remoteSysCode" style="min-width: 500px;width: 80%">
          <el-input v-model="form.remoteSysCode" auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    saveWhiteList
  } from '@/api/getData'
  export default {
    data () {
      return {
        type: '',
        pageSize: 5,
        pageNum: 1,
        dialogFormValue: false,
        formLabelWidth: '180px',
        form: {
          remoteIp: '',
          remotePort: '',
          remoteSysName: '',
          remoteSysCode: ''
        },
        rules: {
          remoteIp: [
            { required: true, message: '请输入 IP', trigger: 'blur' }
          ],
          remotePort: [
            { required: true, message: '请输入端口号', trigger: 'blur' }
          ],
          remoteSysName: [
            { required: true, message: '系统名称', trigger: 'blur' }
          ],
          remoteSysCode: [
            { required: true, message: '系统编码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      open: function () {
        this.dialogFormValue = true
      },
      add: function () {
        this.type = 'add'
      },
      show: function (row) {
        this.type = 'show'
      },
      cancel: function () {
        this.dialogFormValue = false
        this.$refs['whiteListForm'].resetFields()
        this.form = {}
      },
      onSubmit: function () {
        const self = this
        if (self.type === 'add') {
          self.$refs['whiteListForm'].validate(valid => {
            if (valid) {
              saveWhiteList(self.form)
                .then(data => {
                  if (data.code) {
                    this.$message({
                      type: 'success',
                      message: '保存成功!'
                    })
                    self.$emit('afterSubmit')
                    self.dialogFormValue = false
                    self.$refs['whiteListForm'].resetFields()
                    self.form = {}
                  } else {
                    self.$message.warn(data.message)
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
  }
</style>
