<template>
  <v-app>
    <div id="app">
      <v-main style="height: 100%;">
        <v-container class="white pa-0 d-flex flex-column justify-space-between" style="height: 100%; position: relative;">
          <div class="mainBody">
            <i-lot-toolbar></i-lot-toolbar>
            <!--时间+期号-->
            <ilot-time-issue v-if="$route.name !== 'result' && $route.name !== 'resultDetail' && $route.name !== 'rule'"></ilot-time-issue>
            <div class="viewBox">
              <keep-alive>
                <router-view class="view" v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view class="view" v-if="!$route.meta.keepAlive"></router-view>
            </div>
          </div>
          <ilotFooter></ilotFooter>
          <!--开奖提示-->
          <ilotDrawNotice v-if="noticeFlag"></ilotDrawNotice>
        </v-container>
      </v-main>
      <!--提示-->
      <msgBar v-if="this.msgData.status"></msgBar>
      <!--登录弹窗-->
      <ilot-login></ilot-login>
    </div>
  </v-app>
</template>
<script>
  import ilotLogin from '@/components/main/ilotLogin'
  import storage from '@/utils/storage'
  import ilotTimeIssue from '@/components/common/ilot-time-issue/ilot-time-issue'
  import msgBar from '@/components/main/msgBar'
  import { mapMutations, mapGetters } from 'vuex'
  import ilotFooter from '@/components/main/ilotFooter'
  import ilotDrawNotice from '@/components/main/ilotDrawNotice'
  export default {
    name: 'App',
    components: {
      ilotLogin,
      msgBar,
      ilotTimeIssue,
      ilotFooter,
      ilotDrawNotice
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(['msgData']),
      noticeFlag() {
        return this.$store.state.drawNotice
      }
    },
    methods: {
      ...mapMutations(['SET_CONTENT']),
      async getGameContent() {
        let url = window.location.href
        // let url = 'https://10.9.0.128:9999/game/un/gameList?content=75B800E93BA112FFA5FF5C99989563B95346874104319BFAE7A2A6C1397EFCD5C25667EB471962155FB1AC87DF9AEC2FB0BF02EA7E0BA655BE1294D0C025F02F1B6E1FEF8BF6C51FF5C27F93DEB70D062136B12FB1A2618E0CC9D61F9E83EEDDCBC8915FA838B7C3B81F2DD7115619B7DF1C23D0DB9F7C308FC7B1FE'
        if (url.indexOf('?') !== -1) {
          let content = url.split('?')[1].split('=')[1]
          let str = JSON.parse(JSON.stringify(content.split('#/')[0]))
          let data = {
            Content: str
          }
          let res = await this.$api.gameUrl({ data })
          console.log(res.Format01)
          if (res.RetCode === '0') {
            storage.set('Content905', res.Format01)
            this.SET_CONTENT(res.Format01)
            this.heartbeat()
            this.updateTime()
          }
        }
      },
      // 心跳
      async heartbeat() {
        let res = await this.$api.heartbeat({})
        if (res.RetCode === '0') {
          // console.log('心跳')
        }
      },
      // 传入时区 计算当前时间
      getLocalTime(i) {
        var d = new Date()
        var len = d.getTime()
        var offset = d.getTimezoneOffset() * 60000
        var utcTime = len + offset
        return new Date(utcTime + 3600000 * i)
      },
      // 同步时间
      async updateTime() {
        // 接口发出的时间戳
        let channelTime = new Date().getTime()
        let res = await this.$api.updateTime({})
        // 接口接收的时间戳
        let channelTime2 = new Date().getTime()
        // 单程时间
        let TD = (channelTime2 - channelTime) / 2
        if (res.RetCode === '0') {
          // 服务器所在时区--接口获取 现在接口没有返回先写死成尼日利亚时区 1
          let timeNum = 8
          let TimeZone = res.Format01.TimeZone
          if (TimeZone.substr(0, 1) === '+') {
            timeNum = 0 + TimeZone.substr(1, 2) * 1
          }
          if (TimeZone.substr(0, 1) === '-') {
            timeNum = 0 - TimeZone.substr(1, 2) * 1
          }
          // 单纯时区差值
          let timeZoneDif = new Date().getTime() - new Date(this.getLocalTime(timeNum)).getTime()
          // 时差 减去 网络单程延时
          let timeDif = timeZoneDif - TD
          this.$store.commit('SET_TIMEDIF', timeDif)
          this.$store.commit('SET_TIMEDIFWITHOUTNET', timeZoneDif)
        }
      },
    },
    watch: {
    },
    updated() {
    },
    created() {
      this.getGameContent()
      // 在页面加载时读取sessionStorage里的状态信息
      const store = sessionStorage.getItem('store')
      if (store) {
        this.$store.replaceState(
          Object.assign({}, this.$store.state, JSON.parse(store))
        )
      }
      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      })
    },
    beforeMount() {
    },
    mounted() {
      // 心跳循环请求 60秒
      this.timeOne = window.setInterval(() => {
        this.heartbeat()
        this.updateTime()
      }, 60000)
      console.log(this.$route)
    },
    destroyed() {
      window.clearInterval(this.timeOne)
    },
  }
</script>

<style lang="less">
  #app{
    height: 100%;
    width: 100%;
    @media (min-width: 1904px) {
      .container{
        max-width: 1200px;
      }
    }
    .mainBody{
      flex: 1;
      overflow: auto;
      .viewBox{
        height: calc(100% - 152px);
        overflow-y: auto;
      }
    }
  }

</style>
