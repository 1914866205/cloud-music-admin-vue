import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(Router)

//所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      }
    ]
  }
]

//实例化vue的时候只挂载constantRouter
export default new Router({
  routes: constantRouterMap
})

//异步挂载的路由
//动态根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    name: '权限管理',
    meta: { role: ['admin'] }, //页面需要的权限
    children: [
      {
        path: 'role',
        component: () => import('../views/Role.vue'),
        name: '角色管理',
        meta: { role: ['admin'] }
      },
      {
        path: 'menu',
        component: () => import('../views/Menu.vue'),
        name: '菜单管理',
        meta: { role: ['admin'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    name: '音乐管理',
    meta: { role: ['admin', 'editor'] }, //页面需要的权限
    children: [
      {
        path: 'music-list',
        component: () => import('../views/MusicList.vue'),
        name: '歌单管理',
        meta: { role: ['admin', 'editor'] }
      },
      {
        path: 'music',
        component: () => import('../views/Music.vue'),
        name: '歌曲管理',
        meta: { role: ['admin', 'editor'] }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
