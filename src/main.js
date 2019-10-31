import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import router from '@/router'
import axios from '@/api'
import plugin from '@/components'
//  导入路由 导入一个文件时会默认去寻找索引文件 基于webpack
//  @是一个别名  是一个绝对路径 是指./src
Vue.prototype.$http = axios
// 挂载自己封装的组件
Vue.use(plugin)
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
