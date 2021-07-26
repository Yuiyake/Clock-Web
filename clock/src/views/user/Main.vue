<template>
<div class="main">
  <el-container>
    <el-aside width="200px">
      <Nav />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main><router-view class="account-view"></router-view></el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import header from '../../components/Header'
import nav from '../../components/UserNav'
export default {
  // name: "Main",
  components: {
    'Header': header,
    'Nav': nav
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

<style scoped>
.main {
  height:100%;
  display: flex;
  flex-direction: column;
}

.account-view{
  overflow:auto;
  box-sizing: border-box;
  background-color:white;
  flex: 1;
}

.el-header {
  padding:0px;
}
</style>
