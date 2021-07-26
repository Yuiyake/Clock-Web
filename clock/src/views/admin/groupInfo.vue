<template>
  <div>
    <!--    搜索栏-->
    <div style="width: 100%">
      <el-input v-model="searchList.gid" placeholder="小组编号" clearable></el-input>
      <el-button @click="getAllList" type="primary">查询</el-button>
    </div>
    <!--    表格-->
    <div style="float: left; padding-top: 20px; width: 98%">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="小组名" prop="gname"></el-table-column>
        <el-table-column label="打卡类型" prop="clocktype"></el-table-column>
        <el-table-column label="小组人数" prop="gnum"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="checkGroup(scope.row.id)" size="small"  type="primary">编辑</el-button>
            <el-button @click="delGroup(scope.row.id)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "groupInfo",
  data() {
    return{
      searchList: {
        gid: ''
      },
      tableData: [
        {
          gid: 103,
          gname: '勇敢小王',
          clocktype: '学习',
          gnum: 6
        }
      ],
    }
  },
  methods: {
    checkGroup() {
      console.log('编辑')
    },
    delGroup() {
      console.log('删除')
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
