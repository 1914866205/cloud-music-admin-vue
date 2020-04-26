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
          style="position:absolute;right:20px"
        >
          <v-card-text>退出</v-card-text>
        </v-btn>
        <v-btn
          icon
          @click="show = !show"
          style="position:absolute;top:600px;right:20px"
        >
          <v-card-text>{{ this.show ? '隐藏' : '显示' }}</v-card-text>
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
        style="position:absolute;width: 100px;top:100px;right:20px"
        v-show="show"
      >
        <v-list-group
          v-for="(item, index) in menuList"
          :key="index"
          style="width:auto"
        >
          <template
            v-slot:activator
            v-if="item.type == 1"
          >
            <div v-if="item.subMenus.length > 0">
              <!-- <router-link :to="item.path"> -->
              <div style="width:100px">
                {{ item.title }}
              </div>
              <!-- </router-link> -->
            </div>
            <div v-else>
              <router-link :to="item.path">
                <div style="width:100px">{{ item.title }}</div>
              </router-link>
            </div>
          </template>

          <div
            v-for="(subItem, index1) in item.subMenus"
            :key="index1"
          >
            <router-link :to="subItem.path">
              <div
                class="link sed"
                @click="gotoSubPage(subItem.path, index, index1)"
              >
                {{ subItem.title }}
              </div>
            </router-link>
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
      console.log('取得前一个 页面传过来的roleId' + this.roleId)
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
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      localStorage.removeItem('menuList')
      this.$router.push('/login')
    },
    gotoSubPage(path, index, index1) {
      console.log(path, index, index1)
      this.$router.push({
        path: path,
        query: {
          index: index,
          index1: index1,
          roleId: this.roleId
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
  margin-top: -29px;
  margin-left: 263px;
  border-radius: 10px;
  z-index: 1000;
  router-link {
    color: #cfd8dc;
  }
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
  position: absolute;
  background-color: #385f73;
  top: 130px;
  // height: 490px;
  height: 587px;
  width: 392px;
}
// 这个属性不好找。。。
element.style {
  width: 60px;
}
</style>
