<template>
  <div class="block">
    <h4>你好，{{admin.username}}, id: {{admin.id}}</h4>
    <el-timeline>
      <el-timeline-item :timestamp=dData.dtime placement="top" v-for="(dData, index) in dynamicData" :key="index">
        <el-card>
          <h4>更新 {{ dData.uid }} 打卡</h4>
          <p>did: {{dData.did}}</p>
          <p>王傻逼 提交于 {{ dData.dtime }}</p>
          <p>{{dData.dconcern}}</p>
<!--          <el-button type="text" @click="getRowDynamic">查看详情</el-button>-->
          <el-button type="text" @click="showReply">回复</el-button>
<!--          <div v-if="replyVisible">-->
          <comment :comments="commentData"></comment>
<!--          </div>-->
        </el-card>
      </el-timeline-item>
    </el-timeline>

<!--    &lt;!&ndash;    动态详情弹窗&ndash;&gt;-->
<!--    <div>-->
<!--      <el-dialog title="动态详情" :visible.sync="dialogFormVisible">-->
<!--        <template>-->
<!--          <el-table-->
<!--              :data="dynamicData"-->
<!--              style="width: 100%">-->
<!--            <el-table-column type="expand">-->
<!--              <template slot-scope="props">-->
<!--                <el-form label-position="left" inline class="demo-table-expand">-->
<!--                  <el-form-item label="动态编号">-->
<!--                    <span>{{ props.row.did }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="打卡类型">-->
<!--                    <span>{{ props.row.tid }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="用户">-->
<!--                    <span>{{ props.row.uid }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="时间">-->
<!--                    <span>{{ props.row.dtime }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="点赞">-->
<!--                    <span>{{ props.row.support }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="回复">-->
<!--                    <span>{{ props.row.dreplycount }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="内容">-->
<!--                    <span>{{ props.row.dconcern }}</span>-->
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
import {selectUserReply, addRootReply, addSonReply} from "@/api/reply";
import dynamicInfo from "@/views/admin/dynamicInfo";
import * as CommentData from '../../components/mockdata'
import comment from "@/components/comment";
export default {
  name: "timeLine",
  data() {
    return{
      dialogFormVisible: false,
      replyVisible: false,
      timestamp: '',
      admin:{},
      commentData: [],
      dynamicData: [
        {
          // uid: '',
          did: '',
          // dconcern: '',
          // support: '',
          // dtime: '',
          // dreplycount: '',
        }
      ]
    }
  },
  components: {
    comment
  },
  created() {
    this.getUserInfo();
    this.getDynamic();
    this.commentData = CommentData.comment.data;
    this.getAllReply();
  },
  methods: {
    getDynamic(uid) {

      this.dynamicData.uid = this.admin.id
      // console.log(this.dynamicData.uid)
      selectThisDynamic(this.dynamicData.uid).then(res => {
        let code = res.data.code
        // console.log(res.data.data)
        if (code == 200){
          this.dynamicData = res.data.data
          // console.log(this.dynamicData)
          // this.$message({showClose:true, message:'成功', type:'success'})
        } else {
          this.$message({ showClose: true, message: '查询失败，请重试!', type: 'error'});
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getRowDynamic() {
      this.dialogFormVisible = true
    },
    getUserInfo() {
      this.admin = JSON.parse(localStorage.getItem('suser'))
    },
    showReply(){
      this.replyVisible = true
    },

    // getAllReply(did){
    //   this.dynamicData.did = did
    //   console.log(did)
    //   selectUserReply(did).then(res => {
    //     let code = res.data.code
    //     if(code == 200){
    //       this.commentData = res.data.data
    //     } else {
    //       this.$message({ showClose: true, message: '获取评论失败，请重试!', type: 'error'});
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },

    getAllReply() {
      // did = 1
      console.log(dynamicInfo)
      const did = this.dynamicData.did
      console.log(did)
      selectUserReply(did).then(res => {
        let code =  res.data.code
        if (code == 200){
          this.commentData = res.data.data.data
          console.log(this.commentData)
          console.log(res.data.data)
        }
      })
    }

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
