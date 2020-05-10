<template>
  <div>
    <v-card
      class="container"
      color="#385F73"
      dark
      width="380px"
      v-for="(user, index) in followings"
      :key="index"
    >
      <!-- <v-card-title class="headline">Followings</v-card-title> -->
      <img
        :src="user.avatarUrl"
        width="100px"
        height="100px"
        style="border-radius:30px"
      />
      <mybutton
        color="#ccc"
        dark
        small
        @click.native="handleClick($event, index)"
      ><span>UnFollow</span>
        <v-icon
          slot="suffix-icon"
          color="white"
        >mdi-cancel</v-icon>
      </mybutton>
      <p>用户名： {{ user.login }}</p>
      <p>GitHub： {{ user.url }}</p>
    </v-card>
  </div>
</template>
<script>
import mybutton from '../components/MyButton'
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
  components: {
    mybutton
  },
  mounted() {},
  methods: {
    handleClick(event, index) {
      console.log(index)
      this.$emit('cancel-follow', index)
    }
  },
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
