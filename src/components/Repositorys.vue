<template>
  <div>
    <v-card
      class="container"
      color="#385F73"
      dark
      width="380px"
      v-for="repo in Repositorys"
      :key="repo"
    >
      <!-- <v-card-title class="headline">Repositorys</v-card-title> -->
      <p>仓库名称： {{ repo.name }}</p>
      <p>仓库地址： {{ repo.url }}</p>
      <p>更新时间： {{ repo.created_at }}</p>
      <p>仓库大小： {{ repo.size }}KB</p>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Repositorys',
  props: {
    Repositorys: {
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
