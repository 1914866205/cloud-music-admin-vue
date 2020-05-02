<template>
  <div
    id="app"
    class="con"
  >
    <label class="lab">选择星座</label>
    <select
      v-model="starType"
      class="sel"
    >
      <option
        v-for="item in starTypeArr"
        :key="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <div
      class="item"
      style="background-color:red;width:200px;height:20px"
      v-for="item in showList"
      :key="item.type"
    >
      <div>
        {{ item.type }}
      </div>
      <div>
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Star',
  data() {
    return {
      starType: '',
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
          label: '钜蟹座'
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
          label: '水瓶'
        },
        {
          value: 'pisces',
          label: '双鱼座'
        }
      ],
      showList: []
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  watch: {
    starType: function() {
      this.$axios({
        method: 'get',
        url:
          'http://api.tianapi.com/txapi/star/index?key=cd3ffda4506c231ff8c9bde908dc7d81&astro=' +
          this.starType
      }).then((res) => {
        this.showList = res.data.newslist
      })
    }
  }
}
</script>

<style scoped lang="scss">
* {
  background-color: rgb(33, 150, 243);
}
</style>
