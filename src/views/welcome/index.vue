<template>
  <div>
    <el-carousel :interval="5000" arrow="always" height="600px">
      <el-carousel-item v-for="item in 4" :key="item">
        <p></p>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// import echarts from 'echarts'
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
  // mounted () {
  //   var myChart = echarts.init(this.$ref.abc)
  //   var img = new Image()
  //   var canvas = document.createElement('canvas')
  //   var ctx = canvas.getContext('2d')

  //   img.onload = function () {
  //     var width = canvas.width = img.width
  //     var height = canvas.height = img.height
  //     ctx.drawImage(img, 0, 0, width, height)
  //     var imgData = ctx.getImageData(0, 0, width, height)

  //     var data = []
  //     for (var i = 0; i < imgData.data.length / 4; i++) {
  //       var r = imgData.data[i * 4]
  //       var g = imgData.data[i * 4 + 1]
  //       var b = imgData.data[i * 4 + 2]

  //       var lum = 255 - (0.2125 * r + 0.7154 * g + 0.0721 * b)
  //       lum = (lum - 125) / 10 + 50
  //       data.push([i % width, height - Math.floor(i / width), lum])
  //     }

  //     myChart.setOption(option = {
  //       tooltip: {},
  //       backgroundColor: '#fff',
  //       xAxis3D: {
  //         type: 'value'
  //       },
  //       yAxis3D: {
  //         type: 'value'
  //       },
  //       zAxis3D: {
  //         type: 'value',
  //         min: 0,
  //         max: 100
  //       },
  //       grid3D: {
  //         axisPointer: {
  //           show: false
  //         },
  //         viewControl: {
  //           distance: 100
  //         },
  //         postEffect: {
  //           enable: true
  //         },
  //         light: {
  //           main: {
  //             shadow: true,
  //             intensity: 2
  //           },
  //           ambientCubemap: {
  //             texture: ROOT_PATH + 'data-gl/asset/canyon.hdr',
  //             exposure: 2,
  //             diffuseIntensity: 0.2,
  //             specularIntensity: 1
  //           }
  //         }
  //       },
  //       series: [{
  //         type: 'surface',
  //         silent: true,
  //         wireframe: {
  //           show: false
  //         },
  //         itemStyle: {
  //           color: function (params) {
  //             var i = params.dataIndex
  //             var r = imgData.data[i * 4]
  //             var g = imgData.data[i * 4 + 1]
  //             var b = imgData.data[i * 4 + 2]
  //             return 'rgb(' + [r, g, b].join(',') + ')'
  //           }
  //         },
  //         data: data
  //       }]
  //     })
  //   }

  //   img.src = '../../assets/1.jpg'
  // }
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
