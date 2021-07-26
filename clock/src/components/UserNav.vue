<template>
  <div class="nav">
    <el-menu :router="true" default-active="/userList"
             class="el-menu-vertical-demo" @open="handleOpen"
             @close="handleClose" background-color="rgb(48, 65, 86)"
             text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="/userMsg">
        <i class="el-icon-tickets"></i>
        <span slot="title">个人资料</span>
      </el-menu-item>
      <el-menu-item index="/timeLine">
        <i class="el-icon-tickets"></i>
        <span slot="title">我的打卡</span>
      </el-menu-item>
      <el-menu-item index="/userComment">
        <i class="el-icon-tickets"></i>
        <span slot="title">评论组件</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "UserNav",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.el-menu {
  border: 0px;
}
</style>
<style scoped>
.nav {
  margin: 0%;
  height: 100%;
  overflow-y: auto;
}

.nav ul {
  height: 100%;
}

::-webkit-scrollbar {
  width: 0 !important;
}
</style>
