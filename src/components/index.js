import MyBread from '@/components/scope'
import Mychanle from '@/components/my-channle'
import Publish from '@/components/my-publish'
export default {
  install (Vue) {
    console.log(Vue)
    // 基于Vue做任何事情（注册全局组件，指令，过滤器，挂载原型函数）
    Vue.component(MyBread.name, MyBread)
    Vue.component(Mychanle.name, Mychanle)
    Vue.component(Publish.name, Publish)
  }
}
