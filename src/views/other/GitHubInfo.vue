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
          <v-tab @click="toTab('usercard')">usercard</v-tab>
          <v-tab @click="toTab('followers')">followers</v-tab>
          <v-tab @click="toTab('followings')">followings</v-tab>
          <v-tab @click="toTab('repositorys')">repositorys</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <!--
          子组件，显示不同的tab
          is 特性 动态绑定子组件
          keep-alive 将切换出去的组件保留在内存中
         -->
        <v-card flat>
          <prince :is="currentTab"></prince>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import usercard from '../../components/UserCard.vue'
import followers from '../../components/Followers.vue'
import followings from '../../components/Followings.vue'
import repositorys from '../../components/Repositorys.vue'
export default {
  name: 'GitHubInfo',
  data() {
    return {
      currentTab: 'usercard' //currentTab用于标识当前触发的子组件
    }
  },
  components: {
    //声明子组件
    usercard,
    followers,
    followings,
    repositorys
  },
  created() {},
  mounted() {},
  methods: {
    toTab(tab) {
      this.currentTab = tab
      console.log(this.currentTab)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
