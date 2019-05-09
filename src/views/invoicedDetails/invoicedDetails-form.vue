<template>
  <div>
    <el-dialog title="修改发票信息" :visible.sync="dialogFormValue" :close-on-click-modal="false" :before-close="cancel" style="min-width: 1100px">
      <el-form :model="form" ref="invoicedDetailsForm" :rules="rules">
        <el-form-item label="发票号码" :label-width="formLabelWidth" class="form-item" prop="fphm" style="min-width: 500px;width: 80%">
          <el-input v-model="form.fphm" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="购方税号" :label-width="formLabelWidth" class="form-item" prop="gfsh" style="width: 80%;min-width: 500px">
          <el-input v-model="form.gfsh" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开票日期" :label-width="formLabelWidth" class="form-item" prop="kprq" style="min-width: 500px;width: 80%">
          <el-date-picker type="date" placeholder="开票日期" v-model="form.kprq" value-format="yyyy-MM-dd" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="作废标志" :label-width="formLabelWidth" class="form-item" prop="zfbz" style="width: 80%;min-width: 500px">
          <el-select v-model="form.zfbz" placeholder="请选择作废标志" style="width: 100%">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
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
  import { editInvoicedDetails } from '@/api/getData'
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
          fphm: '',
          gfsh: '',
          kprq: '',
          zfbz: ''
        },
        rules: {
          fphm: [
            { required: true, message: '请输入发票号码', trigger: 'blur' }
          ],
          gfsh: [
            { required: true, message: '请输入购方税号', trigger: 'blur' }
          ],
          kprq: [
            { required: true, message: '请输入开票日期', trigger: 'change' }
          ],
          zfbz: [
            { required: true, message: '请选择作废标志', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      open: function () {
        this.dialogFormValue = true
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
        this.$refs['invoicedDetailsForm'].resetFields()
        this.form = {}
      },
      onSubmit: function () {
        const self = this
        if (self.type === 'edit') {
          self.$refs['invoicedDetailsForm'].validate(valid => {
            if (valid) {
              editInvoicedDetails(self.form)
                .then(data => {
                  if (data.code) {
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    })
                    self.dialogFormValue = false
                    self.$emit('afterSubmit')
                    self.$refs['invoicedDetailsForm'].resetFields()
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
