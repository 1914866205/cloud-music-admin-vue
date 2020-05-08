<template>
  <div>
    <v-card
      color="#385F73"
      dark
      class="music-list"
    >
      <center>
        <h1>歌曲管理</h1>
      </center>
      <mu-text-field
        v-model="keywords"
        aria-placeholder="search"
        style="width:200px;margin-left:20px"
      ></mu-text-field>

      <mu-button
        v-for="(item, index) in buttonMenu"
        :key="index"
        class="menu-music"
        @click="Operation(item)"
      >
        {{ item.title }}
      </mu-button>
      <mu-button
        class="select"
        @click="deleteSongById()"
      >删除</mu-button>
      <!-- 歌曲表 -->
      <div>
        <div>
          <mu-data-table
            :columns="columns"
            :data="song.slice(start,end)"
            style="background-color:#385F73;margin-left:2px"
          >
            <template slot-scope="scope">
              <td>{{scope.row.songId}}</td>
              <td>{{scope.row.songName}}</td>
              <td>{{scope.row.singer}}</td>
              <td>{{scope.row.duration}}</td>
              <td>{{scope.row.commentCount}}</td>
              <td>{{scope.row.likeCount}}</td>
              <td>{{scope.row.playCount}}</td>
              <td>{{scope.row.deleteFlag}}</td>
              <td>{{scope.row.update_time}}</td>
              <td>{{scope.row.createTime.slice(0,6)}}</td>
            </template>
          </mu-data-table>
          <mu-flex justify-content="center">
            <!-- 分页 -->
            <mu-pagination
              raised
              circle
              :total="totalPage"
              :current.sync="currentPage"
              style="margin-left:-99px;width:500px;margin-top:10px"
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
  name: 'Music',
  data() {
    return {
      sort: {
        name: '',
        order: 'asc'
      },
      // options: ['5', '10', '15'],
      columns: [
        { title: 'id', width: 120, name: 'name', align: 'center' },
        { title: '歌名', name: 'calories', width: 150, align: 'left', sortable: true },
        { title: '歌手', name: 'protein', width: 120, align: 'left', sortable: true },
        { title: '时长', name: 'duration', width: 120, align: 'left', sortable: true },
        { title: '评论', name: 'commentCount', width: 120, align: 'left', sortable: true },
        { title: '喜欢', name: 'likeCount', width: 60, align: 'left', sortable: true },
        { title: '收藏', name: 'playCount', width: 60, align: 'left', sortable: true },
        { title: '删除', name: 'deleteFlag', width: 60, align: 'left', sortable: true },
        { title: '更新时间', name: 'update_time', width: 120, align: 'left', sortable: true },
        { title: '创建时间', name: 'create_time', width: 120, align: 'right', sortable: true }
      ],
      song: [],
      buttonMenu: [],
      currentPage: 1,
      //页数
      totalPage: 1000,
      size: 10,
      page: 1,
      active: 0,
      types: [],
      typeChildSong: [],
      keywords: '',
      start: 0,
      end: 10,
      roleId: this.$store.state.roleId,
      userIp: this.$store.state.userIp
    }
  },
  created() {
    // if (this.$route.query.roleId != null) {
    //   this.roleId = this.$route.query.roleId
    //   this.userIp = this.$route.query.userIp
    // } else {
    //   this.$route.query.roleId = this.roleId
    //   this.userIp = this.$route.query.userIp
    // }
    // alert('Music的' + this.userIp)
    // alert('Music的' + this.roleId)
    this.getSong()
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
    getSong() {
      this.axios({
        methods: 'get',
        // url: 'http://localhost:8080/song/page',
        url: this.GLOBAL.baseUrl + '/song/page',
        params: {
          currentPage: this.page,
          size: 1000,
          roleId: this.roleId
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          userIp: this.userIp
        }
      }).then((res) => {
        this.song = res.data
        this.getButtonMenu()
        console.log(this.song)
      })
    },
    //获取歌单中的按钮权限
    getButtonMenu() {
      for (let i = 0; i < this.$store.state.menuList.length; i++) {
        //查看当前按钮列表是否有二级按钮
        let menu = this.$store.state.menuList[i].subMenus
        if (menu != null) {
          for (let j = 0; j < menu.length; j++) {
            if (menu[j].title === '歌曲管理') {
              this.buttonMenu = menu[j].subMenus
            }
          }
        }
      }
      console.log('按钮权限' + this.buttonMenu)
    },
    gotoSubPage(path, index, index1) {
      console.log(path, index, index1)
      alert(this.roleId)
      alert(this.userIp)
      this.$router.push({
        path: path,
        query: {
          index: index,
          index1: index1,
          roleId: this.roleId,
          userIp: this.userIp
        }
      })
    },
    deleteSongById() {
      alert('删除歌曲ID:' + this.keywords)
      this.axios({
        methods: 'get',
        // url: 'http://localhost:8080/song/deleteById',
        url: this.GLOBAL.baseUrl + '/song/deleteById',
        params: {
          songId: this.keywords,
          roleId: this.roleId,
          userIp: this.userIp
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.data === 1) {
          alert('删除成功')
        }
      })
    },
    exportSong() {
      alert('导出歌曲')
      this.axios({
        methods: 'get',
        url: this.GLOBAL.baseUrl + '/song/export',
        params: {
          roleId: this.roleId,
          userIp: this.userIp
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.data !== null) {
          alert('导出成功')
        }
      })
    },
    Operation(item) {
      if (item.title === '导出') {
        this.exportSong()
      }
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
  height: auto;
  width: 1200px;
  left: 20%;
  top: 40px;
  z-index: 0;
}
.select {
  position: relative;
  background-color: #009688;
  width: 30px;
  color: #f5f5f5;
  right: -55px;
  border-radius: 6px;
}
.menu-music {
  position: relative;
  margin-left: 3px;
  background-color: #009688;
  color: #f5f5f5;
  border-radius: 6px;
}
</style>
