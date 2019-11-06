<template>
  <div class="container">
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row class="long">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form :model="userInfo" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="编号">
              <el-input v-model="userInfo.id"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="userInfo.mobile"></el-input>
            </el-form-item>
            <el-form-item label="媒体名称" required>
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>

            <el-form-item label="媒体介绍">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="setUserinfo">立即创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="setImage"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import local from '@/utils/local'
import eventBus from '@/eventbus'
export default {
  data () {
    return {
      userInfo: {
        id: null,
        name: null,
        photo: null,
        intro: null,
        email: null,
        mobile: null
      }
    }
  },
  methods: {
    // 更换图片信息
    async setImage (result) {
      // 选择文件后触发当前函数，默认传入一个选择后的结果（包含文件信息）
      // 1. 获取图片文件数据
      const file = result.file
      // 2. 创建一个formData
      const formData = new FormData()
      // 3. 追加图片数据到fromData  字段名字和后台一致
      formData.append('photo', file)
      // 4. 使用axios提交数据
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // 5. 拿着上传成功后的地址进行预览
      this.userInfo.photo = data.photo
      // 6. 提示
      this.$message.success('修改头像成功')
      // 7. 更新home组件的photo
      eventBus.$emit('updatePhoto', data.photo)
      // 8. 更新本地存储的photo
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    },
    // 设置用户信息需要用到非父子之间的传值
    async setUserinfo () {
      await this.$http.patch('/user/profile', {
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email
      })
      // 提示用户

      // 此时需要做的操作就是实现飞父子之间的传值
      // 提示
      this.$message.success('保存用户信息成功')
      // 更新home
      eventBus.$emit('updateName', this.userInfo.name)
      // 更新本地存储
      const user = local.getUser()
      user.name = this.userInfo.name
      local.setUser(user)
    },
    // 获取用户信息
    async getUserinfo () {
      const { data: { data } } = await this.$http.get('/user/profile')
      this.userInfo = data
    }
  },
  // 进入页面时获取用户信息
  created () {
    this.getUserinfo()
  }
}
</script>

<style scoped lang='less'>
.long {
  margin-top: 20px;
}
</style>
