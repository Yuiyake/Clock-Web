<template>
  <div>
    <!--    <p>用户回收页面</p>-->
    <!--    搜索栏-->
    <div style="width: 100%">
      <el-input v-model="searchParam.id" placeholder="用户编号" clearable></el-input>
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
            <el-button @click="recovery(scope.row.id)" size="small"  type="primary">恢复</el-button>
            <el-button @click="delData(scope.row.id)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!--    分页-->
    <div style="padding-top:20px;width:80%;float:left">
      <el-pagination :page-size="10" background layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :current-page.sync="searchParam.pageNum"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {deleteUser, recoveryUser, selectAllUser, selectForbidUser} from "@/api/user";

export default {
  name: "userRecycle",
  data() {
    return{
      searchList: {
        id: ''
      },
      tableData: [],
      state: [
        {state: '禁用'}
      ],
      searchParam: {
        pageSize:10,
        pageNum:1,
        role:'1',
        // state: '0'
      },
      total:0,
    }
  },
  created() {
    this.getAllList()
  },
  methods: {
    // 获取所有信息
    getAllList(){
      selectForbidUser (this.searchParam).then(res => {
        let code = res.data.code
        if(code == 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }else {
          this.$message({ showClose: true, message: '查询失败，请重试!', type: 'error'});
        }
      }).catch(() => {
        console.log("===error===")
      })
    },
    handleCurrentChange(val) {
      this.searchParam.pageNum = val
      this.getAllList()
    },
    recovery(id) {
      this.$confirm('确定要禁用该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recoveryUser(id).then(res => {
          let code = res.data.code
          if(code == 200) {
            this.getAllList()
            this.$message({ showClose: true, message: '禁用成功!', type: 'success'});
          }else {
            this.$message({ showClose: true, message: '禁用失败，请重试!', type: 'error'});
          }
        }).catch(() => {
          console.log("===管理员禁用异常===")
        })
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消禁用'
        });
      });
    },
    // 删除学生
    delData(id) {
      this.$confirm('确定要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser (id).then(res => {
          let code = res.data.code
          if(code == 200) {
            this.getAllList()
            this.$message({ showClose: true, message: '删除成功!', type: 'success'});
          }else {
            this.$message({ showClose: true, message: '删除失败，请重试!', type: 'error'});
          }
        }).catch(() => {
          console.log("===管理员删除异常===")
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
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
