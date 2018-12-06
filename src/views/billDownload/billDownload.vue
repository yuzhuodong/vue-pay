<template>
  <div>
    <div class="tips">
      <span style="line-height:50px;font-size: 14px;margin-left: 10px">
       温馨提醒：
        1. <span style="color: #01AAED">不可查询当月，当天账单</span>
        2. <span style="color: #01AAED">两个账单日期只可填其一</span>
        3. <span style="color: #01AAED">账单仅分为如下两种类型</span>
      </span>
    </div>
    <el-form :model="billForm" ref="billForm" label-width="100px" style="margin-top: 20px">
      <el-form-item label="账单日期" required>
        <el-form-item prop="month" style="display: inline-block;width: 250px">
          <el-date-picker type="month" placeholder="月账单" v-model="billForm.month" value-format="yyyy-MM" @change="clearDate"></el-date-picker>
        </el-form-item>
        <span>或</span>
        <el-form-item prop="date" style="display: inline-block;width: 250px;margin-left: 40px">
          <el-date-picker type="date" placeholder="日账单" v-model="billForm.date" value-format="yyyy-MM-dd" @change="clearMonth"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="账单类型" prop="billType">
        <el-select v-model="billType" placeholder="请选择账单类型" style="width: 540px">
          <el-option label="商户基于支付宝交易收单的业务账单" value="trade"></el-option>
          <el-option label="基于商户支付宝余额收入及支出等资金变动的帐务账单" value="signcustomer"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('billForm')">立即下载</el-button>
        <el-button @click="resetForm('billForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {commUrl} from '@/env'
  export default {
    data () {
      return {
        time: '',
        billType: 'trade',
        billForm: {
          month: '',
          date: ''
        }
      }
    },
    mounted () {
    },
    methods: {
      clearDate: function () {
        this.billForm.date = ''
        this.time = this.billForm.month
      },
      clearMonth: function () {
        this.billForm.month = ''
        this.time = this.billForm.date
      },
      submitForm (formName) {
        const billForm = this.billForm
        const type = this.billType
        const time = this.time
        // 判断日期是否为空
        if (billForm.month !== null && billForm.month !== '' || billForm.date !== '' && billForm.date !== null) {
          this.clearDate()
          this.clearMonth()
          window.location.href = commUrl + '/alipay/download_bill?billType=' + type + '&billDate=' + time + ''
        } else {
          this.$message.error('请选择账单日期')
          return false
        }
      },
      resetForm (formName) {
        this.$refs['billForm'].resetFields()
      }
    }
  }
</script>
<style type="text/css">
  .tips{
    width: 100%;
    height: 50px;
    background-color: rgb(242, 242, 242);
    border-left: 5px solid #30B08F;
    min-width: 1000px;
  }
</style>
