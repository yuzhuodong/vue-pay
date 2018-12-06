<template>
  <div style="height: 100%;position: relative;overflow:scroll;">
    <div class="header">
      <img src="../assets/img/title-logo.png" height="37" width="378"/>
    </div>
    <div class="middle">
      <div class="main-content">
        <div class="left-img">
          <img src="../assets/img/loginImg.png" height="410" width="630"/>
        </div>
        <div class="right">
          <div class="nav_tabs_panel">
            <div id="nav-tabs" class="nav_tabs">
              <a class="navtab-link" v-bind:class="{'active': login}" href="javascript:void(0);" @click="showLoginForm">登录</a>
              <span class="line"></span>
              <a class="navtab-link" v-bind:class="{'active': register}" href="javascript:void(0);" @click="showRegisterForm">注册</a>
            </div>
          </div>
          <div class="formArea">
            <div v-show="login">
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
                <el-form-item>
                  <el-button type="primary"  @click.native.prevent="userLogin" class="login-submit" >登录</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="register">
              <el-form class="registerForm" status-icon :rules="registerFormRules" ref="registerForm" :model="registerForm" label-width="0">
                <el-form-item prop="mobileNum">
                  <el-input type="text" v-model="registerForm.mobileNum" placeholder="请输入您的手机号码">
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input type="text" v-model="registerForm.code" placeholder="请输入短信验证码">
                    <template slot="append">
                      <span v-show="show" @click="refreshCode">获取验证码</span>
                      <span v-show="!show" class="auth_text">
                  <span style="color: #2d8cf0;">{{count}} </span> 秒后重新发送</span>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input :type="passwordType" v-model="registerForm.password" placeholder="请设置您的登录密码" class="password">
                    <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                  <el-input :type="passwordType" v-model="registerForm.confirmPassword" placeholder="再次确认登录密码" class="confirmPassword">
                    <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"  class="login-submit" @click="registerUser">注册</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { user, getSms, login } from '@/api/getData'
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
    const validateMobileNum = (rule, value, callback) => {
      const reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length !== 4) {
        callback(new Error('请输入4位数的验证码'))
      } else {
        callback()
      }
    }
    return {
      login: true,
      register: false,
      checked: false,
      code: '',
      count: '',
      show: true,
      passwordType: 'password',
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
      },
      registerForm: {
        mobileNum: '',
        code: '',
        password: '',
        confirmPassword: ''
      },
      registerFormRules: {
        mobileNum: [
          {
            required: true,
            validator: validateMobileNum,
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, validator: checkPass, trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [
          { required: true, validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getCookie()
  },
  methods: {
    ...mapMutations(['saveUser', 'saveToken']),
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    showLoginForm: function () {
      const self = this
      self.login = true
      self.register = false
    },
    showRegisterForm: function () {
      const self = this
      self.login = false
      self.register = true
    },
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
              console.info(44444, data.access_token)
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
    refreshCode () {
      const self = this
      var tel = self.registerForm.mobileNum
      var reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
      if (!reg.test(tel)) {
        this.$message.error('请输入正确的手机号码')
        return false
      } else {
        self.getAuthCode()
        let param = {}
        param.recNum = tel
        getSms(param).then(data => {
          if (data.code) {
          } else {
            self.$message.error(data.mes)
          }
        }).catch(e => {
          self.$message.error('服务端出错')
          console.error(e)
        })
      }
    },
    getAuthCode: function () {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    registerUser: function () {
      const self = this
      if (self.registerForm.password !== self.registerForm.confirmPassword) {
        self.$message.error('两次密码不同')
        return false
      } else {
        self.$refs['registerForm'].validate(valid => {
          if (valid) {
            let param = {}
            param.mobileNum = self.registerForm.mobileNum
            param.password = self.registerForm.password
            param.code = self.registerForm.code
            user.saveUser(param)
              .then(data => {
                if (data.code === 'SUCCESS') {
                  this.$message({
                    type: 'success',
                    message: '注册成功!'
                  })
                  self.login = true
                  self.register = false
                } else {
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
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .header{
    margin-top: 50px;
    margin-left: 5%;
  }
  .middle{
    width: 100%;
    min-width: 1200px;
    background-image: url('~@/assets/img/login-bj.png');;
    height: 600px;
    background-size: 100% 100%;
    margin-top: 50px;
  }
  .main-content{
    width: 1200px;
    height: 600px;
    margin-top: 20px;
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
    width: 380px;
    height: 430px;
    background-color: white;
    border-radius: 10px;
    margin-top: 68px;
    margin-left: 170px;
  }
  .nav_tabs_panel {
    display: block;
    width: 100%;
    height: 80px;
  }
  .nav_tabs {
    padding: 24px 0;
    text-align: center;
    font-size: 24px;
    color: #e0e0e0;
  }
  .line{
    width: 1px;
    height: 24px;
    margin: 0 35px 0 42px;
    border: 1px solid #e0e0e0;
  }
  a{
    color: #666;
  }
  .nav_tabs a.active {
    color: #f56600;
  }
  .formArea{
    width: 340px;
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
  .icon-yonghu {
    background: url("~@/assets/img/userIcon.png") no-repeat center;
  }
  .icon-mima {
    background: url("~@/assets/img/passwordIcon.png") no-repeat center;
  }
</style>
