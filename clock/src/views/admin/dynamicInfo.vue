<template>
  <div>
    <p>动态管理</p>
<!--    <el-button type="warning" icon="el-icon-thumb" size="small" circle></el-button>-->
    <el-badge :value="12" class="item">
      <el-button icon="el-icon-thumb" type="warning" size="small">点赞</el-button>
    </el-badge>
    <el-badge :value="1" class="item" type="primary">
      <el-button icon="el-icon-chat-dot-square" type="primary" size="small">评论</el-button>
    </el-badge>
    <!--    搜索栏-->
    <div style="width: 100%">
      <el-input v-model="searchList.did" placeholder="类型编号" clearable></el-input>
      <el-button @click="getDynamic" type="primary">查询</el-button>
<!--      <el-button @click="dialogFormVisible = true" type="primary">新增</el-button>-->
    </div>
    <!--    表格-->
    <div style="float: left; padding-top: 20px; width: 98%">
      <el-table stripe :data="tableData" style="width: 100%" :cell-style="{ textAlign: 'center' }" :header-cell-style="{textAlign: 'center'}">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="动态 id">
                <span>{{ props.row.did }}</span>
              </el-form-item>
              <el-form-item label="打卡类型">
                <span>{{ props.row.tid }}</span>
              </el-form-item>
              <el-form-item label="用户">
                <span>{{ props.row.uid }}</span>
              </el-form-item>
              <el-form-item label="发布时间">
                <span>{{ props.row.dtime }}</span>
              </el-form-item>
              <el-form-item label="点赞数">
                <span>{{ props.row.support }}</span>
              </el-form-item>
              <el-form-item label="回复数">
                <span>{{ props.row.dreplycount }}</span>
              </el-form-item>
              <el-form-item label="内容">
                <span>{{ props.row.dconcern }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="did" prop="did" width="100"></el-table-column>
<!--        <el-table-column label="打卡类型" prop="tid" width="100"></el-table-column>-->
        <el-table-column label="用户" prop="uid" width="100"></el-table-column>
        <el-table-column label="发布时间" prop="dtime"></el-table-column>
<!--        <el-table-column label="点赞数" prop="support" width="100"></el-table-column>-->
<!--        <el-table-column label="回复数" prop="dreplycount" width="100"></el-table-column>-->
<!--        <el-table-column label="内容" prop="dconcern" width="100"></el-table-column>-->
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!--            <el-button @click="changeType(scope.$index, scope.row.tid)" size="small"  type="primary">修改</el-button>-->
<!--            <el-button @click="checkDetail(scope.row)" size="small"  type="primary">查看详情</el-button>-->
            <el-button @click="delDynamic(scope.row.did)" size="small" type="danger">删除</el-button>
            <!--            <el-button @click="delType(this.tableData)" size="small" type="danger">删除</el-button>-->
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

<!--    表格-->
    <div>
      <!-- Table -->
      <el-dialog title="详情" :visible.sync="dialogTableVisible" width="70%">
        <el-table :data="addTable">
          <el-table-column prop="did" label="动态id" width="100"></el-table-column>
          <el-table-column prop="tid" label="打卡类型" width="100"></el-table-column>
          <el-table-column prop="uid" label="用户"></el-table-column>
          <el-table-column prop="dtime" label="发布时间"></el-table-column>
          <el-table-column prop="support" label="点赞数"></el-table-column>
          <el-table-column prop="dreplycount" label="回复数"></el-table-column>
          <el-table-column prop="dconcern" label="内容"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {selectAllDynamic, deleteDynamic} from "@/api/dynamic";
import {deleteType} from "@/api/type";

export default {
  name: "dynamicInfo",
  data() {
    return {
      dialogFormVisible: false,
      dialogTableVisible: false,
      searchList: {
        did: ''
      },
      searchParam: {
        pageSize:10,
        pageNum:1,
        isPage:'1'
      },
      total:0,
      tableData: [],
      addTable: [],

      formLabelWidth: '120px'
    }
  },
  created() {
    this.getDynamic()
  },
  methods: {
    getDynamic() {
      selectAllDynamic(this.searchParam).then(res => {
        let code = res.data.code
        if(code == 200) {
          this.tableData = res.data.data.list
          console.log(this.tableData)
          this.total = res.data.data.total
        }else {
          this.$message({ showClose: true, message: '查询失败，请重试!', type: 'error'});
        }
      }).catch(() => {
        console.log("===error===")
      })
    },
    checkDetail(form){
      // this.addTable = JSON.parse(JSON.stringify(form))
      // this.addDialogFormVisible = true
      this.dialogTableVisible = true
    },
    delDynamic(did) {
      this.$confirm('确定要删除该类型吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDynamic(did).then(res => {
          let code = res.data.code
          if(code == 200) {
            this.getDynamic()
            this.$message({ showClose: true, message: '删除成功!', type: 'success'});
          }else {
            this.$message({ showClose: true, message: '删除失败，请重试!', type: 'error'});
          }
        }).catch((err) => {
          console.log("===管理员删除异常===")
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleCurrentChange(val) {
      this.searchParam.pageNum = val
      this.getType()
    },
  },
}
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
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
  width: 70%;
}


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
  width: 70%;
}

.li_style {
  font-size: 16px;
  line-height: 28px;
}
</style>
