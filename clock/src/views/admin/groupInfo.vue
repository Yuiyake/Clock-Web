<template>
  <div>
    <!--    搜索栏-->
    <div style="width: 100%">
      <el-input v-model="searchList.gid" placeholder="小组编号" clearable></el-input>
      <el-button @click="getAllList" type="primary">查询</el-button>
    </div>
    <!--    表格-->
    <div style="float:left;padding-top:20px;width:98%">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column type="index"  width="200"></el-table-column>
        <el-table-column label="小组编号" prop="gid"></el-table-column>
        <el-table-column label="小组名称" prop="gname"></el-table-column>
        <el-table-column label="打卡类型" prop="clocktype"></el-table-column>
        <el-table-column label="成员数量" prop="gNum"></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button @click="toUpdate(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="padding-top:20px;width:80%;float:left">
      <el-pagination :page-size="10" background layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :current-page.sync="searchParam.pageNum"
                     :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {selectAllGroups} from "@/api/group";

export default {
  name: "groupInfo",
  data() {
    return{
      searchList: {
        gid: ''
      },
      searchParam: {
        pageSize:10,
        pageNum:1,
        isPage:'1'
      },
      total:0,
      tableData: [],
      addform:{},
    }
  },
  created() {
    this.getAllList()
  },
  methods: {
    checkGroup() {
      console.log('编辑')
    },
    delGroup() {
      console.log('删除')
    },
    getAllList() {
      console.log('run select')
      selectAllGroups (this.searchParam).then(res => {
        let code = res.data.code
        if(code == 200) {
          this.tableData = res.data.data.list
          console.log(this.tableData)
          this.total = res.data.data.total
        }else {
          this.$message({ showClose: true, message: '查询失败，请重试!', type: 'error'});
        }
      }).catch(() => {
        console.log("==error===")
      })
    },
    handleCurrentChange(val) {
      this.searchParam.pageNum = val
      this.getAllList()
    },
    toUpdate(form) {

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
