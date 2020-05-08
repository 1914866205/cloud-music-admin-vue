<template>
  <div>
    <v-card
      color="#385F73"
      dark
    >
      <v-card-title class="headline">Following </v-card-title>
      <p>
        {{ followings }}
      </p>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'Auth',
  data() {
    return {
      user: '',
      followings: []
    }
  },
  components: {},
  created() {
    this.user = this.$route.query.user
    let following_url = JSON.parse(this.user).following_url.split('{')[0]
    console.log(following_url)

    this.$axios({
      method: 'get',
      url: following_url
    }).then((res) => {
      this.followings = res.data[0]
      console.log(this.followings)
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
