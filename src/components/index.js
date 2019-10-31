import MyBread from '@/components/scope'
export default {
  install (Vue) {
    // 基于Vue做任何事情（注册全局组件，指令，过滤器，挂载原型函数）
    Vue.component(MyBread.name, MyBread)
  }
}
