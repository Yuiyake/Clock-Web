<template>
  <div>
    <div style="width:100%;">
      <el-input v-model="searchParam.username" placeholder="用户名" clearable />
      <el-input v-model="searchParam.usercode" placeholder="学号" clearable />
      <el-input v-model="searchParam.realname" placeholder="姓名" clearable />
<!--      <el-cascader clearable v-model="searchParam.class" placeholder="专业班级" @change="handleChange" :props="defaultProps" :options="classes"  :show-all-levels="false"></el-cascader>-->
      <el-button @click="getAllList" type="primary">查询</el-button>
<!--      <el-button @click="toAdd" >新增</el-button>-->
    </div>


    <div style="float:left;padding-top:20px;width:98%">
      <el-table stripe :data="tableData" style="width: 100%" :ref="tableData" :model="tableData">
        <el-table-column label="id" prop="id"  width="100"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="学号" prop="account"></el-table-column>
        <el-table-column label="权限" prop="role"></el-table-column>
        <el-table-column label="性别" prop="sex" width="100"></el-table-column>
<!--        <el-table-column label="密码" prop="password"></el-table-column>-->
<!--        <el-table-column label="专业" prop="major"></el-table-column>-->
        <el-table-column label="小组" prop="groupId" width="100"></el-table-column>
<!--        <el-table-column label="出生年月" prop="birthday"></el-table-column>-->
<!--        <el-table-column label="联系方式" prop="phone"></el-table-column>-->
<!--        <el-table-column label="家庭住址" prop="address"></el-table-column>-->
        <el-table-column label="创建时间" prop="createtime"></el-table-column>
        <el-table-column label="状态" prop="state" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
<!--            <el-button @click="delData(scope.row.id)" type="danger" size="small">禁用</el-button>-->
            <el-button @click="toUpdate(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button @click="updateData(this.tableData)" type="danger" size="small">禁用</el-button>
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
    <el-dialog title="用户信息" width="40%" :visible.sync="addDialogFormVisible">
      <el-form :model="addform" :rules="addformrules" ref="addform" >
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth" prop="account">
          <el-input v-model="addform.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="role">
          <el-select clearable v-model="addform.role"  >
            <el-option v-for="item in roles" :key="item.rid" :label="item.rname" :value="item.rid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select clearable v-model="addform.sex"  >
            <el-option v-for="item in sexs" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input show-password v-model="addform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
          <el-input v-model="addform.state" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="addDialogFormVisible = false">取消</el-button>
          <el-button @click="addData('addform')" type="primary">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import {selectAllUser,deleteUser,userRegister,updateUser} from '@/api/user'
// import {selectMajorClass} from '../../api/classes'


export default {
  created() {
    this.getAllList()
    // this.selectAllClassesa()
  },
  data() {
    return {

      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      sexs:[
        {id:'0',name:'男'},
        {id:'1',name:'女'},
      ],

      roles:[
        {rid:'0', rname:'超管'},
        {rid:'1', rname:'小组长'},
        {rid:'2', rname:'普通用户'},
      ],

      // classes:[],
      searchParam: {
        pageSize:10,
        pageNum:1,
        role:'1',
        // state: '0'
      },
      total:0,
      tableData: [],

      addDialogFormVisible:false,
      formLabelWidth:'120px',
      addform:{},
      addformrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
        ],
        usercode: [
          { required: true, message: '请输入学号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleChange(value) {
      if(value.length >1) {
        this.searchParam.classesId = value[1]
      }
    },
    handleChange2(value) {
      this.addform.majorId = value[0]
      if(value.length >1) {
        this.addform.classesId = value[1]
      }
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

    updateData(tableData) {
      this.tableData.state = '1'
      this.tableData = JSON.parse(JSON.stringify(tableData))
      this.tableData.majorclass = []
      this.tableData.majorclass.push(this.tableData.state)
      console.log(this.tableData.state)
      this.$refs[tableData].validate((valid) => {
        if (valid){
          updateUser(tableData).then((res) => {
            let code = res.data.code
            if(code == 200) {
              this.getAllList()
              this.$message({ showClose: true, message: '成功!', type: 'success'});
            }else {
              this.$message({ showClose: true, message: res.data.message, type: 'error'});
            }
          }).catch((err)=>{
            console.log(err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },

    // 获取所有信息
    getAllList(){
      selectAllUser (this.searchParam).then(res => {
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
    toAdd() {
      this.addform = {}
      this.addDialogFormVisible = true
    },
    toUpdate(form) {
      this.addform = JSON.parse(JSON.stringify(form))
      this.addform.majorclass = []
      this.addform.majorclass.push(this.addform.majorId)
      this.addform.majorclass.push(this.addform.classesId)
      this.addDialogFormVisible = true
    },

    // 添加学生
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUser(this.addform).then(res => {
            let code = res.data.code
            if(code == 200) {
              this.getAllList()
              this.$message({ showClose: true, message: '成功!', type: 'success'});
              this.addDialogFormVisible = false
            }else {
              this.$message({ showClose: true, message: res.data.message, type: 'error'});
            }
          }).catch(() => {
            console.log("===error===")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
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
