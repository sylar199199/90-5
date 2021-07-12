<template>
  <div class="perResult white px-2 py-2 rounded mb-2" @click="jumpDetail">
    <!--title-->
    <div class="d-flex justify-space-between titleBox">
      <span class="text--secondary text-caption text-truncate pt-1">NO. {{perResult.Issue}}</span>
      <div>
        <span class="font-weight-medium text-caption text-truncate">{{$common.toMyLocalTime(perResult.DrawDate) | time}}</span>
        <!--<v-icon small class="font-weight-bold ml-2">mdi-calendar-clock</v-icon>-->
      </div>
    </div>
    <!--开奖号码-->
    <div class="my-2">
      <div class="d-flex justify-center flex-wrap">
        <ilot-ball
          v-for="(value, index) in perResult.DrawNum.split('|-')[0].split('|').slice(0, 5)"
          :onFlag="true"
          :key="index"
        >
          {{String(value).length === 1 ? '0' + value : String(value)}}
        </ilot-ball>
      </div>
      <p class="text-caption text-center text--disabled mb-2">Winning numbers</p>
      <div class="d-flex justify-center flex-wrap">
        <ilot-ball
          v-for="(value, index) in perResult.DrawNum.split('|-')[0].split('|').slice(5, 10)"
          :onFlag="true"
          :key="index"
        >
          {{String(value).length === 1 ? '0' + value : String(value)}}
        </ilot-ball>
      </div>
      <p class="text-caption text-center text--disabled mb-2">Machine numbers</p>
    </div>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'perResult',
    data() {
      return {
      }
    },
    props: {
      // 开奖结果信息
      perResult: {
        type: Object,
        default: () => {

        }
      },
      gameID: {
        type: [String, Number],
        default: ''
      }
    },
    components: {},
    computed: {
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return true
          // case 'sm': return 400
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
          default :
            return false
        }
      }
    },
    created() {
    },
    mounted() {},
    methods: {
      // 跳转到详情页
      jumpDetail() {
        this.$router.push({
          name: 'resultDetail',
          query: { gameID: this.gameID, issue: this.perResult.Issue }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
.perResult{
  .titleBox{
    line-height: 24px;
  }
}
</style>
