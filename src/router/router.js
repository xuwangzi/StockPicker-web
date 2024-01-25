import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'Stock' }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      meta: { title: '登录 - StockPicker' }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
      meta: { title: '注册 - StockPicker' }
    },
    {
      path: '/stock',
      name: 'Stock',
      component: () => import(/* webpackChunkName: "stock_list" */ '@/views/Stock/StockList.vue'),
      meta: {
        requireAuth: true, // 该路由地址是否需要登录的参数配置
        title: '股市行情 - StockPicker',
        content: {
          description:
            '基于Springboot + Vue CLI@3 框架开发的股票分析系统，包含数据爬取，指标计算，数据分析，数据展示，复盘回顾，数据预测等功能'
        }
      }
    },
    {
      path: '/stock/StockPicker',
      name: 'StockPicker',
      component: () => import(/* webpackChunkName: "stock_picker" */ '@/views/Stock/StockPicker.vue'),
      meta: { title: '优股智选 - StockPicker' }
    },
    {
      path: '/stock/detail/:stockNum', // 定义了该路由的路径
      name: 'StockDetail', // 为该路由设置了一个名字，在代码中引用这个路由。
      component: () => import(/* webpackChunkName: "stock_detail" */ '@/views/Stock/StockDetail.vue'),
      // component 定义了当这个路由被访问时应该加载和渲染的组件。
      // 这里使用了动态导入（dynamic import）和 Webpack 的特性。
      // () => import(...) 是一个返回Promise的函数，该Promise解析为导入的模块。这意味着StockDetail.vue 组件只有在需要时才会被加载，有助于优化性能。
      // /* webpackChunkName: "stock_detail" */ 是Webpack的注释，指定了动态导入的代码块（chunk）的名称为 "stock_detail"。
      meta: { title: '股票详情 - StockPicker' }
    },
    {
      path: '*',
      name: 'Error_404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/ErrorPage/404.vue'),
      meta: { title: '404 - StockPicker' }
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

