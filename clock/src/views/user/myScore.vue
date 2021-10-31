<template>
  <div>
<!--    <p>我的积分页面</p>-->
    <el-container>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card style="height: 500px">
            <p style="font-size: large">已经坚持打卡<span style="font-size: 60px; color: #42b983">{{scoreInfo[0].isclock == '1'? scoreInfo[0].clockday+1:scoreInfo[0].clockday}}</span>天啦</p>
            <p style="font-size: large">当前的积分是：{{scoreInfo[0].score}}</p>
            <p style="font-size: large">今天打卡状态：{{scoreInfo[0].isclock == '1'? '已打卡':'未打卡'}}</p>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <el-card>
            <p style="color: #409EFF; font-size: large">如何获得积分？</p>
            <p>积分是通过每日打卡和小组打卡获取的<br>每日打卡可获基础积分10分，连续15天以上打卡可获积分15分，而小组打卡每日固定获取15分哦</p>
          </el-card>
          <p></p>
          <el-card>
            <p style="color: #409EFF; font-size: large">积分的计算规则？</p>
            <p>获取积分在上面的积分获取已经说明了，另外补签一天花费50积分，创建一个小组花费100积分，让一个星星闪耀要1000积分</p>
          </el-card>
          <p></p>
          <el-card>
            <p style="color: #409EFF; font-size: large">积分有什么用？</p>
            <p>积分可以用来创建监督小组，补签，和累积属于自己的小星星</p>
          </el-card>
        </div>
      </el-col>
    </el-row>
    </el-container>
  </div>
</template>

<script>
import {selectAllScore, selectUserScore, userDaka} from "@/api/score"
export default {
  name: "myScore",
  data() {
    return{
      clockday: '6',
      score:'700',
      scoreInfo: [{
        isclock: '',
        score:'',
        clockday: ''
      }],
      admin:{},
    }
  },
  created() {
    this.getUserInfo()
    this.getUserScore()
  },
  methods: {
    getUserScore() {
      selectUserScore(this.admin.id).then(res => {
        let code = res.data.code
        if (code == 200) {
          // this.$message({ showClose: true, message: '成功!', type: 'success'});
          this.scoreInfo = res.data.data
          console.log(this.scoreInfo)
        }else {
          this.$message({ showClose: true, message: res.data.message, type: 'error'});
        }
      })
    },
    // 获取信息
    getUserInfo() {
      this.admin = JSON.parse(localStorage.getItem('suser'))
      // console.log(this.admin.id)
    },
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

