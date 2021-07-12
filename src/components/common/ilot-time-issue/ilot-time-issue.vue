<template>
  <v-carousel
    cycle
    show-arrows-on-hover
    height="28"
    hide-delimiter-background
    hide-delimiters
    :show-arrows="false"
    vertical
    class="grey lighten-4"
  >
    <v-carousel-item>
      <div class="grey lighten-4 px-2 d-flex justify-space-between py-1">
        <span class="text-body-2 text--secondary text-truncate">No.{{$store.state.gameIssueData9.Issue ? $store.state.gameIssueData9.Issue : $store.state.oldIssue9}}</span>
        <span class="black--text text-body-2 text-truncate">
          <em class="pl-2 font-weight-bold" style="font-style: normal" v-if="$store.state.gameIssueData9.IssueStat === '100'">Time left {{setTime(lastTime)}}</em>
          <em class="pl-2 font-weight-bold" style="font-style: normal" v-else>Sales Closed</em>
        </span>
      </div>
    </v-carousel-item>
    <v-carousel-item v-if="$store.state.gameIssueData9.IssueStat === '100'">
      <p class="black--text text-body-2 text-center pt-1 text--secondary">Cut-off：{{$common.toMyLocalTime($store.state.gameIssueData9.EndSaleTime) | time}}</p>
    </v-carousel-item>
  </v-carousel>
</template>

<script type="text/javascript">
  import storage from '@/utils/storage'
  import {mapGetters} from 'vuex'
  export default {
    name: 'timeAndIssue',
    data() {
      return {
        newissueReqFlag: true,
        newissueTimer: '',
        initTimer: '',
        timer: '',
        gameList: [], // 游戏玩法内容
        secondCount: 0, // 秒心跳，每一秒加1
        newdate: this.$moment(new Date()).format('DD-MM-yy HH:mm:ss'), // 当前时间，时钟
        lastTime: 1 // 停止销售时间-当前时间
      }
    },
    components: {},
    computed: {
      ...mapGetters(['gameIssueData9'])
    },
    watch: {
      gameIssueData9(newValue, oldValue) {
        this.callastTime()
      },
      deep: true
    },
    created() {

    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    mounted() {
      this.initTimer = setInterval(() => {
        if (this.$store.state.Content.GameID) {
          this.GameList()
          this.gameIssue(true)
          clearInterval(this.initTimer)
        }
      }, 100)
    },
    methods: {
      setClick() {
        this.timer = setInterval(() => {
          this.callastTime()
        }, 1000)
      },
      // 游戏玩法
      async GameList() {
        let data = {
          GameID: this.$store.state.Content.GameID
        }
        let res = await this.$api.gamePlayList({ data })
        if (res.RetCode === '0') {
          // this.SET_THREEDCOLORLIST(this.Format03)
          this.gameList = res.Format02
          this.$store.commit('SET_GAMELIST9', this.gameList)
        }
      },
      // 游戏期数
      async gameIssue(first) {
        let data = {
          GameID: this.$store.state.Content.GameID,
          Issue: '-1',
          RecBegin: 0,
          QueryCount: 30
        }
        let res = await this.$api.gameIssue({ data })
        if (res.RetCode === '0') {
          if (res.Format02.length > 0) {
            this.$store.commit('SET_GAMEISSUEDATA', res.Format02[0])
          }
          // this.callastTime()
          this.setClick()
          // 第一次加载期信息，赋值旧期号
          if (first) {
            this.$store.commit('SET_OLDISSUE', this.$store.state.gameIssueData9.Issue)
          }
          // 期状态正常销售才不用再次请求
          if (res.Format02.length > 0 && res.Format02[0].IssueStat === '100') {
            clearInterval(this.newissueTimer)
            this.newissueReqFlag = true
          }
        }
      },
      // 计算 lastTime 停止销售时间-当前时间
      callastTime() {
        let sec = new Date(this.$common.toMyLocalTime(this.$store.state.gameIssueData9.EndSaleTime, true)).getTime()
        let now = new Date().getTime()
        this.lastTime = parseInt((sec - now) / 1000)
      },
      // 设置时间格式
      setTime(time) {
        // if (this.lastTime === 0 && this.secondCount === 0) {
        //   return
        // }
        if (time > 0) {
          let timeData = ''
          let day = Math.floor(time / (24 * 3600)) // Math.floor()向下取整
          if (day > 0) {
            timeData = day + 'd:'
          }
          let hh = Math.floor((time - day * 24 * 3600) / 3600)
          if (hh > 0) {
            timeData += hh + 'h:'
          }
          let mm = Math.floor((time - day * 24 * 3600 - hh * 3600) / 60)
          timeData += mm + 'm:'
          let ss = time - day * 24 * 3600 - hh * 3600 - mm * 60
          timeData += ss + 's'
          return timeData
        } else {
          // 改变 gameIssueData9 Issue的值
          let obj = this.$store.state.gameIssueData9
          obj.Issue = ''
          this.$store.commit('SET_GAMEISSUEDATA', obj)
          // 先暂停定时器 5秒后再请求新期
          clearInterval(this.timer)
          // 0秒后每隔一秒请求一次
          if (this.newissueReqFlag) {
            this.newissueReqFlag = false
            this.newissueTimer = setInterval(() => {
              this.gameIssue()
            }, 1000)
          }
          // 3秒后开奖动画
          setTimeout(() => {
            if (this.$store.state.gameIssueData9.IssueStat === '100') {
              this.$store.commit('SET_DRAWNOTICE', true)
            }
          }, 3000)
          // 20秒后关闭
          setTimeout(() => {
            this.$store.commit('SET_DRAWNOTICE', false)
          }, 60000)
          return '0m:0s'
        }
      }
    },
  }
</script>

<style lang="less" scoped>

</style>
