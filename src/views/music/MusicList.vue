<template>
  <div>
    <v-card
      color="#385F73"
      dark
      class="music-list"
    >
      <center>
        <h1>歌单管理</h1>
      </center>
      <mu-text-field
        v-model="keywords"
        aria-placeholder="search"
        style="width:200px;margin-left:20px"
      ></mu-text-field>
      <mu-button
        class="select"
        @click="search()"
      >搜索</mu-button>
      <mu-button
        v-for="(item, index) in buttonMenu"
        :key="index"
        class="menu-musicList"
        @click="Operation(item)"
      >
        {{ item.title }}
      </mu-button>
      <!-- 歌单表 -->
      <div>
        <div>
          <mu-data-table
            :columns="columns"
            :data="songList.slice(start,end)"
            style="background-color:#385F73;margin-left:2px"
          >
            <template slot-scope="scope">
              <td>{{scope.row.songListId}}</td>
              <td>{{scope.row.songListName}}</td>
              <td>{{scope.row.songCount}}</td>
              <td>{{scope.row.createTime.slice(0,6)}}</td>
            </template>
          </mu-data-table>
          <mu-flex justify-content="center">
            <!-- 每页显示的数量 -->
            <!-- <span style="margin-top:3px">每页显示:</span> -->
            <!-- <mu-select
              v-model="size"
              full-widt
              style="background-color:#385F73"
            >
              <mu-option
                v-for="(option,index) in options"
                :key="index"
                :label="option"
                :value="option"
              >
              </mu-option>
            </mu-select> -->
            <!-- 分页 -->
            <mu-pagination
              raised
              circle
              :total="totalPage"
              :current.sync="currentPage"
              style="margin-left:-99px;width:300px;margin-top:20px"
            >
            </mu-pagination>
          </mu-flex>
        </div>
      </div>

    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MusicList',
  data() {
    return {
      sort: {
        name: '',
        order: 'asc'
      },
      // options: ['5', '10', '15'],
      columns: [
        { title: 'id', width: 122, name: 'name', align: 'center' },
        { title: '名称', name: 'calories', width: 240, align: 'left', sortable: true },
        { title: '歌曲数', name: 'protein', width: 100, align: 'right', sortable: true },
        { title: '创建时间', name: 'create_time', width: 160, align: 'right', sortable: true }
      ],
      songList: [],
      buttonMenu: [],
      currentPage: 1,
      //页数
      totalPage: 1000,
      size: 7,
      page: 1,
      active: 0,
      types: [],
      typeChildSongList: [],
      keywords: '',
      start: 0,
      end: 8,
      roleId: this.$store.state.roleId,
      userIp: this.$store.state.userIp
    }
  },
  created() {
    // alert('MusicList的' + this.userIp)
    // alert('MusicList的' + this.roleId)
    // if (this.$route.query.roleId != null) {
    //   this.roleId = this.$route.query.roleId
    //   this.userIp = this.$route.query.userIp
    // } else {
    //   this.$route.query.roleId = this.roleId
    //   this.userIp = this.$route.query.userIp
    // }
    // alert(this.userIp)

    // for (let i = 0; i < this.$store.state.menuList.length; i++) {
    //   //查看当前按钮列表是否有二级按钮
    //   let menu = this.$store.state.menuList[i].subMenus
    //   if (menu != null) {
    //     for (let j = 0; j < menu.length; j++) {
    //       if (menu[j].title === '歌单管理') {
    //         this.buttonMenu = menu[j].subMenus
    //       }
    //     }
    //   }
    // }
    // console.log('按钮权限' + this.buttonMenu)
    // this.getButtonMenu()
    this.getSongList()
  },
  mounted() {},
  watch: {
    //侦听器，监听当前页的数量和当前页 值的变化
    size: function(newSize, oldSize) {
      this.totalPage = (1000 / this.size) * 10
      //新值与旧值进行对比
      this.end = this.end - oldSize + newSize
    },
    currentPage: function(newCurrent, oldCurrent) {
      if (newCurrent == 1000 / this.size) {
        this.page += 1
      }
      if (newCurrent < oldCurrent && newCurrent >= 0) {
        this.start -= 10
        this.end -= 10
      } else {
        this.start += 10
        this.end += 10
      }
    }
  },
  methods: {
    //获取歌单
    getSongList() {
      alert('传输' + this.roleId)
      this.axios({
        methods: 'get',
        // url: 'http://localhost:8080/songList/page',
        url: this.GLOBAL.baseUrl + '/songList/page',
        params: {
          currentPage: this.page,
          size: 1000,
          // roleId: this.roleId
          roleId: this.roleId
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          userIp: this.userIp
        }
      }).then((res) => {
        this.songList = res.data
        this.getButtonMenu()
        this.getSongListType()
        console.log(this.songList)
      })
    },
    //获取歌单中的按钮权限
    getButtonMenu() {
      for (let i = 0; i < this.$store.state.menuList.length; i++) {
        //查看当前按钮列表是否有二级按钮
        let menu = this.$store.state.menuList[i].subMenus
        if (menu != null) {
          for (let j = 0; j < menu.length; j++) {
            if (menu[j].title === '歌单管理') {
              this.buttonMenu = menu[j].subMenus
            }
          }
        }
      }
      console.log('按钮权限' + this.buttonMenu)
    },
    //获取歌单类型
    getSongListType() {
      this.axios({
        methods: 'get',
        // url: 'http://localhost:8080/songList/type',
        url: this.GLOBAL.baseUrl + '/songList/type',
        params: {
          roleId: this.roleId
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          userIp: this.userIp
        }
      }).then((res) => {
        //获取各种类型及属于该类型的歌单数据
        this.types = res.data
        console.log(this.types)
        //取出第一种类型的所有歌单，作为默认tab页上显示的数据
        this.typeChildSongList = this.types[0].child
        // console.log(this.typeChildSongList[0])
        // alert(this.typeChildSongList[0].song_list_name)
      })
    },
    gotoSubPage(path, index, index1) {
      console.log(path, index, index1)
      this.$router.push({
        path: path,
        query: {
          index: index,
          index1: index1,
          roleId: this.userId,
          userIp: this.userIp
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  background-color: #385f73;
}
.music-list {
  position: absolute;
  height: 600px;
  width: auto;
  left: 20%;
  top: 40px;
  z-index: 0;
}
.select {
  position: relative;
  background-color: #009688;
  width: 30px;
  color: #f5f5f5;
  right: -50px;
  border-radius: 6px;
}
.menu-musicList {
  position: relative;
  margin-left: 31px;
  background-color: #009688;
  color: #f5f5f5;
  border-radius: 6px;
}
</style>
