<template>
  <comment :comments="commentData"></comment>
</template>

<script>
  import * as CommentData from '../../components/mockdata'
  import comment from "@/components/comment";
  import {selectUserReply, addRootReply, addSonReply} from "@/api/reply";
  export default {
  name: "userComment",
  components: {
    comment
  },
  data() {
    return {
      commentData: []
    }
  },
  created() {
    this.commentData = CommentData.comment.data;
    console.log(this.commentData)
    this.getAllReply(1)
  },
  methods: {
    getAllReply(did) {
      did = 1
      selectUserReply(did).then(res => {
        let code =  res.data.code
        if (code == 200){
          this.commentData = res.data.data.data
          console.log(this.commentData)
          console.log(res.data.data)
        }
      })
    }
  },
}
</script>

<style scoped>

</style>
