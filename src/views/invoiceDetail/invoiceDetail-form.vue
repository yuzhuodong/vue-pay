<template>
  <div>
    <el-dialog title="维护" :visible.sync="dialogFormValue" :close-on-click-modal="false" :before-close="cancel" style="min-width: 1100px">
      <el-form :model="form" ref="invoiceDetailForm" :rules="rules">
        <el-form-item label="商户订单号" :label-width="formLabelWidth" class="form-item" prop="outTradeNo" style="min-width: 500px;width: 45%;display: none">
          <el-input v-model="form.outTradeNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发票种类" :label-width="formLabelWidth" class="form-item" prop="fpzl" style="min-width: 400px;width: 45%">
          <el-input v-model="form.fpzl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发票号码" :label-width="formLabelWidth" class="form-item" prop="fphm" style="min-width: 400px;width: 45%">
          <el-input v-model="form.fphm" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开票日期" :label-width="formLabelWidth" class="form-item" prop="kprq" style="min-width: 400px;width: 45%">
          <el-date-picker type="date" v-model="form.kprq" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="主要商品名称" :label-width="formLabelWidth" class="form-item" prop="spmc" style="min-width: 400px;width: 45%">
          <el-input v-model="form.spmc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作废标志" :label-width="formLabelWidth" class="form-item" prop="zfbz" style="min-width: 400px;width: 45%">
          <el-select v-model="form.zfbz" placeholder="请选择作废标志" style="width: 100%">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="清单标志" :label-width="formLabelWidth" class="form-item" prop="qdbz" style="min-width: 400px;width: 45%">
          <el-select v-model="form.qdbz" placeholder="请选择清单标志" style="width: 100%">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销方名称" :label-width="formLabelWidth" class="form-item" prop="xfmc" style="min-width: 400px;width: 45%">
          <el-input v-model="form.xfmc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="销方税号" :label-width="formLabelWidth" class="form-item" prop="xfsh" style="min-width: 400px;width: 45%">
          <el-input v-model="form.xfsh" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="销方地址电话" :label-width="formLabelWidth" class="form-item" prop="xfdzdh" style="min-width: 500px;width: 90%">
          <el-input v-model="form.xfdzdh" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="销方银行账户" :label-width="formLabelWidth" class="form-item" prop="xfyhzh" style="min-width: 500px;width: 90%">
          <el-input v-model="form.xfyhzh" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="报送状态" :label-width="formLabelWidth" class="form-item" prop="bszt" style="min-width: 400px;width: 45%">
          <el-input v-model="form.bszt" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开票人" :label-width="formLabelWidth" class="form-item" prop="kpr" style="min-width: 400px;width: 45%">
          <el-input v-model="form.kpr" auto-complete="off"></el-input>
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
  import { saveInvoicedDetails } from '@/api/getData'
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
          outTradeNo: '',
          fpzl: '电子增值税普通发票',
          fphm: '',
          kprq: '',
          spmc: '技术服务',
          zfbz: '否',
          qdbz: '否',
          xfmc: '江苏鑫亿软件股份有限公司',
          xfsh: '913204006638071041',
          xfdzdh: '常州市新北区太湖东路9-2号16楼东 0519-88158852',
          xfyhzh: '华夏银行常州新北支行13151000000365850',
          bszt: '已报送',
          kpr: ''
        },
        rules: {
          fpzl: [
            { required: true, message: '请输入发票种类', trigger: 'blur' }
          ],
          fphm: [
            { required: true, message: '请输入发票号码', trigger: 'blur' }
          ],
          kprq: [
            { required: true, message: '请输入开票日期', trigger: 'change' }
          ],
          spmc: [
            { required: true, message: '请输入主要商品名称', trigger: 'blur' }
          ],
          zfbz: [
            { required: true, message: '请选择作废标志', trigger: 'change' }
          ],
          qdbz: [
            { required: true, message: '请选择清单标志', trigger: 'change' }
          ],
          xfmc: [
            { required: true, message: '请输入销方名称', trigger: 'blur' }
          ],
          xfsh: [
            { required: true, message: '请输入销方税号', trigger: 'blur' }
          ],
          xfdzdh: [
            { required: true, message: '请输入销方地址电话', trigger: 'blur' }
          ],
          xfyhzh: [
            { required: true, message: '请输入销方银行账号', trigger: 'blur' }
          ],
          bszt: [
            { required: true, message: '请输入报送状态', trigger: 'blur' }
          ],
          kpr: [
            { required: true, message: '请输入开票人', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      open: function () {
        this.dialogFormValue = true
      },
      add: function (outTradeNo) {
        this.type = 'add'
        this.form.outTradeNo = outTradeNo
      },
      cancel: function () {
        this.dialogFormValue = false
        this.$refs['invoiceDetailForm'].resetFields()
      },
      onSubmit: function () {
        const self = this
        if (self.type === 'add') {
          self.$refs['invoiceDetailForm'].validate(valid => {
            if (valid) {
              saveInvoicedDetails(self.form)
                .then(data => {
                  if (data.code) {
                    this.$message({
                      type: 'success',
                      message: '开票成功!'
                    })
                    self.dialogFormValue = false
                    self.$emit('afterSubmit')
                    self.$refs['invoiceDetailForm'].resetFields()
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
