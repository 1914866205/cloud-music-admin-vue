<template>
  <div>
    <v-card class="header">
      <v-app-bar
        fixed=""
        color="#fcb69f"
        dark
        shrink-on-scroll
        src="https://picsum.photos/1920/1080?random"
        scroll-target="#scrolling-techniques-2"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
          ></v-img>
        </template>
        <div
          class="cloud-title"
          style="margin-left: 70px"
        >
          云音乐后台管理
        </div>
        <v-btn
          icon
          @click="logout()"
        >
          <v-card-text>退出</v-card-text>
        </v-btn>
        <v-btn
          icon
          @click="show=!show"
          style="position:absolute;top:530px;right:50px"
        >
          <v-card-text>{{ this.show ? '关闭' : '开启' }}</v-card-text>
        </v-btn>
      </v-app-bar>
    </v-card>

    <div class="container">
      <div
        class="row"
        style="margin-bottom: 24px;"
      ></div>
      <at-menu
        theme="dark"
        active-name="0"
        class="ntt-menu"
        style="width: 120px"
        v-show="show"
      >
        <v-list-group
          v-for="(item, index) in menuList"
          :key="index"
          style="width:148px"
        >
          <template
            v-slot:activator
            v-if="item.type == 1"
          >
            <div v-if="item.subMenus.length > 0">
              <div class="link">{{ item.title }}</div>
            </div>
            <v-list-item-content v-else>
              <router-link :to="item.path">
                <div class="link">{{ item.title }}</div>
              </router-link>
            </v-list-item-content>
          </template>

          <div
            v-for="(subItem, index1) in item.subMenus"
            :key="index1"
          >
            <div
              class="link sed"
              @click="gotoSubPage(subItem.path, index, index1)"
            >
              {{ subItem.title }}
            </div>
          </div>
        </v-list-group>
      </at-menu>

      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Layout',
  data() {
    return {
      admin: JSON.parse(localStorage.getItem('admin')),
      drawer: true,
      menuList: [],
      color: 'primary',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: true,
      roleId: '',
      show: true
    }
  },
  components: {},
  created() {
    if (this.$route.query.roleId != null) {
      this.roleId = this.$route.query.roleId
    } else {
      this.$route.query.roleId = this.roleId
    }
    this.getAdminMenu()
  },
  mounted() {},
  methods: {
    getAdminMenu() {
      //取得前一个 页面传过来的roleId
      //携带的roleId和token(全局拦截已经设置)向后端请求菜单
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/sysRole',
        params: {
          roleId: this.roleId
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: localStorage.getItem('token')
        }
      }).then((res) => {
        localStorage.setItem('menuList', JSON.stringify(res.data.menus))
        this.menuList = JSON.parse(localStorage.getItem('menuList'))
        console.log(this.menuList)
        this.$store.commit('setMenuList', this.menuList)
      })
    },
    logout() {
      alert('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      localStorage.removeItem('menuList')
      this.$router.push('/login')
    },
    gotoSubPage(path, index, index1) {
      console.log(path, index, index1)
      this.$route.push({
        path: path,
        query: {
          index: index,
          index1: index1
        }
      })
    }
  },
  computed: {
    bg() {
      return this.background ? 'https://picsum.photos/1920/1080?random' : undefined
    }
  }
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  border: 0;
}
.box {
  margin-top: 80px;
  float: left;
  margin-right: 180px;
}
.cloud-title {
  margin: 40px;
  color: black;
  font-weight: 900;
  font-size: 26;
}
.ntt-menu {
  margin-top: -30px;
  margin-left: 230px;
  border-radius: 10px;
  div {
    color: #cfd8dc;
  }
  .sed {
    margin-left: 30px;
    font-size: 12px;
  }
}
.header {
  position: relative;
}
.container {
  position: relative;
  background-color: #9e9e9e;
  margin-top: 128px;
  height: 490px;
}
</style>
