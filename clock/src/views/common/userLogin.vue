<template>
  <div class="user_login_div">
    <div class="login_div1">
      <el-form  :model="searchData"  :rules="searchDatarules" ref="searchData" >
        <div class="title-container">
          <h3 class="title"> 星星打卡 - 后台登录 </h3>
        </div>
        <div class="center_div">
          <el-form-item    prop="account">
            <el-input v-model="searchData.account" placeholder="学号"  clearable />
          </el-form-item>
          <el-form-item    prop="password">
            <el-input v-model="searchData.password" placeholder="密码"  clearable show-password />
          </el-form-item>
          <!--                <el-form-item  label="验证码"  prop="verificationCode">-->
          <!--                    <el-input v-model="searchData.verificationCode" placeholder="验证码"  clearable />-->
          <!--                </el-form-item>-->
          <!--                 <el-form-item  label="验证码">-->
          <!--                    <div @click="refreshCode" >-->
          <!--                        <Check :identifyCode = "identifyCode"></Check>-->
          <!--                    </div>-->
          <!--                </el-form-item>-->
          <el-form-item >
            <!-- <el-button  @click="register" >注册</el-button> -->
            <el-button @click="login('searchData')" type="primary" >登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import Check from '../common/Check'
import {userLogin} from '@/api/user'
export default {
  // components:{Check},
  mounted () {
    // 初始化验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
    console.log(this.identifyCode)
  },
  data() {
    return {
      searchData: {
        account: '',
        password: '',
      },
      searchDatarules: {
        account: [{ required: true, trigger: 'blur', message: '请输入学生号'}],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
      },

      identifyCodes:'1234567890qwertyuioplkjhgfdsazxcvbnm',
      identifyCode:'',
    }
  },
  methods: {
    // 刷新验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes,4);
      console.log(this.identifyCode)
    },
    makeCode (o,l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    register(){
      this.$router.push({path:`/userRegister`})
    },
    empty() {
      this.searchData.account = ''
      this.searchData.password = ''
    },
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userLogin (this.searchData).then(res => {
            if(res.data.code == 200){
              this.$message({ showClose: true, message: '登陆成功!', type: 'success'});
            } else {
              this.$message({ showClose: true, message: '该用户不存在或者密码错误！', type: 'error'});
              this.empty()
            }
            // 存储本地信息，key为suser
              localStorage.setItem('suser', JSON.stringify(res.data.data));
              if(res.data.data.role == '0') {
                this.$router.push({path:`/adminMain`})
              }else{
                this.$router.push({path:`/userMain`})
              }
          }).catch(() => {
            console.log("===异常===")
          })
        } else {
          return false;
        }
        // if (valid) {
        //   userLogin(this.searchData).then(function (res){
        //     this.$message({message:'success!'});
        //     this.$router.push({path:'/adminMain'})
        //   })
        // }
      });
      // this.$router.push({path:`/adminMain`})
    }
  }
}
</script>
<style scoped>

body {
  margin: 0;
}

.title-container {
  position: relative;
}

.title {
  font-size: 26px;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}

.el-input {
  width: 220px;
  height: 50px;
}

/*背景半透明*/
.user_login_div {
  width: 100%;
  height: 100%;
  margin:0px;
  background: url(login.jpg) no-repeat;
  background-size: cover;
  background-attachment:fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_div1 {
  position: relative;
  padding: 90px 35px 0;
  overflow: hidden;
  text-align: center;
}

</style>
