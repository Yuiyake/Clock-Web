<!--<template>-->
<!--<div>-->
<!--&lt;!&ndash;  <p>用户信息修改页面</p>&ndash;&gt;-->
<!--  <h3>信息修改</h3>-->
<!--  <el-upload-->
<!--      class="avatar-uploader"-->
<!--      action="https://jsonplaceholder.typicode.com/posts/"-->
<!--      :show-file-list="false"-->
<!--      :on-success="handleAvatarSuccess"-->
<!--      :before-upload="beforeAvatarUpload">-->
<!--    <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--    <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--  </el-upload>-->
<!--  <p>点击上传头像</p>-->
<!--  <div>-->
<!--    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
<!--      <el-form-item label="用户名" prop="username">-->
<!--        <el-input v-model="ruleForm.username"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="账号" prop="account">-->
<!--        <el-input v-model="ruleForm.account"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="密码" prop="password">-->
<!--        <el-input v-model="ruleForm.password"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="性别" prop="sex">-->
<!--        <el-select v-model="ruleForm.sex" placeholder="请选择性别">-->
<!--          <el-option label="男" value="男"></el-option>-->
<!--          <el-option label="女" value="女"></el-option>-->
<!--          <el-option label="保密" value="保密"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--&lt;!&ndash;      <el-form-item label="创建时间" required>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-col :span="11">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item prop="createTime">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createTime" style="width: 100%;"></el-date-picker>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-form-item>&ndash;&gt;-->
<!--      <el-form-item label="备注" prop="desc">-->
<!--        <el-input type="textarea" v-model="ruleForm.desc"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>-->
<!--&lt;!&ndash;        <el-button @click="resetForm('ruleForm')">重置</el-button>&ndash;&gt;-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "userMsg",-->
<!--  data() {-->
<!--    return {-->
<!--      imageUrl: '',-->
<!--      ruleForm: {-->
<!--        username: '',-->
<!--        sex: '',-->
<!--        account: '',-->
<!--        password: '',-->
<!--        createTime: '',-->
<!--        delivery: false,-->
<!--        type: [],-->
<!--        resource: '',-->
<!--        desc: ''-->
<!--      },-->
<!--      rules: {-->
<!--        username: [-->
<!--          { required: true, message: '用户名不可为空', trigger: 'blur' },-->
<!--          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }-->
<!--        ],-->
<!--        account: [-->
<!--          { required: true, message: '账号不可为空', trigger: 'blur' },-->
<!--          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }-->
<!--        ],-->
<!--        password: [-->
<!--          { required: true, message: '密码不可为空', trigger: 'blur' },-->
<!--          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }-->
<!--        ],-->
<!--        sex: [-->
<!--          { required: true, message: '请选择性别', trigger: 'change' }-->
<!--        ],-->
<!--        createTime: [-->
<!--          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }-->
<!--        ],-->
<!--      }-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    submitForm(formName) {-->
<!--      this.$refs[formName].validate((valid) => {-->
<!--        if (valid) {-->
<!--          alert('submit!');-->
<!--        } else {-->
<!--          console.log('error submit!!');-->
<!--          return false;-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    handleAvatarSuccess(res, file) {-->
<!--      this.imageUrl = URL.createObjectURL(file.raw);-->
<!--    },-->
<!--    beforeAvatarUpload(file) {-->
<!--      const isJPG = file.type === 'image/jpeg';-->
<!--      const isLt2M = file.size / 1024 / 1024 < 2;-->

<!--      if (!isJPG) {-->
<!--        this.$message.error('上传头像图片只能是 JPG 格式!');-->
<!--      }-->
<!--      if (!isLt2M) {-->
<!--        this.$message.error('上传头像图片大小不能超过 2MB!');-->
<!--      }-->
<!--      return isJPG && isLt2M;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.el-upload{-->
<!--}-->
<!--.avatar-uploader-icon{-->
<!--  text-align: center;-->
<!--  border: 2px dashed #409EFF;-->
<!--}-->
<!--.avatar-uploader .el-upload {-->
<!--  border: 1px dashed #409EFF;-->
<!--  border-radius: 6px;-->
<!--  cursor: pointer;-->
<!--  position: relative;-->
<!--  overflow: hidden;-->
<!--}-->
<!--.avatar-uploader .el-upload:hover {-->
<!--  border-color: #409EFF;-->
<!--}-->
<!--.avatar-uploader-icon {-->
<!--  font-size: 28px;-->
<!--  color: #8c939d;-->
<!--  width: 178px;-->
<!--  height: 178px;-->
<!--  line-height: 178px;-->
<!--  text-align: center;-->
<!--}-->
<!--.avatar {-->
<!--  width: 178px;-->
<!--  height: 178px;-->
<!--  display: block;-->
<!--}-->
<!--</style>-->
<template>
  <div>
    <table style="border-collapse:collapse">
      <tr>
        <td>用户id</td>
        <td>{{admin.id}}</td>
      </tr>
      <tr>
        <td>用户名</td>
        <td>{{admin.username}}</td>
      </tr>
      <tr>
        <td>账号</td>
        <td>{{admin.account}}</td>
      </tr>
      <tr>
        <td>密码</td>
        <td>{{admin.password}}</td>
      </tr>
      <tr>
        <td></td>
        <td><el-button @click="toUpdate" type="text">修改密码 </el-button></td>
      </tr>
    </table>

    <el-dialog title="信息" width="30%" :visible.sync="addDialogFormVisible">
      <el-form :model="addform" :rules="rules" ref="addform" >
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input   show-password v-model="addform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="addDialogFormVisible = false">取消</el-button>
          <el-button @click="update('addform')" type="primary">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">-->
    <!--      <h3 align="center">修改密码</h3>-->
    <!--      <el-form-item label="旧密码" prop="oldpassword">-->
    <!--        <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="新密码" prop="password">-->
    <!--        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="确认密码" prop="checkPass">-->
    <!--        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item>-->
    <!--        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
    <!--        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->
  </div>
</template>

<script>

import {selectAllUser, updateUser} from "@/api/user";

export default {
  name: "userMsg",
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      admin: {},
      addform: {},
      addDialogFormVisible:false,
      formLabelWidth:'120px',
      rules: {
        oldpass: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('修改成功!');
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },

    // 获取信息
    getUserInfo() {
      this.admin = JSON.parse(localStorage.getItem('suser'))
    },
    toUpdate() {
      this.addform = JSON.parse(JSON.stringify(this.admin))
      this.addDialogFormVisible = true
    },
    // 修改密码
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUser (this.addform).then(res => {
            let code = res.data.code
            if(code == 200) {
              this.admin = JSON.parse(JSON.stringify(this.addform))
              localStorage.setItem('suser', JSON.stringify(this.admin));
              this.$message({ showClose: true, message: '编辑成功!', type: 'success'});
            }else {
              this.$message({ showClose: true, message: res.data.message, type: 'error'});
            }
          }).catch(() => {
            console.log("===异常===")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
/*.el-input {*/
/*  width: 40%;*/
/*}*/
.el-row {
  line-height: 45px;
  font-weight: 500;
}

tr {
  height: 50px;
}

table {
  font-size: 18px;
  color: #606266;
}

td:nth-child(2n+1){
  width:160px;

}
</style>
