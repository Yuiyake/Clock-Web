<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item timestamp="2021/10/13" placement="top">
        <el-card>
          <h4>更新 学习 打卡</h4>
          <p>王傻逼 提交于 2021/10/13 12:46</p>
          <el-button type="text" @click="getDynamic">查看详情</el-button>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2020/10/13" placement="top">
        <el-card>
          <h4>更新 拉屎 打卡</h4>
          <img src="https://scpic.chinaz.net/files/pic/pic9/202012/bpic22047.jpg" />
          <p>王傻逼 提交于 2020/10/13 20:56</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2019/10/16" placement="top">
        <el-card>
          <h4>更新 吃饭 打卡</h4>
          <p>王傻逼 提交于 2019/10/16 10:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <!--    动态详情弹窗-->
    <div>
      <el-dialog title="动态详情" :visible.sync="dialogFormVisible">
<!--        <el-form :model="dynamicData">-->
<!--          <el-form-item label="打卡类型" :label-width="formLabelWidth">-->
<!--            <el-input v-model="dynamicData.tname" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="类型人数" :label-width="formLabelWidth">-->
<!--            <el-input v-model="dynamicData.tnum" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--          <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>-->
<!--        </div>-->
        <template>
          <el-table
              :data="dynamicData"
              style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="标题">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="打卡类型">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                  <el-form-item label="图片">
                    <span>{{ props.row.img }}</span>
                  </el-form-item>
                  <el-form-item label="回复">
                    <span>{{ props.row.reply }}</span>
                  </el-form-item>
                  <el-form-item label="点赞">
                    <span>{{ props.row.zan }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                label="标题"
                prop="title">
            </el-table-column>
            <el-table-column
                label="打卡类型"
                prop="tname">
            </el-table-column>
            <el-table-column
                label="描述"
                prop="desc">
            </el-table-column>
          </el-table>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "timeLine",
  data() {
    return{
      dialogFormVisible: false,
      timestamp: '',
      dynamicData: [{
        title: '王淳宇读书',
        tname: '学习',
        desc: '王淳宇是傻逼',
        img: '',
        reply: 'sb',
        zan: 10
      }]
    }
  },
  methods: {
    getDynamic() {
      this.dialogFormVisible = true
    },
  }
}
</script>

<style scoped>
img{
  width: 300px;
  height: 200px;
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
</style>
