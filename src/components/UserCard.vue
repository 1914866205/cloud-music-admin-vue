<template>
  <div>
    <v-card
      color="#385F73"
      dark
      width="370px"
    >
      <v-card-title class="headline">UserCard </v-card-title>
      <img
        :src='user.avatar_url'
        width="100px"
        height="100px"
        style="  border-radius:30px"
      >
      <p>用户名： {{ user.login }} </p>
      <p>GitHub： {{ user.url }} </p>
      <p>被关注人数： {{ user.followers }} </p>
      <p>关注人数 {{ user.following }} </p>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'Auth',
  data() {
    return {
      user: ''
    }
  },
  components: {},
  created() {
    this.user = JSON.parse(this.$route.query.user)
  },
  mounted() {},
  methods: {},
  watch: {}
}
</script>

<style scoped lang="scss">
* {
  padding: 10px;
  color: white;
}
</style>
