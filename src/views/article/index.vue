
<template>
  <div class="container-article">
    <el-card>
      <my-bread>内容管理</my-bread>
      <el-form ref="form" :model="sizeForm" label-width="80px" size="small">
        <el-form-item label="状态: ">
          <el-radio-group v-model="sizeForm.radio">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="1">草稿</el-radio>
            <el-radio :label="2">待审核</el-radio>
            <el-radio :label="3">审核通过</el-radio>
            <el-radio :label="4">审核失败</el-radio>
            <el-radio :label="0">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道: ">
          <el-select v-model="sizeForm.region" placeholder="请选择频道">
            <el-option
              :label="item.lable"
              :value="item.value"
              v-for="(item,value) in  channelData"
              :key="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期: ">
          <el-date-picker
            v-model="dataArry"
            type="daterange"
            range-separator="至"
            start_placeholder="开始日期"
            end_placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sizeForm: {
        radio: null,
        region: '',

        channel_id: null,
        start_placeholder: null,
        end_placeholder: null
      },
      channelData: [
        { lable: '九龙冰室', value: 1 },
        { lable: '雄霸天下', value: 2 }
      ],
      dataArry: []
    }
  }
}
</script>

<style scoped lang='less'></style>
