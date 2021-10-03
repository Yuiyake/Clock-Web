<template>
  <div class="nav">
    <el-menu :router="true" default-active="/userList"
             class="el-menu-vertical-demo" @open="handleOpen"
             @close="handleClose" background-color="rgb(48, 65, 86)"
             text-color="#fff" active-text-color="#ffd04b" :default-openeds="openeds">
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-platform"></i>我的</template>
        <el-menu-item index="/userMsg">
          <i class="el-icon-tickets"></i>
          <span slot="title">个人资料</span>
        </el-menu-item>
        <el-menu-item index="/writeBlog">
          <i class="el-icon-s-flag"></i>
          <span slot="title">我的打卡</span>
        </el-menu-item>
        <el-menu-item index="/myScore">
          <i class="el-icon-s-order"></i>
          <span slot="title">我的积分</span>
        </el-menu-item>
        <el-menu-item index="/timeLine">
          <i class="el-icon-date"></i>
          <span slot="title">时间轴</span>
        </el-menu-item>
        <el-menu-item index="/myGroup">
          <i class="el-icon-user"></i>
          <span slot="title">我的小组</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/groupSquare">
        <i class="el-icon-tickets"></i>
        <span slot="title">小组广场</span>
      </el-menu-item>
<!--      <el-menu-item index="/userComment">-->
<!--        <i class="el-icon-tickets"></i>-->
<!--        <span slot="title">评论组件</span>-->
<!--      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "UserNav",
  data() {
    return {
      openeds: ['2'],
      uniqueOpened: false
    }
  },
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
