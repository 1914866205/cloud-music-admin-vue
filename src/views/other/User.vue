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
        @click="selectavatar()"
      />
      <div class="info">
        <mu-form
          ref="userInfo"
          :model="userInfo"
        >
          <mu-form-item
            label="用户名"
            prop="name"
            :rules="usernameRules"
          >
            <mu-text-field
              v-model="userInfo.name"
              prop="name"
            ></mu-text-field>
          </mu-form-item>

          <mu-form-item
            label="密码"
            prop="password"
            :rules="passwordRules"
          >
            <mu-text-field
              v-model="userInfo.password"
              prop="password"
            ></mu-text-field>
          </mu-form-item>
        </mu-form>

        <!-- <h1 style="margin-bottom:20px">用户名:{{userInfo.name}}</h1> -->
        <!-- <input
          style="margin-bottom:20px"
          v-model="userInfo.name"
          placeholder=""
          :rules="usernameRules"
        > -->
        <!-- <h1 style="margin-bottom:20px">密码: {{userInfo.password}}</h1> -->
        <!-- <input
          v-model="userInfo.password"
          placeholder=""
          :rules="passwordRules"
        > -->

        <mu-button
          style="margin-bottom:20px"
          @click="change"
        >
          修改
        </mu-button>
      </div>

      <v-card-title style="position:absolute;width:300px;margin-left:700px;margin-top:-300px;">选择星座查看今日运势</v-card-title>

      <at-select
        v-model="starType"
        style="position:absolute;width:100px;margin-left:258px;margin-top:15px"
      >
        <at-option
          v-for="item in starTypeArr"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </at-option>
      </at-select>
      <div style="position:relative;width:350px;margin-left:720px;margin-top:-240px">
        <div
          style="margin-top:20px"
          v-for="item in showList"
          :key="item.type"
        >
          <label>
            {{ item.type }}
          </label>
          <label>
            {{ item.content }}
          </label>
        </div>
      </div>
    </v-card>
    <!-- 隐藏的输入框 -->
    <!-- <input
      type="file"
      class="upload-input"
      v-show="false"
      ref="upload"
      @change="handleFile()"
    /> -->

    <!-- 设置可以被引用  引用名为file  不可见 -->
    <input
      ref="file"
      v-show="false"
      type="file"
      @change="uploadAvatar($event)"
    />
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
        { validate: (val) => val.length >= 3 && val.length <= 50, message: '密码长度大于3小于50' }
      ],
      userInfo: {
        name: this.$store.state.admin.name,
        password: this.$store.state.admin.password,
        avatar: this.$store.state.admin.avatar
      },
      starType: 'aaa',
      starTypeArr: [
        {
          value: 'aries',
          label: '白羊座'
        },
        {
          value: 'taurus',
          label: '金牛座'
        },
        {
          value: 'gemini',
          label: '双子座'
        },
        {
          value: 'cancer',
          label: '巨蟹座'
        },
        {
          value: 'leo',
          label: '狮子座'
        },
        {
          value: 'virgo',
          label: '处女座'
        },
        {
          value: 'libra',
          label: '天平座'
        },
        {
          value: 'scorpio',
          label: '天蝎座'
        },
        {
          value: 'sagittarius',
          label: '射手座'
        },
        {
          value: 'capricorn',
          label: '摩羯座'
        },
        {
          value: 'aquarius',
          label: '水瓶座'
        },
        {
          value: 'pisces',
          label: '双鱼座'
        }
      ],
      showList: [],
      client: '',
      file: '',
      id: this.$store.state.admin.id,
      roles: this.$store.state.admin.roles,
      birthday: this.$store.state.admin.birthday
    }
  },
  created() {
    // alert(this.birthday)
    // alert(this.$store.state.admin.name)
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
      alert('111id:' + this.$store.state.admin.id)
      alert('222id:' + this.id)
      alert(
        this.userInfo.name +
          '*******' +
          this.userInfo.password +
          '*******' +
          this.userInfo.avatar +
          '*******' +
          this.id +
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
          id: this.id
        }
      }).then(() => {
        let admin = {
          id: this.id,
          name: this.userInfo.name,
          roles: this.$store.state.admin.roles,
          avatar: this.userInfo.avatar,
          password: this.userInfo.password,
          birthday: this.birthday
        }
        // alert(admin)
        //存admin
        localStorage.setItem('admin', JSON.stringify(admin))
        this.$store.commit('setAdmin', JSON.stringify(admin))
        // var timer = setInterval(function() {
        //   this.shortTile--
        //   if (this.showTime == 0) {
        //     this.getMessage()
        //   }
        // }, 1000)
        // this.getMessage()
        alert('修改成功')
      })

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
    },

    // //上传头像方案1*********************************************
    // selectavatar() {
    //   let uploadbtn = this.$refs.upload
    //   uploadbtn.click()
    // },
    // handleFile() {
    //   this.getClient()
    //   //获取文件信息
    //   this.file = this.$refs.upload.files[0]
    //   var _this = this
    //   async function put() {
    //     try {
    //       let result = await _this.client.put(_this.$refs.upload.files[0].name, _this.file)
    //       //获取返回的url
    //       _this.avatar = result.url
    //       this.userInfo.avatar = result.url
    //       // _this.changeMessage()
    //       _this.change()
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   }
    //   put()
    // },
    // getClient() {
    //   let OSS = require('ali-oss')
    //   this.client = new OSS({
    //     region: 'oss-cn-beijing',
    //     //云账号的AccessKey所有的API访问权限，
    //     //建议遵循阿里云安全最佳实践没部署在服务器端使用RAM子账号
    //     accessKeyId: 'LTAI4GD8r7BPa4ik89fSdFws',
    //     accessKeySecret: 'H5uLKRHHYnndxuHctQjPPBJj5vRWSH',
    //     bucket: 'nttbucket'
    //   })
    // },
    //上传头像方案1*********************************************
    //上传头像方案2*********************************************
    selectavatar() {
      this.$refs.file.click()
    },
    uploadAvatar(event) {
      const OSS = require('ali-oss')
      let client = new OSS({
        region: 'oss-cn-beijing',
        //云账号的AccessKey所有的API访问权限，
        //建议遵循阿里云安全最佳实践没部署在服务器端使用RAM子账号
        accessKeyId: 'LTAI4GD8r7BPa4ik89fSdFws',
        accessKeySecret: 'H5uLKRHHYnndxuHctQjPPBJj5vRWSH',
        bucket: 'nttbucket'
      })
      let timestamp = Date.parse(new Date())
      let imgUrl = 'img/' + timestamp
      alert(imgUrl)
      var file = event.target.files[0] //获取文件流
      // var url = ''
      //因为在内部方法中，this无效
      var _this = this
      // alert(file)
      // alert('****')
      client.multipartUpload(imgUrl, file).then(function(result) {
        // alert('链接地址111result.res.requestUrls[0]：' + result.res.requestUrls[0])
        let img = result.res.requestUrls[0].split('?')[0]
        alert('错误源' + img)
        _this.userInfo.avatar = img
        //地址改变，但没有远程存储，所以找不到文件
        //要先存储
        alert('错误源' + _this.userInfo.avatar)
        let admin = {
          id: _this.id,
          name: _this.userInfo.name,
          roles: _this.roles,
          avatar: _this.userInfo.avatar,
          password: _this.userInfo.password,
          birthday: _this.birthday
        }
        // 存admin
        console.log(admin)
        console.log(admin.avatar)
        localStorage.setItem('admin', JSON.stringify(admin))
        _this.$store.commit('setAdmin', JSON.stringify(admin))
        console.log(_this.$store.state.admin)
      })
    }
  },
  watch: {
    starType: function() {
      // alert(this.starType)
      this.$axios({
        method: 'get',
        url:
          'http://api.tianapi.com/txapi/star/index?key=cd3ffda4506c231ff8c9bde908dc7d81&astro=' +
          this.starType
      }).then((res) => {
        this.showList = res.data.newslist
        // alert(this.starType + this.showList[0].content)
      })
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
  width: 20%;
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
