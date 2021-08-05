<template>
  <div>
    <!--    搜索栏-->
    <div style="width: 100%">
      <el-input v-model="searchList.tid" placeholder="类型编号" clearable></el-input>
      <el-button @click="getType" type="primary">查询</el-button>
      <el-button @click="dialogFormVisible = true" type="primary">新增</el-button>
    </div>
    <!--    表格-->
    <div style="float: left; padding-top: 20px; width: 98%">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column label="tid" prop="tid"></el-table-column>
        <el-table-column label="类型名" prop="tname"></el-table-column>
        <el-table-column label="人数" prop="tnum"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
<!--            <el-button @click="changeType(scope.$index, scope.row.tid)" size="small"  type="primary">修改</el-button>-->
            <el-button @click="changeType(scope.row)" size="small"  type="primary">修改</el-button>
            <el-button @click="delType(scope.row.tid)" size="small" type="danger">删除</el-button>
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

<!--    添加弹窗-->
    <div>
      <el-dialog title="新增类型" :visible.sync="dialogFormVisible">
        <el-form :model="addform">
          <el-form-item label="类型名称" :label-width="formLabelWidth">
            <el-input v-model="addform.tname" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

<!--    编辑弹窗-->
    <div>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="addform"  ref="addform">
          <el-form-item label="类型id" :label-width="formLabelWidth">
            <el-input v-model="addform.tid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型名称" :label-width="formLabelWidth">
            <el-input v-model="addform.tname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型人数" :label-width="formLabelWidth">
            <el-input v-model="addform.tnum" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateType('addform')">提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {selectAllType, updateType, deleteType} from '@/api/type'
import {selectAllGroups} from "@/api/group";
import {deleteUser} from "@/api/user";
export default {
  name: "typeInfo",
  data() {
    return{
      dialogFormVisible: false,
      searchList: {
        tid: ''
      },
      searchParam: {
        pageSize:10,
        pageNum:1,
        isPage:'1'
      },
      total:0,
      tableData: [],


      addform: {},
      // form: {
      //   tname: '',
      //   region: '',
      //   type: [],
      //   resource: '',
      //   desc: ''
      // },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getType()
  },
  methods: {
    getType() {
      selectAllType(this.searchParam).then(res => {
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
    changeType(form) {
      this.addform = JSON.parse(JSON.stringify(form))
      this.dialogFormVisible = true;
      // this.form = Object.assign([], row);
    },
    updateType(tableData){
      // this.tableData = JSON.parse(JSON.stringify(tableData))
      this.$refs[tableData].validate((valid) => {
        if (valid){
          updateType(this.addform).then((res) => {
            let code = res.data.code
            if (code == 200) {
              this.getType()
              this.$message({showClose: true, message: '成功！', type: 'success'});
            }else {
              this.$message({showClose: true, message: res.data.message, type: 'error'});
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('error summit!');
          return false;
        }
      })
    },
    delType(tid) {
      console.log("删除")
      this.$confirm('确定要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteType (tid).then(res => {
          let code = res.data.code
          if(code == 200) {
            this.getType()
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
