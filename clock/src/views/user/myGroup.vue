<template>
  <div>
    <el-divider content-position="left">今天你打卡了吗ε(○´∀｀)зε(´∀｀●)з</el-divider>
<!--    &lt;!&ndash;    搜索栏&ndash;&gt;-->
<!--    <div style="width: 100%">-->
<!--      <el-input v-model="searchParam.id" placeholder="用户编号" clearable></el-input>-->
<!--      <el-button @click="getAllList" type="primary">查询</el-button>-->
<!--    </div>-->

    <h4>你好，{{admin.username}}, id: {{admin.id}}</h4>
    <!--    表格-->
    <div style="float: left; padding-top: 20px; width: 98%">
      <el-table stripe :data="tableData" style="width: 100%" :cell-style="{ textAlign: 'center' }" :header-cell-style="{textAlign: 'center'}">
        <el-table-column label="小组id" prop="gid"></el-table-column>
<!--        <el-table-column label="小组名字" prop="gname"></el-table-column>-->
<!--        <el-table-column label="任务" prop="clocktype"></el-table-column>-->
        <el-table-column label="小组名字" prop="gname"></el-table-column>
        <el-table-column label="我的打卡状态" >
          <template slot-scope="scope">
            <span v-if="scope.row.uclockstate == '1'">已打卡</span>
            <span v-if="scope.row.uclockstate == '0'">未打卡</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="clock(scope.row.gid, scope.row.uclockstate)" size="small"  type="primary">打卡</el-button>
            <el-button @click="delData(scope.row.gid)" size="small" type="danger">退出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!--    &lt;!&ndash;    分页&ndash;&gt;-->
<!--    <div style="padding-top:20px;width:80%;float:left">-->
<!--      <el-pagination :page-size="10" background layout="prev, pager, next"-->
<!--                     @current-change="handleCurrentChange"-->
<!--                     :current-page.sync="searchParam.pageNum"-->
<!--                     :total="total">-->
<!--      </el-pagination>-->
<!--    </div>-->
  </div>
</template>

<script>
import {selectMyGroups,userQuitGroup, userDeleteGnum, userGroupClock} from "@/api/group";
import {deleteUser} from "@/api/user";

export default {
  name: "myGroup",
  data() {
    return{
      searchList: {
        id: ''
      },
      tableData: [
        {
          uid: '',
          gid: '',
          uclockstate:'',
        }
      ],
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
      admin:{},
    }
  },
  created() {
    this.getUserInfo();
    this.getAllList()
  },
  methods: {

    getUserInfo() {
      this.admin = JSON.parse(localStorage.getItem('suser'))
    },
    // 获取所有信息
    getAllList(){
      this.tableData.uid = this.admin.id
      console.log(this.tableData.uid)
      selectMyGroups (this.tableData.uid).then(res => {
        let code = res.data.code
        if(code == 200) {
          this.tableData = res.data.data
          // this.total = res.data.data.total
        }else {
          this.$message({ showClose: true, message: '查询失败，请重试!', type: 'error'});
        }
      }).catch(() => {
        console.log("===error===")
      })
    },
    // handleCurrentChange(val) {
    //   this.searchParam.pageNum = val
    //   this.getAllList()
    // },

    clock(gid,uclockstate) {
      // console.log("点击打卡")
      if(uclockstate === '1'){
        this.$message({ showClose: true, message: '今天已过卡，请勿重复打卡！', type: 'error'});
      }else {
        this.tableData.uid = this.admin.id
        userGroupClock(gid, this.tableData.uid).then(res => {
          let code = res.data.code
          if(code == 200) {
            this.getAllList()
            this.$message({ showClose: true, message: '打卡成功!', type: 'success'});
          }else {
            this.$message({ showClose: true, message: '查询失败，请重试!', type: 'error'});
          }
        })
      }
    },

    // 退出小组
    delData(gid) {
      this.$confirm('确定要退出该小组吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userQuitGroup (this.admin.id, gid).then(res => {
          let code = res.data.code
          if(code == 200) {
            this.getAllList()
            this.$message({ showClose: true, message: '删除成功!', type: 'success'});
          }else {
            this.$message({ showClose: true, message: '删除失败，请重试!', type: 'error'});
          }
        }).catch((err) => {
          console.log(err)
        })

        userDeleteGnum(gid).then(res => {
          let code = res.data.code
          if(code == 200) {
            this.$message({ showClose: true, message: '更改小组信息成功!', type: 'success'});
          }else {
            this.$message({ showClose: true, message: '更改小组信息失败，请重试!', type: 'error'});
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },

  },
}
</script>

<style scoped>

</style>
