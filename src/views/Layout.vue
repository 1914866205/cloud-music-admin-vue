<template>
  <div>
    <v-card class="overflow-hidden">
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
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title class="cloud-title">云音乐后台管理</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="logout()"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-2"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-container style="height: 1px;"></v-container>
      </v-sheet>
    </v-card>
    <v-col cols="3">
      <div class="box">
        <div
          class="row"
          style="margin-bottom: 24px;"
        >
        </div>
        <at-menu
          theme="dark"
          :mode="mode"
          active-name="0"
        >

          <at-submenu
            v-for="item in items"
            :key="item.title"
            link
          >
            <template
              slot="title"
              v-if="item.subMenus.length === 0"
            >
              <router-link>
                {{item.title}}
              </router-link>
            </template>

            <template
              slot="title"
              v-else
            >
              {{item.title}}

            </template>
            <at-menu-item
              v-for="(menu,i) in item.subMenus"
              :key='i'
              link
            >
              <router-link :to="menu.url">
                {{menu.title}}
              </router-link>
            </at-menu-item>

          </at-submenu>
        </at-menu>
      </div>
    </v-col>
    <v-col
      cols="9"
      class="box"
    >
      <router-view />
    </v-col>
  </div>
</template>
<script>
export default {
  name: 'Layout',
  data() {
    return {
      user: this.$store.state.user,
      drawer: true,
      items: this.$store.state.menuList1,
      color: 'primary',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: true
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    logout() {
      alert('logout')
      localStorage.removeItem('token')
      this.$store.commit('setUser', null)
      this.$router.push('/login')
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
.show {
  margin-left: 100px;
}
</style>
