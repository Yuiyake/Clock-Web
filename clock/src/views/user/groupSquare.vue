<template>
  <div>
    <!--    搜索栏-->
    <div style="width: 100%">
      <el-input v-model="searchList.gid" placeholder="小组编号" clearable></el-input>
      <el-button @click="getAllList" type="primary">查询</el-button>
      <el-button type="text" @click="addToGroup">没有想加入的小组？点我创建</el-button>
    </div>
    <!--    表格-->
    <h4>你好，{{admin.username}}, id: {{admin.id}}</h4>
<!--    <span label="打卡率" >{{percentage}}</span>-->
    <div style="float:left;padding-top:20px;width:98%">
      <el-table stripe :data="tableData" style="width: 100%" :cell-style="{ textAlign: 'center' }" :header-cell-style="{textAlign: 'center'}">
        <el-table-column label="小组编号" prop="gid"></el-table-column>
        <el-table-column label="小组名称" prop="gname"></el-table-column>
        <el-table-column label="打卡类型" >
          <template slot-scope="scope">
            <span v-if="scope.row.clocktype == 1">早起</span>
            <span v-if="scope.row.clocktype == 2">学习</span>
            <span v-if="scope.row.clocktype == 3">早睡</span>
            <span v-if="scope.row.clocktype == 4">运动</span>
            <span v-if="scope.row.clocktype == 5">读书</span>
          </template>
        </el-table-column>
        <el-table-column label="成员数量" prop="gnum"></el-table-column>
        <el-table-column label="打卡数量" prop="clocknum"></el-table-column>
        <el-table-column label="今日打卡率">
          <template slot-scope="scopes">{{percentage(scopes.row.clocknum, scopes.row.gnum)}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button @click="toUpdate(scope.row.gid)" type="primary" size="small">加入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="padding-top:20px;width:80%;float:left">
      <el-pagination :page-size="10" background layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :current-page.sync="searchParam.pageNum"
                     :total="total">

      </el-pagination>
    </div>

    <!--    添加小组弹窗-->
    <div>
      <el-dialog title="小组信息" width="40%" :visible.sync="addDialogFormVisible">
        <el-form :model="addform" ref="addform" >
<!--          <el-form-item label="打卡类型" :label-width="formLabelWidth" prop="colcktype">-->
<!--            <el-select v-model="addform.colcktype" clearable placeholder="请选择">-->
<!--              <el-option v-for="item in colcktype" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="小组编号" :label-width="formLabelWidth" prop="gid">
            <el-input v-model="addform.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="小组名称" :label-width="formLabelWidth" prop="gname">
            <el-input v-model="addform.gname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="打卡类型" :label-width="formLabelWidth" prop="clocktype">
            <el-input v-model="addform.clocktype" autocomplete="off"></el-input>
          </el-form-item>
<!--          <el-form-item label="成员数量" :label-width="formLabelWidth" prop="gNum">-->
<!--            <el-input v-model="addform.gnum" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item :label-width="formLabelWidth">
            <el-button @click="addDialogFormVisible = false">取消</el-button>
            <el-button @click="createNewGroup('addform')" type="primary">确认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import {selectAllGroups, updateGroup, userJoinGroup, changeGnum, userAddGroup} from "@/api/group";

export default {
    name: "groupSquare",
    data() {
      return{
        searchList: {
          gid: ''
        },
        colcktype: [
          {id: '1', name: '早起'},
          {id: '2', name: '学习'},
          {id: '3', name: '打游戏'}
        ],
        searchParam: {
          pageSize:10,
          pageNum:1,
          isPage:'1'
        },
        total:0,
        tableData: [],

        admin:{},

        addDialogFormVisible:false,
        formLabelWidth:'120px',
        addform:{},
        // addformrules: {
        //   majorId: [
        //     { required: true, message: '请选择专业', trigger: 'blur' },
        //   ],
        //   name: [
        //     { required: true, message: '请输入班级名称', trigger: 'blur' },
        //   ],
        //   joinYear: [
        //     { required: true, message: '请输入入学年份', trigger: 'blur' },
        //   ],
        //   studentNum: [
        //     { required: true, message: '请输入学生数量', trigger: 'blur' },
        //   ],
        //   teacher: [
        //     { required: true, message: '请输入辅导员', trigger: 'blur' },
        //   ],
        // },
      }
    },

    computed: {
      // percentage(clocknum, gnum){
      //   return this.tableData.clocknum/this.tableData.gnum
      // }
    },

    created() {
      this.getUserInfo()
      this.getAllList()
    },
    methods: {
      percentage(clocknum, gnum){
        return clocknum/gnum
      },
      checkGroup() {
        console.log('编辑')
      },
      delGroup() {
        console.log('删除')
      },
      getUserInfo() {
        this.admin = JSON.parse(localStorage.getItem('suser'))
      },
      getAllList() {
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
      addToGroup(form) {
        this.addform = JSON.parse(JSON.stringify(form))
        // console.log(this.addform)
        this.addDialogFormVisible = true
      },

      createNewGroup(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.addform)
          if (valid) {
            userAddGroup(this.addform).then(res => {
              let code = res.data.code
              if(code == 200) {
                this.getAllList()
                this.$message({ showClose: true, message: '成功!', type: 'success'});
                this.addDialogFormVisible = false
              }else {
                this.$message({ showClose: true, message: res.data.message, type: 'error'});
              }
            }).catch((err) => {
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      toUpdate(gid) {
        console.log(this.admin.id)
        userJoinGroup(this.admin.id, gid).then(res => {
          let code = res.data.code
          if (code == 200) {
            this.getAllList();
            this.$message({showClose: true, message: '加入成功！', type: 'success'})
          } else{
            this.$message({showClose: true, message: '加入失败，请重试！', type: 'error'})
          }
        }).catch((err) => {
          console.log(err)
        })
        changeGnum(gid).then(res => {
          let code = res.data.code
          if (code == 200){
            this.$message({showClose: true, message: '更新小组人数成功！', type: 'success'})
          } else{
            this.$message({showClose: true, message: '更新失败，请重试！', type: 'error'})
          }
        }).catch((err) => {
          console.log(err)
        })
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
