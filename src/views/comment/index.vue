<template>
  <div class="container">
    <div slot="header">
      <my-bread>评论管理</my-bread>
    </div>
    <!-- 表格区域 -->
    <el-table :data="comments">
      <el-table-column fixed prop="title" label="标题" width="400"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{scope.row.comment_status ?'正常':'关闭'}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.comment_status"
            comment_status
            @click="handleClick(scope.row)"
            type="success"
            size="small"
          >打开评论</el-button>
          <el-button v-else type="danger" size="small" @click="handleClick(scope.row)">关闭评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total=" total"
      :page-size="reqParams.per_page"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 10
      },
      // 总条数
      total: 0
    }
  },
  methods: {
    // 点击打开评论和关闭评论时改变状态
    handleClick (row) {
      const status = row.comment_status ? '您确认关闭该文章的评论功能吗？如果关闭用户将不能对该文章进行评论' : '您确认打开评论功能吗？'
      this.$confirm(status, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定之后操作的步骤
        const { data: { data } } = await this.$http.put(`/comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
        this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
        // 更新当前文章的状态
        row.comment_status = data.allow_comment
      }).catch(() => {

      })
    },
    // 获取后台信息
    async getComment () {
      const { data: { data } } = await this.$http.get('/articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    // 分页功能
    pageChange (pager) {
      this.reqParams.page = pager
      this.getComment()
    }
  },
  created () {
    this.getComment()
  }

}
</script>

<style scoped lang='less'></style>
