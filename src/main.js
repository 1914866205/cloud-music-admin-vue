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
import global_ from '@/util/Global'
import 'material-design-icons-iconfont/dist/material-design-icons.css' //引入图标

//引入localforage
// npm intall --save localforage vlf
// import Vlf from 'vlf'
// import localforage from 'localforage'
// Vue.use(Vlf, localforage)

Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)

// import 'at-ui-style/src/index.scss'      // 或者引入未构建版本的 scss 样式

Vue.use(AtComponents)
Vue.use(MuseUI)
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_

// // 钩子函数,全局钩子
// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token')
//   let isLogin
//   if (token) {
//     isLogin = true
//   } else {
//     isLogin = false
//   }
//   //true:有token
//   //false:无token
//   if (isLogin) {
//     //如果是去登录页
//     if (to.path === '/login') {
//       //就放行
//       return next({ path: '/' })
//     }
//     //如果不是去登录页，也放行
//     next()
//   } else {
//     //如果不是去登录页
//     if (to.path !== '/login') {
//       if (to.path == '/auth') {
//         return next()
//       }
//       //就跳到登录页
//       return next({ path: '/login' })
//     } else {
//       //如果是去登录页
//       //就放行
//       next()
//     }
//   }
// })

// //全局请求拦截
// axios.interceptors.request.use((config) => {
//   //请求的接口不是登录和验证码的接口
//   if (['/sysAdmin/login', '/captcha'].indexOf(config.url) === -1) {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = token
//     }
//   }
//   return config
// })

// var worker = new Worker('src/main.js')

// //postMessage(msg);
// //postMessage方法把在新线程执行的结果发送到浏览器的js引擎线程里
// worker.onmessage = function() {
//   alert('开始刷新token')
//   //获取在新线程中执行的js文件发送的数据 用event.data接收数据
//   this.$axios({
//     method: 'post',
//     // url: 'http://localhost:8080/tokenFlush',
//     url: this.GLOBAL.baseUrl + '/tokenFlush',
//     data: {
//       token: this.$store.token
//     }
//   }).then((res) => {
//     //存token
//     localStorage.setItem('token', res.data.token)
//     this.$store.commit('setToken', res.data.token)
//   })
// }
// setTimeout(function() {
//   worker.terminate()
//   //terminate方法用于关闭worker线程
// }, 5 * 50 * 1000)

// setTimeout(function() {
//   worker = new Worker('src/main.js')
//   //再次开启worker线程
// }, 5 * 60 * 1000)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
