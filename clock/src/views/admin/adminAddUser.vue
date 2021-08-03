<template>
  <div>
    <h3>新增用户</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="权限" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择权限">
          <el-option label="管理员" value="1" ></el-option>
          <el-option label="组长" value="2" ></el-option>
          <el-option label="普通用户" value="3" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="id" prop="id">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
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
<!--      <el-form-item label="创建时间" required>-->
<!--        <el-col :span="11">-->
<!--          <el-form-item prop="createtime">-->
<!--            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createtime" style="width: 100%;"></el-date-picker>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="即时配送" prop="delivery">-->
<!--        <el-switch v-model="ruleForm.delivery"></el-switch>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="活动性质" prop="type">-->
<!--        <el-checkbox-group v-model="ruleForm.type">-->
<!--          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="地推活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="特殊资源" prop="resource">-->
<!--        <el-radio-group v-model="ruleForm.resource">-->
<!--          <el-radio label="线上品牌商赞助"></el-radio>-->
<!--          <el-radio label="线下场地免费"></el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="备注" prop="desc">-->
<!--        <el-input type="textarea" v-model="ruleForm.desc"></el-input>-->
<!--      </el-form-item>-->
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
        id: null,
        username: '',
        sex: '',
        role: '',
        account: '',
        password: '',
        createtime: null,
        type_id: 0,
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
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
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
