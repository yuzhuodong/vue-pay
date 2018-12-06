<template>
  <div>
    <el-dialog title="编辑参数" :visible.sync="dialogFormValue" :close-on-click-modal="false" :before-close="cancel" style="min-width: 1100px">
      <el-form :model="form" ref="parameterSettingsForm" :rules="rules">
        <el-form-item label="参数代码" :label-width="formLabelWidth" class="form-item" prop="code" style="min-width: 500px;width: 80%">
          <el-input v-model="form.code" auto-complete="off" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="参数值" :label-width="formLabelWidth" class="form-item" prop="value" style="width: 80%;min-width: 500px">
          <el-input v-model="form.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数描述" :label-width="formLabelWidth" class="form-item" prop="note" style="min-width: 500px;width: 80%">
          <el-input v-model="form.note" auto-complete="off" disabled="disabled"></el-input>
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
    editParameter
  } from '@/api/getData'
  export default {
    computed: {
    },
    data () {
      return {
        type: '',
        pageSize: 5,
        pageNum: 1,
        dialogFormValue: false,
        formLabelWidth: '180px',
        form: {
          code: '',
          value: '',
          note: ''
        },
        rules: {
          value: [
            { required: true, message: '请输入参数值', trigger: 'blur' }
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
      edit: function (row) {
        this.type = 'edit'
        this.form = row
      },
      show: function (row) {
        this.type = 'show'
      },
      cancel: function () {
        this.dialogFormValue = false
        this.$refs['parameterSettingsForm'].resetFields()
        this.form = {}
      },
      onSubmit: function () {
        const self = this
        if (self.type === 'edit') {
          self.$refs['parameterSettingsForm'].validate(valid => {
            if (valid) {
              editParameter(self.form)
                .then(data => {
                  if (data.code) {
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    })
                    self.dialogFormValue = false
                    self.$emit('afterSubmit')
                    self.$refs['parameterSettingsForm'].resetFields()
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
