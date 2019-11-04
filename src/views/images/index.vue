<template>
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <!-- 按钮区域 -->
    <div>
      <el-radio-group v-model="myMessage.collect" size="small" @change="togollist">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="button" @click="open" size="small" style="float:right;">
        上传素材
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </div>
    <!-- 素材区域 -->
    <div class="material" v-for="item in  images" :key="item.id">
      <img :src="item.url" alt />
      <div class="icon" v-show="!myMessage.collect">
        <span @click="toggleStatus(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
        <span class="el-icon-delete" @click="deleteImage(item.id) "></span>
      </div>
    </div>
    <!-- 分页功能 -->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size=" myMessage.per_page"
      :current-page=" myMessage.page"
      @current-change="getPage"
    ></el-pagination>
    <!-- 上传素材 -->
    <el-dialog title="请选择上传文件" :visible.sync="dialogVisible" width="30%">
      <el-upload
        name="image"
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="headers"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      myMessage: {
        collect: true,
        per_page: 10,
        page: 1
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getMaterial()
  },
  methods: {
    // 上传图片对话框内容清空
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    // 上传素材信息
    // 上传图片成功
    handleSuccess (res) {
      // res 就是响应主体  res.data.url 就是图片地址
      // 预览
      this.imageUrl = res.data.url
      // 提示
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 关闭
        this.dialogVisible = false
        // 更新列表
        this.getMaterial()
      }, 5000)
    },

    // 获取图片信息
    async getMaterial () {
      const {
        data: { data }
      } = await this.$http.get('/user/images', { params: this.myMessage })
      this.images = data.results
      this.total = data.total_count
    },
    // 分页功能
    getPage (pager) {
      this.myMessage.page = pager
      this.getMaterial()
    },
    // 切换收藏与全部
    togollist () {
      this.myMessage.page = 1
      this.getMaterial()
    },
    // 切换  添加收藏 取消收藏
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
        // console.log(this.myMessage.collect)
      })
      // 成功（改当前图片的状态，提示）
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 删除
    deleteImage (id) {
      // 显示确认框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击了确认
          // 1. 发请求
          await this.$http.delete(`user/images/${id}`)
          // 2. 提示
          this.$message.success('删除成功')
          // 3. 更新列表
          this.getMaterial()
        })
        .catch(() => {
          // 点击了取消
          this.$message.success('取消成功')
        })
    }
  }
}
</script>

<style scoped lang='less'>
.material {
  width: 180px;
  height: 180px;
  position: relative;
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  border: 2px dashed deeppink;
  img {
    width: 100%;
    height: 100%;
  }
  .icon {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    bottom: 0;
    color: antiquewhite;
    text-align: center;

    span {
      margin: 0 20px;
      &.red {
        color: red;
      }
    }
  }
}
</style>
