<template>
  <v-container>
    <h3>菜单管理</h3>
    <span v-for="(item, index) in permissions" :key="index" class="gutter">
      <mu-button color="teal" v-if="item === 'menu:add'">添加菜单</mu-button>
      <mu-button color="success" v-if="item === 'menu:edit'">编辑菜单</mu-button>
      <mu-button color="error" v-if="item === 'menu:delete'">删除菜单</mu-button>
    </span>
  </v-container>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      permissions: this.$store.state.menuList1[2].subMenus[1].permissions
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>
