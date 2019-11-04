<template>
  <div class="container">
    <el-card>
      <my-bread>发表文章</my-bread>
      <el-form label-width="80px" size="small">
        <el-form-item label="标题">
          <el-input v-model="sizeForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor v-model="sizeForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="sizeForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <my-publish></my-publish>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="sizeForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="状态">
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      sizeForm: {
        title: '',
        conent: '',
        channel_id: null,
        cover: {
          type: 1
        }
      },
      // 富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image'],
            ['video']
          ]
        }
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
