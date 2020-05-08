<template>
  <div>
    <v-card
      color="#385F73"
      dark
    >
      <v-card-title class="headline">Pros </v-card-title>
      <p>
        {{ repos }}
      </p>
      <!-- <v-card-actions
        class="item"
        style="background-color:red;width:200px;height:20px"
        v-for="item in user"
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
  name: 'Auth',
  data() {
    return {
      user: '',
      repos: []
    }
  },
  components: {},
  created() {
    this.user = this.$route.query.user
    let repos_url = JSON.parse(this.user).repos_url.split('{')[0]

    this.$axios({
      method: 'get',
      url: repos_url
    }).then((res) => {
      this.repos = res.data[0]
      console.log(this.repos)
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
