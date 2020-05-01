<template>
  <div class="das">
    <v-card
      color="#385F73"
      dark
    >
      <!-- <v-card-title v-bind="userInfo.name"></v-card-title> -->
      <!-- <v-card-title v-bind="userInfo.password">{{userInfo.password}}</v-card-title> -->
      <img
        :src="userInfo.avatar"
        class="avatar"
      />
      <div
        class="info"
        style="margin-bottom:20px"
      >
        <h1 style="margin-bottom:20px">用户名:{{userInfo.name}}</h1>
        <input
          style="margin-bottom:20px"
          v-model="userInfo.name"
          placeholder=""
          :rules="usernameRules"
        >
        <h1 style="margin-bottom:20px">密码: {{userInfo.password}}</h1>
        <input
          v-model="userInfo.password"
          placeholder=""
          :rules="passwordRules"
        >
      </div>
      <mu-button
        style="margin-bottom:20px;margin-left:100px"
        @click="change"
      >
        修改
      </mu-button>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' },
        { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        {
          validate: (val) => val.length >= 6 && val.length <= 50,
          message: '密码长度大于6且不得大于50'
        }
      ],
      userInfo: {
        name: this.$store.state.admin.name,
        password: this.$store.state.admin.password,
        avatar: this.$store.state.admin.avatar
      }
    }
  },
  created() {
    alert(this.$store.state.admin.name)
    // console(this.userInfo.name)
    // console(this.userInfo.password)
    // console(this.admin)
    // alert(this.$store.state.admin['name'])
    // this.$axios({
    //   method: 'get',
    //   url: this.GLOBAL.baseUrl + '/sysAdmin/adminInfo',
    //   params: {
    //     roleId: this.$store.state.roleId,
    //     name: this.$store.state.admin['name']
    //   },
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     Authorization: localStorage.getItem('token'),
    //     userIp: this.$store.state.userIp
    //   }
    // }).then((res) => {
    //   this.userInfo = res.data
    //   alert(this.userInfo['username'])
    // })
  },
  methods: {
    change() {
      alert(
        this.userInfo.name +
          '*******' +
          this.userInfo.password +
          '*******' +
          this.userInfo.avatar +
          '*******' +
          this.$store.state.admin.id +
          '*******' +
          this.$store.state.roleId +
          '*******' +
          localStorage.getItem('token')
      )
      this.$http({
        method: 'post',
        url: this.GLOBAL.baseUrl + '/sysAdmin/setAdminInfo',
        params: {
          'Content-Type': 'application/x-www-form-urlencoded',
          roleId: this.$store.state.roleId,
          userIp: this.$store.state.userIp,
          Authorization: localStorage.getItem('token')
        },
        data: {
          name: this.userInfo.name,
          password: this.userInfo.password,
          avatar: this.userInfo.avatar,
          id: this.$store.state.admin.id
        }
      })
      // .then((res) => {
      //   this.userInfo = res.data
      //   alert(this.userInfo.username)
      // })

      // this.$axios({
      //   method: 'post',
      //   url: this.GLOBAL.baseUrl + '/sysAdmin/setAdminInfo',
      //   data: {
      //     name: this.userInfo.name,
      //     password: this.userInfo.password,
      //     avatar: this.userInfo.avatar,
      //     id: this.$store.state.admin.id,
      //     Authorization: localStorage.getItem('token'),
      //     roleId: this.$store.state.roleId
      //   },
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     roleId: this.$store.state.roleId,
      //     userIp: this.$store.state.userIp
      //   }
      // }).then((res) => {
      //   this.userInfo = res.data
      //   alert(this.userInfo.username)
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.das {
  position: absolute;
  top: 5%;
  left: 20%;
}
.avatar {
  position: relative;
  width: 30%;
  margin: 20px;
  cursor: pointer;
}
.info {
  position: relative;
  display: inline-block;
  top: -50px;
  left: 100px;
}
</style>