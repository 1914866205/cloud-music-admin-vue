import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import AtComponents from 'at-ui'
import 'at-ui-style' // 引入组件样式
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios
Vue.use(VueAxios)
// Vue.use(axios)
// import 'at-ui-style/src/index.scss'      // 或者引入未构建版本的 scss 样式

Vue.use(AtComponents)
Vue.use(MuseUI)
Vue.config.productionTip = false

// 钩子函数,全局钩子
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  let isLogin
  // if (!token) {
  //   isLogin = false
  // } else {
  //   isLogin = true
  // }
  if (token) {
    isLogin = true
  } else {
    isLogin = false
  }

  // //true:有token
  // //false:无token
  // if (!isLogin) {
  //   //如果不是去登录页
  //   if (to.path !== '/login') {
  //     //就跳到登录页
  //     return next({ path: '/login' })
  //   } else {
  //     //如果是去登录页
  //     //就放行
  //     next()
  //   }
  // } else {
  //   //如果是去登录页
  //   if (to.path === '/login') {
  //     //就放行
  //     return next({ path: '/' })
  //   }
  //   next()
  // }

  //true:有token
  //false:无token
  if (isLogin) {
    //如果是去登录页
    if (to.path === '/login') {
      //就放行
      return next({ path: '/' })
    }
    //如果不是去登录页，也放行
    next()
  } else {
    //如果不是去登录页
    if (to.path !== '/login') {
      //就跳到登录页
      return next({ path: '/login' })
    } else {
      //如果是去登录页
      //就放行
      next()
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
