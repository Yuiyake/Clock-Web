<template>
<div>
<!--  <p>用户信息修改页面</p>-->
  <h3>信息修改</h3>
  <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <p>点击上传头像</p>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
          <el-option label="保密" value="保密"></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="创建时间" required>-->
<!--        <el-col :span="11">-->
<!--          <el-form-item prop="createTime">-->
<!--            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createTime" style="width: 100%;"></el-date-picker>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-form-item>-->
      <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
<!--        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: "userMsg",
  data() {
    return {
      imageUrl: '',
      ruleForm: {
        username: '',
        sex: '',
        account: '',
        password: '',
        createTime: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
.el-upload{
}
.avatar-uploader-icon{
  text-align: center;
  border: 2px dashed #409EFF;
}
.avatar-uploader .el-upload {
  border: 1px dashed #409EFF;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
