import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //取出localStorge存放的token
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
    menuList: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      {
        title: '音乐管理',
        icon: 'mdi-music',
        url: '',
        subMenus: [
          {
            title: '歌单管理',
            icon: 'mdi-domain',
            url: '/music-list',
            permission: []
          },
          {
            title: '歌曲管理',
            icon: 'mdi-text',
            url: '/music',
            permissions: ['music:add', 'music:edit', 'music:delete']
          }
        ]
      }
    ],
    menuList1: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
      {
        title: '音乐管理',
        icon: 'mdi-music',
        url: '',
        subMenus: [
          {
            title: '歌单管理',
            icon: 'mdi-domain',
            url: '/music-list',
            permission: []
          },
          {
            title: '歌曲管理',
            icon: 'mdi-text',
            url: '/music',
            permissions: ['music:add', 'music:edit']
          }
        ]
      },
      {
        title: '权限管理',
        icon: 'mdi-music',
        url: '',
        subMenus: [
          {
            title: '角色管理',
            icon: 'mdi-domain',
            usr: '/role',
            permissions: ['role:add', 'role:delete']
          },
          {
            title: '菜单管理',
            icon: 'mdi-text',
            url: '/menu',
            permissions: ['menu:add', 'menu:edit', 'menu:delete']
          }
        ]
      },
      {
        title: 'About',
        icon: 'mdi-help-box',
        url: '/about',
        subMenus: []
      }
    ]
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
  mutations: {
    setToken(state, data) {
      state.token = data
    },
    setUser(state, data) {
      state.user = data
    },
    setMenuList(state, menuList) {
      state.menuList = menuList
    }
  },
  actions: {}
})

export default store
