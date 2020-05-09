<template id="usercard">
  <div class="container">
    <v-card
      color="#385F73"
      dark
      width="380px"
    >
      <v-card-title class="headline">UserCard </v-card-title>
      <img
        :src="this.user.avatar_url"
        width="100px"
        height="100px"
        style="  border-radius:30px"
      />
      <p>用户名： {{ this.user.login }}</p>
      <p>GitHub： {{ this.user.repos_url }}</p>
      <p>被关注人数： {{ this.user.followers }}</p>
      <p>关注人数 {{ this.user.following }}</p>
      <p>{{this.user.bio}}</p>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  data() {
    return {
      user: ''
    }
  },
  props: {
    usercards: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
    this.user = this.usercards
  },
  components: {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
* {
  margin: 5px;
  padding: 10px;
}
p {
  color: white;
}
</style>
