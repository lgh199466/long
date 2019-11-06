
<template>
  <div class="container-article">
    <!-- 头部信息 -->
    <el-card>
      <my-bread>内容管理</my-bread>
      <el-form ref="form" :model="sizeForm" label-width="80px" size="small">
        <el-form-item label="状态: ">
          <el-radio-group v-model="sizeForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道: ">
          <!-- <el-select v-model="sizeForm.channel_id" placeholder="请选择频道">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item,id) in channelData"
              :key="id"
            ></el-option>
          </el-select>-->
          <my-channel v-model="sizeForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期: ">
          <el-date-picker
            @change="getTime"
            v-model="dataArry"
            type="daterange"
            range-separator="至"
            begin_pubdate="开始日期"
            end_pubdate="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="getMessage">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card>
      <div slot="header">
        <span>总文章信息数为{{ total}}条</span>
      </div>

      <el-table :data="tableData" style="width: 100%;
  color: blue;font-weight:700">
        <el-table-column label="封面" width="200">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0] " style="width:150px;height:100px">
              <div slot="error" class="image-slot">
                <img src="../../assets/timg.jpg" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="200" prop="title"></el-table-column>
        <el-table-column label="状态" width="200">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1" tyle="approval">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="200" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete( scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <div class="page">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="sizeForm.per_page"
          :current-page="sizeForm.page"
          prev-text="上一页"
          next-text="下一页"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sizeForm: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        nullend_pubdate: null,
        page: 1,
        per_page: 20
      },
      channelData: [],
      dataArry: [],
      tableData: [],
      total: 0
    }
  },
  methods: {
    // 获取时间
    getTime (dateArry) {
      if (dateArry) {
        this.sizeForm.begin_pubdate = dateArry[0]
        this.sizeForm.end_pubdate = dateArry[1]
      } else {
        this.sizeForm.begin_pubdate = null
        this.sizeForm.end_pubdate = null
      }
    },
    // 获取文章列表
    async getAticle () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.sizeForm })
      // 后天数据赋值给tableData 进行行渲染
      this.tableData = data.results
      console.log(data.results)
      //  总条数赋值
      this.total = data.total_count
    },
    //  获取筛选列表
    async getList () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelData = data.channels

      //       [[PromiseValue]]: Object
      // config: {url: "http://ttapi.research.itcast.cn/mp/v1_0/channels", method: "get", headers: {…}, baseURL: "http://ttapi.research.itcast.cn/mp/v1_0/", transformRequest: Array(1), …}
      // data:
      // data:
      // channels: Array(26)
      // 0: {id: 2, name: "开发者资讯"}
      // 1: {id: 3, name: "ios"}
      // 2: {id: 4, name: "c++"}
      // 3: {id: 5, name: "android"}

      // length: 26
      // __proto__: Array(0)
      // __proto__: Object
      // message: "OK"
      // __proto__: Object
      // headers: {content-length: "955", content-type: "application/json"}
      // request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
    }, // 点击筛选按钮所做的操作,
    getMessage () {
      // 解决频道空字符船问题                  将频道Id赋值为空 就是不会提交数据给后台
      // 在进行筛选问题时 日期格式不对会造成status无效的问题

      if (this.sizeForm.channel_id === '') this.sizeForm.channel_id = null
      // 让 筛选后起s始页为第一页
      this.sizeForm.page = 1
      this.getAticle()
    },
    // 当页数改变时触发
    pageChange (pager) {
      this.sizeForm.page = pager
      this.getAticle()
    },
    // 删除文章内容
    async handleDelete (id) {
      if (confirm('是否删除')) {
        await this.$http.delete(`/articles/${id}`)
      }
      this.$message.success('删除成功')
      this.getAticle()
    },
    // 编辑文章
    handleEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    }
  },

  created () {
    this.getAticle()
    this.getList()
  }
}
</script>

<style scoped lang='less'>
.el-card {
  position: relative;
}
.page {
  width: 100%;
  margin-top: 20px;
  position: absolute;
  left: 37%;
  bottom: 0;
}
</style>
