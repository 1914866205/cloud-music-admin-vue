<template>
  <v-card>
    <v-toolbar
      color="cyan"
      dark
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>GitHub Info</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item key="0">
        <v-card>
          <usercards :usercards="usercards"></usercards>
        </v-card>
      </v-tab-item>
      <v-tab-item key="1">
        <v-card>
          <followers :followers="followers"></followers>
        </v-card>
      </v-tab-item>
      <v-tab-item key="2">
        <v-card>
          <followings :followings="followings"></followings>
        </v-card>
      </v-tab-item>
      <v-tab-item key="3">
        <v-card>
          <repositorys :repositorys="repositorys"></repositorys>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import usercards from '../../components/UserCard.vue'
import followers from '../../components/Followers.vue'
import followings from '../../components/Followings.vue'
import repositorys from '../../components/Repositorys.vue'

export default {
  name: 'GitHubInfo',
  data() {
    return {
      tab: null,
      items: ['usercards', 'followers', 'followings', 'repositorys'],
      followers: [],
      repositorys: [],
      followings: [],
      usercards: []
    }
  },
  components: {
    //声明子组件
    usercards,
    followers,
    followings,
    repositorys
  },
  created() {
    let code = this.$route.query.code
    // alert(code + '**********')
    this.$axios({
      method: 'get',
      url: this.GLOBAL.baseUrl + '/oauth2/code/github?code=' + code
    }).then((res) => {
      this.usercards = res.data.data.users[0]
      alert(this.usercards + '**********' + res.data.data.users[0])
      this.followings = res.data.data.followings[0]
      this.followers = res.data.data.followers[0]
      this.repositorys = res.data.data.repositories[0]
    })
  },
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>
