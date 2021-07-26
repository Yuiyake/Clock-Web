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
            <el-button @click="changeType(scope.$index, scope.row.tid)" size="small"  type="primary">修改</el-button>
            <el-button @click="delType(scope.row.tid)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

<!--    添加弹窗-->
    <div>
      <el-dialog title="新增类型" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="类型名称" :label-width="formLabelWidth">
            <el-input v-model="form.tname" autocomplete="off"></el-input>
          </el-form-item>
<!--          <el-form-item label="活动区域" :label-width="formLabelWidth">-->
<!--            <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--              <el-option label="区域一" value="shanghai"></el-option>-->
<!--              <el-option label="区域二" value="beijing"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
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
        <el-form :model="form">
          <el-form-item label="类型名称" :label-width="formLabelWidth">
            <el-input v-model="form.tname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型人数" :label-width="formLabelWidth">
            <el-input v-model="form.tnum" autocomplete="off"></el-input>
          </el-form-item>
          <!--          <el-form-item label="活动区域" :label-width="formLabelWidth">-->
          <!--            <el-select v-model="form.region" placeholder="请选择活动区域">-->
          <!--              <el-option label="区域一" value="shanghai"></el-option>-->
          <!--              <el-option label="区域二" value="beijing"></el-option>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "typeInfo",
  data() {
    return{
      dialogFormVisible: false,
      searchList: {
        tid: ''
      },
      tableData: [
        {
          tid: 1,
          tname: '学习',
          tnum: 122
        }
      ],
      form: {
        tname: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    getType() {
      console.log("模糊查询")
    },
    changeType(index, row) {
      console.log("修改")
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
    },
    delType() {
      console.log("删除")
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
