<template>
  <div class="container">
    <div slot="header">
      <my-bread>粉丝管理</my-bread>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="粉丝管理" name="first">
        <div class="fans_img" v-for="item in  comments" :key="item.id.toString()">
          <el-avatar :size="80" :src="item.photo"></el-avatar>
          <p>{{item.name}}</p>
          <el-button type="success" size="small">+关注</el-button>
        </div>
        <!-- 分页功能 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total=" total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pageChange"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="数据分析" name="second">
        <div ref="dom" style="width: 600px;height:400px;"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'first',
      comments: [],
      reqParams: {
        page: 1,
        per_page: 21
      },
      // 总条数
      total: 0
    }
  },
  methods: {
    // 分页功能
    pageChange (pager) {
      console.log(123456)
      this.reqParams.page = pager
      this.getFans()
    },
    // 获取文章信息
    async getFans () {
      const { data: { data } } = await this.$http.get('/followers', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    // 使用echarts首先需要获取 动漫实例
    const dom = this.$refs.dom
    const myEcharts = echarts.init(dom)
    // 准备 配置项和数据
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myEcharts.setOption(option)
  }
}
</script>

<style scoped lang='less'>
.fans_img {
  width: 130px;
  height: 180px;
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  text-align: center;
  border: 1px dashed white;
  display: inline-block;
}
</style>
