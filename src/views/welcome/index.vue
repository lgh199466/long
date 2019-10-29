<template>
  <el-carousel :interval="5000" arrow="always" height="600px">
    <el-carousel-item v-for="item in 4" :key="item">
      <p></p>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  created () {
    this.$http
      .get('articles')
      .then(res => {
        console.log(res.data)
      })
      .catch(() => {
        console.log('error')
      })
  }
}
</script>

<style scoped lang='less'>
.el-carousel__item {
  float: left;
  margin: 0;
  padding: 0;
}
.el-carousel__item p {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(-2n + 1) {
  background: url("../../assets/1.jpg") no-repeat center/cover;
}
.el-carousel__item:nth-child(2n + 1) {
  background: url("../../assets/1.jpg") no-repeat center/cover;
}
.el-carousel__item:nth-child(3n) {
  background: url("../../assets/3.jpg") no-repeat center/cover;
}
.el-carousel__item:nth-child(4n) {
  background: url("../../assets/4.jpg") no-repeat center/cover;
}
</style>
