<template>
  <div style="min-height: 920px;position: relative">
    <div class="header">
      <div style="margin-left: 10%;margin-top: 20px">
        <img src="../assets/img/title-logo.png" height="37" width="378"/>
      </div>
    </div>
    <div class="middle">
      <div class="main-content">
        <div class="left-img">
          <img src="../assets/img/img5.png" height="410" width="550"/>
        </div>
        <div class="right">
          <div class="nav_tabs_panel">
            <div id="nav-tabs" class="nav_tabs">
              <a class="navtab-link">账号登录</a>
            </div>
          </div>
          <div class="formArea">
            <div>
              <el-form class="loginForm" status-icon :rules="loginFormRules" ref="loginForm" :model="loginForm" label-width="0">
                <el-form-item prop="userName">
                  <el-input  @keyup.enter.native="userLogin" v-model="loginForm.userName" auto-complete="off" placeholder="请输入您的手机号码">
                    <i slot="prefix" class="icon-yonghu"></i>
                  </el-input>
                </el-form-item>
                <el-form-item  prop="password">
                  <el-input  @keyup.enter.native="userLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
                    <i slot="prefix" class="icon-mima"></i>
                    <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
                  </el-input>
                </el-form-item>
                <el-checkbox v-model="checked">记住账号</el-checkbox>
                <a class="registerLink" @click="dialogVisible = true">立即注册</a>
                <el-form-item>
                  <el-button type="primary"  @click.native.prevent="userLogin" class="login-submit" >登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="请选择您的身份" :visible.sync="dialogVisible" style="width: 1200px;margin: 0 auto;">
      <div class="innerDiv">
        <div class="personDiv" @click="personRegister">
          <div class="imgDiv">
            <img src="../assets/img/img1.png"/>
          </div>
          <div class="imgDiv">
            <p class="firstP">我是个人用户</p>
            <p class="secondP">需要提供手机号</p>
            <p class="secondP">身份证等有效信息</p>
          </div>
        </div>
        <div class="merchant" @click="merchantRegister">
          <div class="imgDiv">
            <img src="../assets/img/img2.png"/>
          </div>
          <div class="imgDiv">
            <p class="firstP">我是商户用户</p>
            <p class="secondP">需要额外提供</p>
            <p class="secondP">支付宝、微信等信息</p>
          </div>
        </div>
      </div>
    </el-dialog>
    <div class="footer">
      <div class="footerDiv">
        版权所有：江苏鑫亿软件股份有限公司   Copyright @ 江苏鑫亿软件股份有限公司 All rights reservednbsp
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/getData'
import { mapMutations } from 'vuex'
export default{
  data () {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      checked: false,
      passwordType: 'password',
      dialogVisible: false,
      loginForm: {
        userName: '',
        password: ''
      },
      loginFormRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur', validator: checkName }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur', validator: checkPass },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getCookie()
  },
  methods: {
    ...mapMutations(['saveUser', 'saveToken']),
    // 密码是否可见
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
     // 登录
    userLogin () {
      const self = this
      if (self.checked === true) {
        // 传入账号名，密码，和保存天数3个参数
        self.setCookie(self.loginForm.userName, self.loginForm.password, 7)
      } else {
        // 清空Cookie
      }
      self.$refs['loginForm'].validate((valid) => {
        if (valid) {
          let param = {}
          param.username = self.loginForm.userName
          param.password = self.loginForm.password
          param.grant_type = 'password'
          login.userLogin(param).then(data => {
            if (data.access_token !== undefined) {
              self.saveToken(data)
              this.$message({
                message: '登录成功',
                type: 'success',
                duration: 1500
              })
              setTimeout(() => {
                this.$router.push({path: '/home'})
              }, 1000)
            } else {
              self.$message.error(data.exception)
            }
          }).catch(e => {
            self.$message.error(e.response.data.exception)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 记住密码
    setCookie (c_name, c_pwd, exdays) {
      var exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = 'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'userPwd' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
    },
    // 读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'userName') {
            this.loginForm.userName = arr2[1] // 保存到保存数据的地方
          } else if (arr2[0] === 'userPwd') {
            this.loginForm.password = arr2[1]
          }
        }
      }
    },
    // 清除cookie
    clearCookie: function () {
      this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
    },
    personRegister () {
      this.$router.push({path: '/personRegister'})
    },
    merchantRegister () {
      this.$router.push({path: '/merchantRegister'})
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/  .el-dialog__header {
    padding: 20px 20px 10px;
    text-align: center;
    color: #4d7ab3;
    border-bottom: 2px solid #4d7ab3;
  }
  /deep/ .el-dialog__title{
    color: #4d7ab3;
    font-weight: bold;
    font-size: 20px;
  }
  .innerDiv{
    height: 220px;
    padding-bottom: 30px;
  }
  .personDiv{
    float: left;
    margin-left: 40px;
    background-color: rgb(250, 236, 236);
    width: 180px;
    height: 220px;
    box-shadow: darkgrey 5px 5px 20px 0px;
    border-radius: 10px;
    cursor: pointer;
  }
  .merchant{
    float: right;
    margin-right: 40px;
    background-color: #ebf1f9;
    width: 180px;
    height: 220px;
    box-shadow: darkgrey 5px 5px 20px 0px;
    border-radius: 10px;
    cursor: pointer;
  }
  .imgDiv{
    text-align: center;
    margin-top: 10px;
  }
  .firstP{
    font-size: 15px;
    color: #410909;
    font-weight: bold;
  }
  .secondP{
    font-size: 10px;
    color: #b68282;
    font-weight: bold;
  }
  .header{
    height: 80px;
    width: 100%;
    padding: 10px 0px;
  }
  .middle{
    width: 100%;
    min-width: 1500px;
    background-image: url('~@/assets/img/login-bj.png');;
    height: 600px;
    background-size: 100% 100%;
   // margin-top: 50px;
  }
  .main-content{
    width: 1500px;
    height: 600px;
    margin-right: auto;
    margin-left: auto;
  }
  .left-img{
    float: left;
    position: relative;
    display: inline-block;
    margin-top: 56px;
    margin-left: 20px;
  }
  .right{
    display: inline-block;
    width: 360px;
    height: 410px;
    background-color: white;
    border-radius: 10px;
    margin-top: 68px;
    float: right;
  }
  .nav_tabs_panel {
    display: block;
    width: 100%;
    height: 80px;
  }
  .nav_tabs {
    border-bottom: 2px solid #e0e0e0;
    padding: 18px 0;
    text-align: center;
    font-size: 24px;
  }
  .navtab-link{
    color: #f56600;
  }
  a{
    color: #666;
  }
  .formArea{
    width: 300px;
    margin: 0 auto;
  }
  .login-submit {
    margin-top: 20px;
    width: 100%;
    border-radius: 28px;
  }
  .loginForm {
    margin: 10px 0;
    .el-form-item__content {
      width: 270px;
    }
    .el-form-item {
      margin-bottom: 30px;
    }
    .el-input {
      input {
        text-indent: 5px;
        border-color: #dcdcdc;
        border-radius: 3px;
      }
      .el-input__prefix {
        left: 10px;
        i {
          padding: 0 10px;
          font-size: 20px !important;
        }
      }
    }
    .el-checkbox {
      margin-bottom: 25px;
    }
  }
  .registerLink {
   float: right;
    line-height: 19px;
    font-size: 14px;
    color: #2867bc;
    cursor: pointer;
    font-weight: bold
  }
  .footer{
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
  }
  .footerDiv{
    text-align: center;
    font-size: 15px;
    color: #909090
  }
  .icon-yonghu {
    background: url("~@/assets/img/userIcon.png") no-repeat center;
  }
  .icon-mima {
    background: url("~@/assets/img/passwordIcon.png") no-repeat center;
  }
</style>
