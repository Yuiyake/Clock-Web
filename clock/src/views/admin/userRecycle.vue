<template>
  <div>
    <!--    <p>用户回收页面</p>-->
    <!--    搜索栏-->
    <div style="width: 100%">
      <el-input v-model="searchList.id" placeholder="用户编号" clearable></el-input>
      <el-button @click="getAllList" type="primary">查询</el-button>
    </div>
    <!--    表格-->
    <div style="float: left; padding-top: 20px; width: 98%">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="reRole(scope.row.id)" size="small"  type="primary">恢复</el-button>
            <el-button @click="delUser(scope.row.id)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "userRecycle",
  data() {
    return{
      searchList: {
        id: ''
      },
      tableData: [
        {
          id: 555,
          account: 'shabixiaowang',
          username: '勇敢小王',
          state: '禁用'
        }
      ],
      state: [
        {state: '禁用'}
      ]
    }
  },
  methods: {
    reRole() {

    },
    delUser() {

    }
  }
}
</script>

<style scoped>
.el-input {
  width: 180px;
  height: 50px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.li_style {
  font-size: 16px;
  line-height: 28px;
}
</style>
