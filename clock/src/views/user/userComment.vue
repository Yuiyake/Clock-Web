<template>
  <comment :comments="commentData"></comment>
</template>

<script>
  import * as CommentData from '../../components/mockdata'
  import comment from "@/components/comment";
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
  },
}
</script>

<style scoped>

</style>
