import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //取出localStorge存放的token
    token: localStorage.getItem('token'),
    roleId: localStorage.getItem('roleId'),
    userIp: localStorage.getItem('userIp'),
    gitHubMap: localStorage.getItem('gitHubMap'),
    admin: JSON.parse(localStorage.getItem('admin')),
    //按钮权限
    menuList: JSON.parse(localStorage.getItem('menuList'))
  },

  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
  mutations: {
    setToken(state, data) {
      state.token = data
    },
    setAdmin(state, data) {
      state.admin = data
    },
    setMenuList(state, menuList) {
      state.menuList = menuList
    },
    setRoleId(state, data) {
      state.roleId = data
    },
    setUserIp(state, data) {
      state.userIp = data
    },
    setGitHubMap(state, data) {
      state.gitHubMap = data
    }
  },
  actions: {}
})

export default store
