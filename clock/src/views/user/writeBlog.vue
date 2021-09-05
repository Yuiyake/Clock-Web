<template>
  <div>
    <el-form ref="dynamicInfo" :model="dynamicInfo" label-width="80px">
      <el-form-item label="打卡类型">
        <el-select v-model="dynamicInfo.tid" placeholder="请选择打卡类型">
          <el-option label="学习" value=1 ></el-option>
          <el-option label="早起" value=2 ></el-option>
          <el-option label="早睡" value=3 ></el-option>
          <el-option label="运动" value=4 ></el-option>
          <el-option label="读书" value=5 ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上传图片">
        <el-upload
            class="upload-demo"
            action="http://localhost:1013/user/imgStr"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
            list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="图片url">
        <el-input v-model="dynamicInfo.dimg"></el-input>
      </el-form-item>
      <el-form-item label="具体内容">
        <el-input type="textarea" :rows="15" v-model="dynamicInfo.dconcern"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitInfo">今日打卡发射─=≡Σ((( つ•̀ 3 •́)つDash☆</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
import {addUserDynamic} from "@/api/dynamic"
import dynamicInfo from "@/views/admin/dynamicInfo";
export default {
  name: "writeBlog",
  data() {
    return {
      dynamicInfo: {
        did: 7,
        tid: '',
        dconcern: '',
        uid: '',
        dtime: null,
        dimg: '',
      },
      admin:{},
      imageUrl:'',
      dimg: '',
      fileList: [
          // {
          //   name: 'food.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // },
      ]
    }
  },

  created() {
    this.getUserInfo()
    // this.getCurrentTime()
  },

  methods: {

    submitInfo(){
      this.dynamicInfo.uid = this.admin.id
      this.dynamicInfo.tid = parseInt(this.dynamicInfo.tid)
      console.log(typeof (this.dynamicInfo.tid))
      console.log(this.dynamicInfo)
      addUserDynamic(this.dynamicInfo).then(res => {
        let code = res.data.code
        if (code == 200) {
          this.$message({ showClose: true, message: '成功!', type: 'success'});
        }else {
          this.$message({ showClose: true, message: res.data.message, type: 'error'});
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    // 获取当前时间
    // getCurrentTime() {
    //   //获取当前时间并打印
    //   var _this = this;
    //   let yy = new Date().getFullYear();
    //   let mm = new Date().getMonth()+1;
    //   let dd = new Date().getDate();
    //   let hh = new Date().getHours();
    //   let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    //   let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    //   _this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
    //   this.dynamicInfo.dtime = _this.gettime
    //   console.log(this.dynamicInfo.dtime)
    // },

    // 获取信息
    getUserInfo() {
      this.admin = JSON.parse(localStorage.getItem('suser'))
      console.log(this.admin.id)
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl)
      console.log(res)
      console.log(file)
      this.dynamicInfo.dimg = res
      // console.log(res)
      // console.log("图片上传里："+this.dynamicInfo.dimg)
      // updateUser()
    },
  }
}
</script>

<style scoped>

</style>
