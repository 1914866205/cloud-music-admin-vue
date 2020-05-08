import Vue from 'vue'
import VueRouter from 'vue-router'
// vuetufy提供的定位功能，回到上一个路由的时候可以定位到之前的位置
// import goTo from '../store/index.js'
import Layout from '../views/index/Layout.vue'
import Dashboard from '../views/index/Dashboard.vue'
import Auth from '../views/other/Auth.vue'

// import { getSupportInfo } from 'prettier'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/other/About.vue')
      },
      {
        path: '/music-list',
        name: 'MusicList',
        component: () => import('../views/music/MusicList.vue')
      },
      {
        path: '/music',
        name: 'Music',
        component: () => import('../views/music/Music.vue')
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import('../views/permission/Role.vue')
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('../views/permission/Menu.vue')
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/other/User.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
    // name: 'LoginPage',
    // component: () => import('../views/login/LoginPage.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: '/auth/usercard',
    children: [
      {
        path: '/auth/usercard',
        name: 'UserCard',
        component: () => import('../other/UserCard.vue')
      },
      {
        path: '/auth/followers',
        name: 'Followers',
        component: () => import('../other/Followers.vue')
      },
      {
        path: '/auth/following',
        name: 'Following',
        component: () => import('../other/Followings.vue')
      },
      {
        path: '/auth/repos',
        name: 'Repos',
        component: () => import('../other/Repos.vue')
      }
    ]
  }
]

const router = new VueRouter({
  // scrollBehavior: (to, from, savedPosition) => {
  //   let scrollTo = 0
  //   if (to.hash) {
  //     scrollTo = to.hash
  //   } else if (savedPosition) {
  //     scrollTo = savedPosition.y
  //   }
  //   return getSupportInfo(scrollTo)
  // },
  routes
})

export default router
