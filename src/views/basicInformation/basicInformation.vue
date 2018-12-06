<template>
  <div>
    <div class="tips">
      <span style="line-height:50px;font-size: 14px;margin-left: 10px">
       温馨提醒：
        <span style="color: #01AAED">用户名默认为手机号，不能修改</span>
      </span>
    </div>
    <el-form :model="form" ref="form" :rules="rules" label-width="80px" style="margin-top: 20px">
      <el-form-item label="用户名" prop="userName" style="min-width: 300px;width: 40%" >
        <el-input v-model="form.userName" auto-complete="off" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="手机号码"  prop="mobileNum" style="min-width: 300px;width: 40%">
        <el-input v-model="form.mobileNum" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名"  prop="name" style="min-width: 300px;width: 40%">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { user } from '@/api/getData'
  export default {
    data () {
      return {
        form: {
          userName: '',
          name: '',
          mobileNum: ''
        },
        rules: {
          mobileNum: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.form.userName = this.$store.getters.getToken.userName
      this.form.mobileNum = this.$store.getters.getToken.userName
      this.getUserInfoByUserName()
    },
    methods: {
      getUserInfoByUserName () {
        const self = this
        let param = {}
        param.userName = self.form.userName
        user.getUserInfoByUserName(param)
          .then(data => {
            if (data.code) {
              self.form.name = data.data.dataInfo.name
            } else {
              self.$message.error(data.message)
            }
          })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      },
      submitForm: function () {
        const self = this
        let param = {}
        param.userName = self.form.userName
        param.mobileNum = self.form.mobileNum
        param.name = self.form.name
        self.$refs['form'].validate(valid => {
          if (valid) {
            user.editUserByUserName(param)
              .then(data => {
                if (data.code) {
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
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
