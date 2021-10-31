<template>
  <div class="block">
    <h4>你好，{{admin.username}}, id: {{admin.id}}</h4>
    <el-timeline>
      <el-timeline-item :timestamp=dData.dtime placement="top" v-for="(dData, index) in dynamicData" :key="index">
        <el-card>
          <h4>更新 {{ dData.tname }} 打卡</h4>
          <p>{{dData.username}} 提交于 {{ dData.dtime }}</p>
          <img :src="dData.dimg" v-if="dData.dimg == ''? '':dData.dimg" style="width: 300px; height: 300px"/>
          <p>{{dData.dconcern}}</p>
          <el-button v-if="!dData.showFlag" type="text" @click="isShow(dData,index)">查看</el-button>
          <template v-else>
            <el-button type="text" @click="showReply(dData)">回复</el-button>
            <transition name="fade" v-if="replyVisible">
              <div class="input-wrapper">
                <el-input class="gray-bg-input"
                          v-model="fatherForm.rContents"
                          type="textarea"
                          :rows="3"
                          autofocus
                          placeholder="写下你的评论">
                </el-input>
                <div class="btn-control">
                  <span class="cancel" @click="replyVisible=false">取消</span>
                  <el-button class="btn" type="success" round @click="commitComment(dData.did)">确定</el-button>
                </div>
              </div>
            </transition>
            <comment :comments="commentData" :fatherForm="fatherForm"></comment>
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
      CommentData:{},
      showFlag:false, // 是否查看评论
      fatherForm:{
        // 这里的1只是给一个值让他可以get到，不然会报错，至于这个did真正的值，会在isShow()方法的时候被修改。
        did:1,
        rContents:''
      },
      typeId:[
        {
          value:1,
          label: "早起"
        },
        {
          value:2,
          label: "学习"
        },
        {
          value:3,
          label: "早睡"
        },
        {
          value:4,
          label: "运动"
        },
        {
          value:5,
          label: "读书"
        },
        {
          value:7,
          label: "禁x"
        },
      ],

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
      selectThisDynamic(this.dynamicData.uid).then(res => {
        let code = res.data.code
        if (code == 200) {
          this.dynamicData = res.data.data.map(item=>{
            item.showFlag = false;
            return item;
          })
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
      // let d = 0
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
            this.replyVisible = false
            // console.log(res.data.data)
            // console.log(this.commentData[0].replyVOS)
            // console.log(this.commentData[0].did)
          }
        })
      // }
    },
    commitComment(did){
    //  父评论
      let replyFid = this.admin.id
      let Fdid = this.fatherForm.did
      console.log("fid:"+Fdid)
      console.log(this.dynamicData.did)
      addRootReply({
        rid:null,
        fid:null,
        fromuid:replyFid,
        touid:replyFid,
        ...this.fatherForm
      }).then(res => {
        this.replyVisible = false
        let code = res.data.code
        if (code == 200) {
          this.$message({ showClose: true, message: '发布成功！', type: 'success'});
          // this.selectUserReply(Fdid)
          // this.commentData = res.data.data.data
          // console.log(this.commentData)
        }
      })
          // this.$router.push('/groupSquare')
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
