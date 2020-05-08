<template>
  <v-layout
    align-center
    justify-center
    class="bg"
  >
    <Login />
    <v-overlay
      absolute
      color="purple"
      z-index="5"
    ></v-overlay>
  </v-layout>
</template>


<script>
import Login from '../../components/Login'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Login
  }
}
</script>
