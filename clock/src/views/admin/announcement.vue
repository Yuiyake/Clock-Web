<template>
  <div>
    <el-card style="height: 610px;">
      <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption"></quill-editor>
    </el-card>
    <el-button type="primary" @click="pushAnno(editorOption)">发布</el-button>
  </div>
</template>

<script>
import {
  quillEditor
} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: "announcement",
  components: {
    quillEditor
  },
  data() {
    return {
      content: null,
      editorOption: {}
    }
  },
  methods: {
    pushAnno(editorOption) {
      this.$message({ showClose: true, message: '发布成功!', type: 'success'});
    },
  }
}
</script>

<style scoped>

</style>
