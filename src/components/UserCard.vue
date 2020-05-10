<template id="usercard">
  <div class="container">
    <v-card
      color="#385F73"
      dark
      width="380px"
    >
      <v-card-title class="headline">UserCard </v-card-title>
      <img
        :src="this.usercards.avatar_url"
        width="100px"
        height="100px"
        style="  border-radius:30px"
      />
      <p>用户名： {{ this.usercards.login }}</p>
      <p>GitHub： {{ this.usercards.repos_url }}</p>
      <p>被关注人数： {{ this.usercards.followers }}</p>
      <p>关注人数 {{ this.usercards.following }}</p>
      <p>{{this.usercards.bio}}</p>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  data() {
    return {}
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
    console.log(this.usercards)
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
