<template>
  <div>
    <h3>新增用户</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="权限" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择权限">
          <el-option label="管理员" value="0" ></el-option>
<!--          <el-option label="组长" value="2" ></el-option>-->
          <el-option label="普通用户" value="1" ></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="id" prop="id">-->
<!--        <el-input v-model="ruleForm.id"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="1" ></el-option>
          <el-option label="女" value="2" ></el-option>
          <el-option label="保密" value="3" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {userRegister} from "@/api/user";

export default {
  name: "adminAddUser",
  data() {
    return {
      ruleForm: {
        id: 4,
        username: '',
        sex: '',
        role: '',
        account: '',
        password: '',
        createtime: null,
        group_id: 0,
        state: '0',
        uavg: '0',
      },
      rules: {
        username: [
          { required: true, message: '用户名不可为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '账号不可为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        createTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(ruleForm) {
      console.log(this.ruleForm)
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          userRegister (this.ruleForm).then(res => {
            let code = res.data.code
            if(code == 200) {
          console.log('register')
              // this.getAllList()
              this.$message({ showClose: true, message: '成功!', type: 'success'});
              this.addDialogFormVisible = false
            }else {
              this.$message({ showClose: true, message: res.data.message, type: 'error'});
            }
          }).catch((err) => {
            console.log(err)
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
.el-input {
  width: 40%;
}
.el-textarea{
  width: 40%;
}
</style>
