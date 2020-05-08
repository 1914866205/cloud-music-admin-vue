<template>
  <div>
    <v-card
      color="#385F73"
      dark
    >
      <v-card-title class="headline">Followers </v-card-title>
      <p>
        {{ followers }}
      </p>
      <div
        v-for="item in followers"
        :key="item"
      >
        <img
          :src='item.avatar_url'
          width="100px"
          height="100px"
          style="  border-radius:30px"
        />
        <!-- <p>用户名： {{ item.login }} </p> -->
        <p>用户名： {{item}} </p>
        <!-- <p>GitHub： {{ item.url }} </p> -->
        <!-- <p>被关注人数： {{ item.followers }} </p> -->
        <!-- <p>关注人数 {{ item.following }} </p>   -->
      </div>
    </v-card>

  </div>
</template>
<script>
export default {
  name: 'Auth',
  data() {
    return {
      user: '',
      followers: []
    }
  },
  components: {},
  created() {
    this.user = this.$route.query.user
    let followers_url = JSON.parse(this.user).followers_url.split('{')[0]

    this.$axios({
      method: 'get',
      url: followers_url
    }).then((res) => {
      this.followers = res.data[0]
      console.log(this.followers)
    })
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
