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
        <v-toolbar-title>云音乐后台管理</v-toolbar-title>
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

    <v-container class="box">
      <v-row>
        <v-col cols="3">
          <v-container>
            <v-card
              min-height="500"
              class="overflow-hidden"
            >
              <v-navigation-drawer
                v-model="drawer"
                :color="color"
                :expand-on-hover="expandOnHover"
                :mini-variant="miniVariant"
                :right="right"
                :src="bg"
                absolute
                dark
              >
                <v-list
                  dense
                  nav
                  class="py-0"
                >
                  <v-list-item
                    two-line
                    :class="miniVariant && 'px-0'"
                  >
                    <v-list-item-avatar>
                      <img
                        @click="miniVariant = !miniVariant"
                        src="https://avatars1.githubusercontent.com/u/42235689?s=60&u=b25100f60b66465b78fe97e36b2788715c216a6d&v=4"
                      />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <h3 class="gutter">Cloud Music</h3>
                      </v-list-item-title>
                      <v-list-item-subtitle class="gutter">Super Admin</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                  >
                    <template v-if="item.subMenus.length === 0">
                      <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <router-link :to="item.url">
                          <v-list-item-title class="gutter">{{ item.title }}</v-list-item-title>
                        </router-link>
                      </v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-group
                        value="true"
                        style="margin-left:-10px;"
                      >
                        <template v-slot:activator>
                          <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </template>
                        <v-list-item-content style="margin-left:20px;">
                          <v-list-item
                            v-for="(menu, i) in item.subMenus"
                            :key="i"
                            link
                          >
                            <v-list-item-icon class="gutter">
                              <v-icon :v-text="menu.icon">{{ menu.icon }}</v-icon>
                            </v-list-item-icon>
                            <router-link :to="menu.url">
                              <v-list-item-title
                                :v-text="menu.title"
                                class="gutter"
                              >{{ menu.title }}</v-list-item-title>
                            </router-link>
                          </v-list-item>
                        </v-list-item-content>
                      </v-list-group>
                    </template>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-container>
        </v-col>
        <v-col cols="9">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
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
  margin-top: 90px;
  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
