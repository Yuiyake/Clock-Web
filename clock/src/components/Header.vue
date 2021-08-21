<template>
    <div  class="header_div">
        <div class="right-menu">
      <p>hello,{{admin.username}}。</p>
            <el-tooltip class="item" effect="dark" content="退出登录" placement="top-start">
                <el-button style="padding-top:2px" @click="logout" type="text">
                  <el-avatar :src="admin.uavg"></el-avatar>
                </el-button>
            </el-tooltip>
        </div>
    </div>
</template>
<script>
import {selectUserById} from "@/api/user";

export default {
  data() {
    return {
      admin: {
        uavg: ''
      },
    }
  },
  created() {
    this.getUserInfo()
    // this.getUser()
  },
  methods: {
        logout() {
            this.$router.push({path:`/userLogin`})
        },
        getUserInfo() {
          this.admin = JSON.parse(localStorage.getItem('suser'))
          console.log(this.admin)
          console.log(this.admin.uavg)
        },
        // getUser() {
        //   selectUserById(this.admin.id).then(res => {
        //     let code = res.data.code
        //     if(code == 200) {
        //       console.log(this.admin.uavg)
        //       console.log("初始化成功")
        //     }else {
        //       this.$message({ showClose: true, message: res.data.message, type: 'error'});
        //     }
        //   }).catch((err) => {
        //     console.log(err)
        //   })
        // },
    },
}
</script>
<style scoped>
.header_div {
    height: 50px;
    position: relative;
    background: #fff;
    /*background: rgb(48, 65, 86);*/
    -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}

.right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 20px;
}
p{
  float: left;
  text-align: center;
}
</style>
