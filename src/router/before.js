import router from '@/router/router'
import store from '@/store'

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some((m) => m.meta.requireAuth)) { // 判断是否需要登录的配置参数
    store.dispatch('getUserInfo').then(() => { // 如果需要登录，先获取存在store里的用户信息
      if (!store.getters.isLogin) {
        // 没有登录
        next({
          path: '/login',
          query: { Rurl: to.fullPath }  //  将to参数中的url传递给login页面进行操作
        })
      } else {
        // 已登录
        next() // 正常跳转到你设置好的页面
      }
    })
  } else {
    next() // 正常跳转到你设置好的页面
    // 调用获取用户登录状态和信息的接口，以便显示顶部导航栏的用户登录信息
    store.dispatch('getUserInfo')
  }
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 路由发生变化修改页面meta
  if (to.meta.content) {
    let head = document.getElementsByTagName('head')
    let meta = document.createElement('meta')
    document.querySelector('meta[name="description"]').setAttribute('content', to.meta.content.description)
    meta.content = to.meta.content
    head[0].appendChild(meta)
  }
})
