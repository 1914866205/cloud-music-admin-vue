<template>
  <div class="bg">
    <mu-container>
      <mu-form
        ref="form"
        :model="validateForm"
        class="mu-demo-form"
        style="background-color:#00BCD4;margin-left:25px;margin-top:20px"
      >
        <mu-form-item
          label="用户名"
          prop="username"
          :rules="usernameRules"
        >
          <mu-text-field
            v-model="validateForm.username"
            prop="username"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item
          label="密码"
          prop="password"
          :rules="passwordRules"
        >
          <mu-text-field
            type="password"
            v-model="validateForm.password"
            prop="password"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item
          label="验证码"
          prop="checkcode"
          :rules="checkcodeRules"
        >
          <mu-text-field
            v-model="validateForm.checkcode"
            prop="checkcode"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <img
            ref="verifyImg"
            @click="refresh()"
          />
        </mu-form-item>
        <!-- <mu-form-item
          prop="isAgree"
          :rules="argeeRules"
        >
          <mu-checkbox
            label="同意用户协议"
            v-model="validateForm.isAgree"
          ></mu-checkbox>
        </mu-form-item> -->

        <mu-form-item>
          <mu-button
            color="primary"
            @click="submit"
            style="background-color:#448AFF;color:white;left:30px"
          >提交</mu-button>
          <mu-button
            @click="clear"
            style="background-color:#448AFF;color:white;left:40px"
          >重置</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
    <!-- <mu-dialog
        title="Dialog"
        width="360"
        :open.sync="openSimple"
      >
        登录成功
        <mu-button
          slot="actions"
          flat
          color="primary"
          @click="closeSimpleDialog"
        >Close</mu-button>
      </mu-dialog> -->
    <!--遮罩-->
    <div
      class="mask"
      v-if="show"
    >
      <div class="dialog">
        <h3>请选择要进入系统的角色</h3>
        <div class="btn-wrapper">
          <mu-button
            v-for="(role, index) in roles"
            :key="index"
            color="primary"
            class="btn"
            @click="gotoIndex(role.roleId)"
          >
            {{ role.roleName }}
          </mu-button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 获取本地ip地址  <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>-->
<script>
export default {
  name: 'Login',
  data() {
    return {
      verifyImg: '',
      userIp: '',
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' },
        { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议' }],
      validateForm: {
        username: '',
        password: '',
        // isAgree: false,
        // 获取本地ip地址
        // userIp: document.write(returnCitySN['cip'])
        userIp: '',
        checkcode: ''
      },
      menuList: [],
      openSimple: false,
      show: false
    }
  },
  components: {},
  created() {
    this.$axios({
      method: 'get',
      url: 'http://pv.sohu.com/cityjson?ie=utf-8'
    }).then((res) => {
      this.userIp = res.data.split('"')[3]
      // alert(this.userIp)
    })
  },
  mounted() {
    // this.init()
  },
  methods: {
    // 获取验证码
    init() {
      this.validateForm.userIp = this.userIp
      if (this.userIp.length > 0) {
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/captcha?userIp=' + this.userIp,
          responseType: 'blob'
        }).then((res) => {
          let img = this.$refs.verifyImg
          let url = window.URL.createObjectURL(res.data)
          img.src = url
        })
      }
    },
    openSimpleDialog() {
      this.openSimple = true
    },
    closeSimpleDialog() {
      this.openSimple = false
    },

    submit() {
      this.$axios({
        method: 'post',
        url: 'http://localhost:8080/sysAdmin/login',
        data: {
          username: this.validateForm.username,
          password: this.validateForm.password,
          checkCode: this.validateForm.checkcode,
          userIp: this.validateForm.userIp
        }
      }).then((res) => {
        if (res.data.token !== null) {
          //存token
          localStorage.setItem('token', res.data.token)
          this.$store.commit('setToken', res.data.token)
          let admin = {
            id: res.data.admin.id,
            name: res.data.admin.name,
            roles: res.data.admin.roles,
            avatar: res.data.admin.avatar
          }
          // alert(admin)
          //存admin
          localStorage.setItem('admin', JSON.stringify(admin))
          this.$store.commit('setAdmin', JSON.stringify(admin))
          this.roles = res.data.admin.roles
          //角色数量超过1个
          if (this.roles.length > 1) {
            //弹出遮罩层选择
            alert('登录成功，你的角色不止一个，请选择')
            //显示遮罩层，遮罩层按钮具体点击事件 gotoDashboard(roleId)
            this.show = true
          } else {
            //只有一个角色
            const roleId = res.data.admin.roles[0].roleId
            this.$router.push({
              path: '/',
              query: {
                roleId: roleId,
                userIp: this.userIp
              }
            })
          }
        }
      })
    },
    gotoIndex(roleId) {
      this.$router.push({
        path: '/',
        query: {
          roleId: roleId,
          userIp: this.userIp
        }
      })
      // alert(roleId)
      // this.$router.push({
      //   name: '/',
      //   params: { roleId }
      // })
    },
    clear() {
      this.$refs.form.clear()
      this.validateForm = {
        username: '',
        password: ''
        // isAgree: false
      }
    },
    refresh() {
      //点击验证码图片，重新请求，刷新
      this.init()
    }
  },
  computed: {},
  watch: {
    userIp: function() {
      this.init()
    }
  }
}
</script>

<style scoped lang="scss">
.bg {
  background: -webkit-linear-gradient(to bottom, #7bc6cc, #be93c5);
  background: linear-gradient(
    to bottom,
    #7bc6cc,
    #be93c5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-image: url('../../assets/images/5.jpg');
  opacity: 0.8;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mu-demo-form {
  max-width: 300px;
  margin-left: 14px;
  margin-top: -70px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
.login-form {
  max-width: 500px;
  margin-left: 330px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
.mask {
  z-index: 900;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog {
    z-index: 1000;
    width: 300px;
    height: 200px;
    line-height: 100px;
    background-color: #009688;
    border-radius: 10px;
    text-align: center;
    padding-top: 50px;
    .btn-wrapper {
      margin-left: 25px;
      margin-top: -30px;
      display: flex;
      .btn {
        margin: 20px;
      }
    }
  }
}
</style>
