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
          <div v-if="sizeForm.cover.type===1">
            <my-publish v-model="sizeForm.cover.images[0]"></my-publish>
          </div>
          <div v-if="sizeForm.cover.type===3">
            <my-publish v-for="i in 3" :key="i" v-model="sizeForm.cover.images[i-1]"></my-publish>
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="sizeForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 通过地址栏中是否携带id来判断是否显示修改或发表 -->
        <el-form-item label="状态" v-if="this.$route.query.id">
          <el-button type="primary" @click="upData(false)">修改</el-button>
          <el-button @click="upData(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item label="状态" v-else>
          <el-button type="primary" @click="creat(false)">发表</el-button>
          <el-button @click="creat(true)">存入草稿</el-button>
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
        title: null,
        content: null,
        channel_id: null,

        cover: {
          type: 1,
          images: []

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
  },
  // 事件监听器  通过监听地址的变化 来判断是编辑还是 发布
  watch: {
    '$route.query.id': function (newUrl, oldUrl) {
      if (newUrl) {
        this.getArticle(newUrl)
      } else {
        this.sizeForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []

          }
        }
      }
    } },
  // 判断地址栏中是否携带id 也就是是否通过点击编辑跳到发布文章页面
  created () {
    const articleID = this.$route.query.id
    if (articleID) {
      this.getArticle(articleID)
    }
  },
  methods: {
    // 获取文章信息
    async getArticle (id) {
      const { data: { data } } = await this.$http.get(`/articles/${id}`)
      this.sizeForm = data
      console.log(this.sizeForm)
    },
    // 发布文章
    async creat (draft) {
      await this.$http.post(`/articles?draft=${draft}`, this.sizeForm)
      this.$message.success(draft ? '存入草稿成功' : '发表文章成功')
      this.$router.push('/article')
    },
    // 修改文章
    async upData (draft) {
      await this.$http.put(`/articles/${this.sizeForm.id}?draft=${draft}`, this.sizeForm)
      this.$message.success(draft ? '存入草稿成功' : '发表文章成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'></style>
