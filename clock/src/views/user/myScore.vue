<template>
  <div>
    <p>我的积分页面</p>
    <p>已经坚持打卡{{scoreInfo[0].clockday}}天啦</p>
    <p>当前的积分是：{{scoreInfo[0].score}}</p>
    <p><u style="color: #409EFF">如何获得积分？积分的计算规则？积分有什么用？</u></p>
  </div>
</template>

<script>
import {selectAllScore, selectUserScore} from "@/api/score"
export default {
  name: "myScore",
  data() {
    return{
      clockday: '6',
      score:'700',
      scoreInfo: {},
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
          this.$message({ showClose: true, message: '成功!', type: 'success'});
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

<style scoped>

</style>
