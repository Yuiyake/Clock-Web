<template>
    <div  class="header_div">
        <div class="right-menu">
      <p>hello,{{admin.username}}。 编号：{{admin.id}}</p>
            <el-tooltip class="item" effect="dark" content="退出登录" placement="top-start">
                <el-button style="padding-top:2px" @click="logout" type="text">
                  <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                </el-button>
            </el-tooltip>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      admin: {},
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
        logout() {
            this.$router.push({path:`/userLogin`})
        },
      getUserInfo() {
        this.admin = JSON.parse(localStorage.getItem('suser'))
      },
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
