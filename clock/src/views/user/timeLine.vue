<template>
  <div class="block">
    <h4>你好，{{admin.username}}, id: {{admin.id}}</h4>
          <el-button type="text" @click="getDynamic">查看详情</el-button>
    <el-timeline>
      <el-timeline-item timestamp="2021/10/13" placement="top" v-for="(dData, index) in dynamicData" :key="index">
        <el-card>
          <h4>更新 {{ dData.uid }} 打卡</h4>
          <p>王傻逼 提交于 {{ dData.dtime }}</p>
        </el-card>
      </el-timeline-item>
<!--      <el-timeline-item timestamp="2020/10/13" placement="top">-->
<!--        <el-card>-->
<!--          <h4>更新 拉屎 打卡</h4>-->
<!--&lt;!&ndash;          <img src="https://scpic.chinaz.net/files/pic/pic9/202012/bpic22047.jpg" />&ndash;&gt;-->
<!--          <p>王傻逼 提交于 2020/10/13 20:56</p>-->
<!--        </el-card>-->
<!--      </el-timeline-item>-->
<!--      <el-timeline-item timestamp="2019/10/16" placement="top">-->
<!--        <el-card>-->
<!--          <h4>更新 吃饭 打卡</h4>-->
<!--          <p>王傻逼 提交于 2019/10/16 10:46</p>-->
<!--        </el-card>-->
<!--      </el-timeline-item>-->
    </el-timeline>

<!--    &lt;!&ndash;    动态详情弹窗&ndash;&gt;-->
<!--    <div>-->
<!--      <el-dialog title="动态详情" :visible.sync="dialogFormVisible">-->
<!--&lt;!&ndash;        <el-form :model="dynamicData">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="打卡类型" :label-width="formLabelWidth">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input v-model="dynamicData.tname" autocomplete="off"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="类型人数" :label-width="formLabelWidth">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input v-model="dynamicData.tnum" autocomplete="off"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form>&ndash;&gt;-->
<!--&lt;!&ndash;        <div slot="footer" class="dialog-footer">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button @click="dialogFormVisible = false">取 消</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <template>-->
<!--          <el-table-->
<!--              :data="dynamicData"-->
<!--              style="width: 100%">-->
<!--            <el-table-column type="expand">-->
<!--              <template slot-scope="props">-->
<!--                <el-form label-position="left" inline class="demo-table-expand">-->
<!--                  <el-form-item label="标题">-->
<!--                    <span>{{ props.row.name }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="打卡类型">-->
<!--                    <span>{{ props.row.shop }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="商品描述">-->
<!--                    <span>{{ props.row.desc }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="图片">-->
<!--                    <span>{{ props.row.img }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="回复">-->
<!--                    <span>{{ props.row.reply }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="点赞">-->
<!--                    <span>{{ props.row.zan }}</span>-->
<!--                  </el-form-item>-->
<!--                </el-form>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                label="标题"-->
<!--                prop="title">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                label="打卡类型"-->
<!--                prop="tname">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                label="描述"-->
<!--                prop="desc">-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </template>-->
<!--      </el-dialog>-->
<!--    </div>-->
  </div>
</template>

<script>
import {selectAllDynamic, deleteDynamic, selectThisDynamic} from "@/api/dynamic";
import dynamicInfo from "@/views/admin/dynamicInfo";
export default {
  name: "timeLine",
  data() {
    return{
      dialogFormVisible: false,
      timestamp: '',
      admin:{},
      dynamicData: [
        {
          title: '王淳宇读书',
          tname: '学习',
          desc: '王淳宇是傻逼',
          img: '',
          reply: 'sb',
          zan: 10,
          tid: '',
          uid: '',
          did: '',
          dconcern: '',
          support: '',
          dtime: '',
          dreplycount: '',
        }
      ]
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getDynamic(uid) {
      // this.dialogFormVisible = true
      this.dynamicData.uid = this.admin.id
      console.log(this.dynamicData.uid)
      selectThisDynamic(this.dynamicData.uid).then(res => {
        let code = res.data.code
        console.log(res.data.data)
        if (code == 200){
          this.dynamicData = res.data.data
          console.log(this.dynamicData)
          this.$message({showClose:true, message:'成功', type:'success'})
        } else {
          this.$message({ showClose: true, message: '查询失败，请重试!', type: 'error'});
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getUserInfo() {
      this.admin = JSON.parse(localStorage.getItem('suser'))
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
