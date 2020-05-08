<template>
  <div class="das">
    <v-card
      color="#385F73"
      dark
    >
      <!-- <v-card-title class="headline">选择星座 </v-card-title> -->

      <!-- <v-card-subtitle> <select -->
      <!-- v-model="starType"
          class="sel"
        >
          <option
            v-for="item in starTypeArr"
            :key="item.value"
          >
            {{ item.label }}
          </option>
        </select></v-card-subtitle> -->

      <!-- <v-card-actions
        class="item"
        style="background-color:red;width:200px;height:20px"
        v-for="item in showList"
        :key="item.type"
      >
        <label>
          {{ item.type }}
        </label>
        <label>
          {{ item.content }}
        </label>
      </v-card-actions> -->
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  components: {},
  created() {
    // const authorize_uri = 'https://github.com/login/oauth/authorize'
    // const client_id = 'a29c48c1e7c4f774c6c9'
    // const redirect_uri = 'http://localhost:8080/oauth2/code/github'
    // window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`
    // let code = this.$route.query.code
    // alert(code)
    // this.$axios({
    //   method: 'get',
    //   url: 'http://localhost:8080/oauth2/code/github?code=' + code
    // }).then((res) => {
    //   this.showList = res.data.newslist
    //   this.user = res.data.user[0]
    //   this.followers = res.data.followers
    //   this.followings = res.data.followings
    //   this.repos = res.data.repos
    // })
  },
  mounted() {},
  methods: {},
  watch: {
    starType: function() {
      this.$axios({
        method: 'get',
        url:
          'http://api.tianapi.com/txapi/star/index?key=cd3ffda4506c231ff8c9bde908dc7d81&astro=' +
          this.starType
      }).then((res) => {
        this.showList = res.data.newslist
      })
    }
  }
}
</script>


<style scoped lang="scss">
.das {
  position: absolute;
  width: 50%;
  height: 50%;
  top: 5%;
  left: 20%;
}
</style>