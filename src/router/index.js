import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import welcome from '@/views/welcome'
import home from '@/views/Home'
import error from '@/views/404'
import local from '@/utils/local'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: home,
    children: [{
      path: '/',
      component: welcome
    }]
  },
  {
    path: '*',
    component: error

  }
  ]
})

// 前置导航路由守卫 用户每次点击不同页面时 会发生判断 如果不是登录状态会返回登录页面
router.beforeEach((to, from, next) => {
  // to 跳转目标路由对象
  // from 从哪里跳过来的路由对象
  // next() 放行  next('/login') 拦截到登录
  // next()
  // 如果你访问的不是登录页面，且又没有登录，跳转到登录页面。
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  console.log(123)
  next()
})
export default router
