<template>
  <div>
<!--    <p>我的打卡页面</p>-->
<!--    <el-row>-->
<!--      <el-col :span="12">-->
        <div class="grid-content bg-purple">
          <el-select v-model="value" clearable placeholder="请选择打卡类型">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
<!--      </el-col>-->
<!--      <el-col :span="12">-->
        <div class="grid-content bg-purple-light">

          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
            <span>想上传图片？</span>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
<!--      </el-col>-->
<!--    </el-row>-->

    <el-input
        type="textarea"
        :rows="15"
        placeholder="请输入内容"
        v-model="textarea">
    </el-input>

    <el-button type="primary">今日打卡发射─=≡Σ((( つ•̀ 3 •́)つDash☆</el-button>

  </div>
</template>

<script>
export default {
  name: "writeBlog",
  data() {
    return {
      options: [{
        value: '1',
        label: '早起'
      }, {
        value: '2',
        label: '学习'
      }, {
        value: '3',
        label: '早睡'
      }, {
        value: '4',
        label: '运动'
      }, {
        value: '5',
        label: '读书'
      }],
      value: '',
      textarea: '',
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},]
    }
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<style scoped>

</style>
