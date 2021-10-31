<template>
  <div class="container">
<!--     父评论-->
    <div class="comment" v-for="(item, i) in comments" :key="i">
      <div class="info">
        <img class="avatar" :src="item.uavg" width="36" height="36"/>
        <div class="right">
          <div class="name">{{item.fromuname}}</div>
          <div class="date">{{item.rTime}}</div>
        </div>
      </div>
      <div class="content">{{item.rContents}}</div>

<!--      点赞和回复的按钮-->
      <div class="control">
<!--        <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">-->
<!--          <i class="iconfont icon-like"></i>-->
<!--          <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>-->
<!--        </span>-->
        <span class="comment-reply" @click="showCommentInput(item,i)">
          <i class="iconfont icon-comment"></i>
          <span>回复</span>
        </span>
      </div>

      <div class="reply">
        <div class="item" v-for="(replyVOS, j) in item.replyVOS" :key="j">
          <div class="reply-content">
            <span class="from-name">{{replyVOS.fromuname}}</span><span>: </span>
            <span class="to-name">@{{replyVOS.touname}}</span>
            <span>{{replyVOS.rContents}}</span>
          </div>
          <div class="reply-bottom">
            <span>{{replyVOS.rTime}}</span>
            <span class="reply-text" @click="showCommentInput(item,i, replyVOS)">
              <i class="iconfont icon-comment"></i>
              <span>回复</span>
            </span>
          </div>
        </div>

        <div class="write-reply" v-if="replyVOS.length > 0" @click="showCommentInput(item)">
<!--        <div class="write-reply" @click="showCommentInput(item)">-->
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div class="input-wrapper" v-if="showItemId === item.touid && showIndex===i">
<!--          <div class="input-wrapper" v-if="showInput">-->
            <el-input class="gray-bg-input"
                      v-model="sonForm.rContents"
                      type="textarea"
                      :rows="3"
                      autofocus
                      placeholder="写下你的评论">
            </el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {comment} from "@/components/mockdata";
import {addSonReply} from "@/api/reply";

export default {
  props: {
    comments: {
      type: Array,
      required: true,
      default: () => {
        return {
          comments: {},
        }
      },
    },
    fatherForm:{
      type: Object,
      required: true
    }
  },
  components: {},
  data() {
    return {
      inputComment: '',
      showItemId: '',
      replyVOS:[],
      showInput: false,
      showIndex:-1,
      sonForm:{
        did:2,
        fid:1,
        touid:null,
        rContents:''
      },
      admin:{},
    }
  },
  computed: {},
  methods: {
     // 点赞
    // likeClick(item) {
    //   if (item.isLike === null) {
    //     Vue.$set(item, "isLike", true);
    //     item.likeNum++
    //   } else {
    //     if (item.isLike) {
    //       item.likeNum--
    //     } else {
    //       item.likeNum++
    //     }
    //     item.isLike = !item.isLike;
    //   }
    // },

    // 点击取消按钮
    cancel() {
      this.showItemId = ''
    },

    getUserInfo() {
      this.admin = JSON.parse(localStorage.getItem('suser'))
    },

    // 提交评论
    commitComment() {
      // 子评论
      addSonReply({
        rid:null,
        fromuid:this.admin.id,
        ...this.sonForm
      }).then(res => {
        this.cancel();
        // let code = res.data.code
        if (res.data.code == 200) {
          // this.commentData = res.data.data.data
          this.$message({ showClose: true, message: '发布成功！', type: 'success'});
        }
      })
      console.log(this.inputComment);
    },

    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * replyVOS: 当前回复的评论
     */
    showCommentInput(item, index,replyVOS) {
      console.log(item, index,replyVOS)
      this.sonForm.rContents = ''
      this.showIndex = index;
      this.sonForm.fid = replyVOS?replyVOS.fid:item.rid;
      this.sonForm.touid = replyVOS?replyVOS.fromuid:item.fromuid;
      this.showItemId = item.touid;
    },

  },
  created() {
    // console.log(this.comment)
    this.getUserInfo()
    // this.getAllReply(1)
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 0 10px;
  box-sizing: border-box;
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid #F2F6FC;
    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 16px;
          color: #303133;
          margin-bottom: 5px;
          font-weight: 500;
      }
        .date {
          font-size: 12px;
          color: #909399;
      }
    }
  }
    .content {
      font-size: 16px;
      color: #303133;
      line-height: 20px;
      padding: 10px 0;
  }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #909399;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active, &:hover {
          color: #409EFF;
      }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
      }
    }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: #333;
      }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
      }
    }

  }
    .reply {
      margin: 10px 0;
      border-left: 2px solid #DCDFE6;
      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed #EBEEF5;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #303133;
          .from-name {
            color: #409EFF;
        }
          .to-name {
            color: #409EFF;
            margin-left: 5px;
            margin-right: 5px;
        }
      }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: #909399;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: #333;
          }
            .icon-comment {
              margin-right: 5px;
          }
        }
      }
    }
      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #909399;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: #303133;
      }
        .el-icon-edit {
          margin-right: 5px;
      }
    }
      .fade-enter-active, fade-leave-active {
        transition: opacity 0.5s;
    }
      .fade-enter, .fade-leave-to {
        opacity: 0;
    }
      .input-wrapper {
        padding: 10px;
        .gray-bg-input, .el-input__inner {
        /*background-color: #67C23A;*/
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
          .confirm {
            font-size: 16px;
        }
      }
    }
  }
}
}
</style>
