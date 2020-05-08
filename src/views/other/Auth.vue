<template>
  <v-sheet>
    <v-app-bar>
      <template v-slot:extension>
        <v-tab to="/auth/usercard"></v-tab>
        <v-tab to="/auth/followers"></v-tab>
        <v-tab to="/auth/following"></v-tab>
        <v-tab to="/auth/pros"></v-tab>

      </template>
    </v-app-bar>
  </v-sheet>
  <!-- <v-card>
    <v-toolbar
      color="cyan"
      dark
      flat
    >
      <v-toolbar-title>GitHub第三方</v-toolbar-title>
      <userCard />
      <followers />
      <followings />
      <pros />
    </v-toolbar>
  </v-card> -->
</template>

<script>
// import userCard from '../../components/UserCard'
// import followers from '../../components/Followers'
// import followings from '../../components/Following'
// import pros from '../../components/Pros'
export default {
  name: 'Auth',
  components: {
    // userCard,
    // followers,
    // followings,
    // pros
  },
  data() {
    return {
      user: '',
      followers: [],
      followings: [],
      repos: []
    }
  }
}
</script>

<style scoped lang="scss"></style>
