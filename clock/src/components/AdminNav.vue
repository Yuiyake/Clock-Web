<template>
  <div class="nav">
    <el-menu :router="true" default-active="/userList"
             class="el-menu-vertical-demo" @open="handleOpen"
             @close="handleClose" background-color="rgb(48, 65, 86)"
             text-color="#fff" active-text-color="#ffd04b" :default-openeds="openeds">
      <el-submenu index="2" >
        <template slot="title"><i class="el-icon-s-platform"></i>用户管理</template>
        <el-menu-item index="/userList">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户信息</span>
        </el-menu-item>
        <el-menu-item index="/adminAddUser">
          <i class="el-icon-user-solid"></i>
          <span slot="title">添加用户</span>
        </el-menu-item>
        <el-menu-item index="/userRecycle">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户回收</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-platform"></i>小组</template>
        <el-menu-item index="/groupInfo">
          <i class="el-icon-tickets"></i>
          <span slot="title">小组管理</span>
        </el-menu-item>
        <el-menu-item index="/groupEcharts">
          <i class="el-icon-tickets"></i>
          <span slot="title">小组图表</span>
        </el-menu-item>
        </el-submenu>
      <el-menu-item index="/typeInfo">
        <i class="el-icon-tickets"></i>
        <span slot="title">打卡类型管理</span>
      </el-menu-item>
      <el-menu-item index="/dynamicInfo">
        <i class="el-icon-tickets"></i>
        <span slot="title">动态管理</span>
      </el-menu-item>
      <el-menu-item index="/announcement">
        <i class="el-icon-tickets"></i>
        <span slot="title">公告发布</span>
      </el-menu-item>
      <el-menu-item index="/adminInfo">
        <i class="el-icon-tickets"></i>
        <span slot="title">个人资料</span>
      </el-menu-item>
<!--      <el-menu-item index="/majorList">-->
<!--        <i class="el-icon-tickets"></i>-->
<!--        <span slot="title">分类（专业）管理</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/classList">-->
<!--        <i class="el-icon-film"></i>-->
<!--        <span slot="title">小组（班级）管理</span>-->
<!--      </el-menu-item>-->
<!--      <el-submenu index="2">-->
<!--        <template slot="title"><i class="el-icon-s-platform"></i>课程管理</template>-->
<!--        <el-menu-item index="/courseList"><i class="el-icon-s-platform"></i>课程管理</el-menu-item>-->
<!--        <el-menu-item index="/coursePlanList"><i class="el-icon-s-order"></i>课程表管理</el-menu-item>-->
<!--      </el-submenu>-->
<!--      <el-menu-item index="/scoreList">-->
<!--        <i class="el-icon-price-tag"></i>-->
<!--        <span slot="title">成绩（打卡）管理</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/adminInfo">-->
<!--        <i class="el-icon-s-custom"></i>-->
<!--        <span slot="title">个人信息</span>-->
<!--      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
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
