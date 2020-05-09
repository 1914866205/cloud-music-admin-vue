<template>
  <div>
    <v-card
      class="container"
      color="#385F73"
      dark
      width="380px"
      v-for="user in followings"
      :key="user"
    >
      <!-- <v-card-title class="headline">Followings</v-card-title> -->
      <img
        :src="user.avatarUrl"
        width="100px"
        height="100px"
        style="border-radius:30px"
      />
      <button>unfollow</button>
      <p>用户名： {{ user.login }}</p>
      <p>GitHub： {{ user.url }}</p>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Followings',
  props: {
    followings: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {},
  components: {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.container {
  display: inline-block;
}
* {
  margin: 5px;
  padding: 10px;
}
p {
  color: white;
}
</style>
