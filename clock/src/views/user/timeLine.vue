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
          <el-button v-if="!dData.showFlag" type="text" @click="isShow(dData,index)">查看</el-button>
          <template v-else>
            <el-button type="text" @click="showReply(dData)">回复</el-button>
            <transition name="fade" v-if="replyVisible">
              <div class="input-wrapper">
                <!--          <div class="input-wrapper" v-if="showInput">-->
                <el-input class="gray-bg-input"
                          v-model="fatherForm.rContents"
                          type="textarea"
                          :rows="3"
                          autofocus
                          placeholder="写下你的评论">
                </el-input>
                <div class="btn-control">
                  <span class="cancel" @click="replyVisible=false">取消</span>
                  <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
                </div>
              </div>
            </transition>
            <!--          <div v-if="replyVisible">-->
            <comment :comments="commentData"></comment>
            <!--          </div>-->
          </template>

        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import {selectAllDynamic, deleteDynamic, selectThisDynamic} from "@/api/dynamic";
import {selectUserReply, addRootReply, addSonReply} from "@/api/reply";
import dynamicInfo from "@/views/admin/dynamicInfo";
// import * as CommentData from '../../components/mockdata'
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
        {}
      ],
      didList:[],
      // test:[],
      CommentData:{},
      showFlag:false, // 是否查看评论
      fatherForm:{
        did:2,
        rContents:''
      }

    }
  },
  components: {
    comment
  },
  created() {
    this.getUserInfo();
    this.getDynamic();
    // this.commentData = CommentData.comment.data;
    // CommentData.comment.data = this.commentData;
    // this.getAllReply();
  },
  methods: {
    getDynamic() {
      this.dynamicData.uid = this.admin.id
      // console.log(this.dynamicData.uid)
      selectThisDynamic(this.dynamicData.uid).then(res => {
        let code = res.data.code
        // console.log(res.data.data)
        if (code == 200) {
          this.dynamicData = res.data.data.map(item=>{
            item.showFlag = false;
            return item;
          })
          // console.log(this.dynamicData)
          for (let i = 0; i < this.dynamicData.length; i++) {
            this.didList.push(this.dynamicData[i].did)
          }
          // console.log("this.did:"+this.didList)
          // this.$message({showClose:true, message:'成功', type:'success'})
        } else {
          this.$message({showClose: true, message: '查询失败，请重试!', type: 'error'});
        }

        this.getAllReply()
      })
    },
    getRowDynamic() {
      this.dialogFormVisible = true
    },
    getUserInfo() {
      this.admin = JSON.parse(localStorage.getItem('suser'))
    },
    isShow(dData,index) {
      this.fatherForm.did = dData.did;
      this.getAllReply()
      this.dynamicData.forEach((item,idx)=>{
        item.showFlag = false;
        if(idx===index){
          item.showFlag = true;
        }
      })
    },
    showReply(dData) {
      // this.fatherForm.did = dData.did;
      console.log('dData',dData)
      this.replyVisible = true
    },

    getAllReply() {
      let d = 0
      // for (let j = 0; j < this.didList.length; j++) {
        // d = this.didList[j]
        // console.log("d:" + d)
        // debugger
        selectUserReply(this.fatherForm.did).then(res => {
          let code = res.data.code
          if (code == 200) {
            this.commentData = res.data.data.data
            // console.log(res)
            // this.commentData.push(res.data.data.data)
            console.log(this.commentData)
            // console.log(res.data.data)
            // console.log(this.commentData[0].replyVOS)
            // console.log(this.commentData[0].did)
          }
        })
      // }
    },
    commitComment(){
    //  父评论

      addRootReply({
        rid:32,
        fid:1,
        fromuid:2,
        fromuname:'uio',
        touid:2,
        touname:'sdszvc',
        ...this.fatherForm
      }).then(res => {
        this.replyVisible = false

        // let code = res.data.code
        // if (code == 200) {
        //   this.commentData = res.data.data.data
        //   console.log(this.commentData)
        // }
      })
    }

  }
}
</script>

<style scoped lang="scss">
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

.btn-control {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
.cancel {
  font-size: 16px;
  color:  #606266;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
     color: #333;
   }
  }
}
</style>
