<template>
  <div class="result grey lighten-4"   v-infinite-scroll="loadMore"
       v-infinite-scroll-disabled="loading"
       v-infinite-scroll-distance="10">
<!--    <div class="px-2">-->
<!--      <v-menu-->
<!--        ref="menu"-->
<!--        v-model="menu"-->
<!--        :close-on-content-click="false"-->
<!--        :return-value.sync="dates"-->
<!--        transition="scale-transition"-->
<!--        offset-y-->
<!--        min-width="auto"-->
<!--      >-->
<!--        <template v-slot:activator="{ on, attrs }">-->
<!--          &lt;!&ndash;<v-text-field&ndash;&gt;-->
<!--          &lt;!&ndash;v-model="date"&ndash;&gt;-->
<!--          &lt;!&ndash;label="Picker in menu"&ndash;&gt;-->
<!--          &lt;!&ndash;prepend-icon="mdi-calendar"&ndash;&gt;-->
<!--          &lt;!&ndash;readonly&ndash;&gt;-->
<!--          &lt;!&ndash;v-bind="attrs"&ndash;&gt;-->
<!--          &lt;!&ndash;v-on="on"&ndash;&gt;-->
<!--          &lt;!&ndash;&gt;</v-text-field>&ndash;&gt;-->
<!--          <v-text-field-->
<!--            v-model="dateRangeText"-->
<!--            prepend-icon="mdi-calendar"-->
<!--            readonly-->
<!--            v-bind="attrs"-->
<!--            v-on="on"-->
<!--          ></v-text-field>-->
<!--        </template>-->
<!--        <v-date-picker-->
<!--          v-model="dates"-->
<!--          range-->
<!--        >-->
<!--          <v-spacer></v-spacer>-->
<!--          <v-btn-->
<!--            text-->
<!--            color="primary"-->
<!--            @click="menu = false"-->
<!--          >-->
<!--            Cancel-->
<!--          </v-btn>-->
<!--          <v-btn-->
<!--            text-->
<!--            color="primary"-->
<!--            @click="okClick"-->
<!--          >-->
<!--            OK-->
<!--          </v-btn>-->
<!--        </v-date-picker>-->
<!--      </v-menu>-->
<!--    </div>-->
    <div class="pa-2" style="margin-top: -12px">
      <ilot-per-result v-for="(item, index) in resultList" :key="index" :perResult="item" :gameID="Format01.GameID"></ilot-per-result>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import scroll from '@/plugs/scroll'
  import ilotPerResult from './components/ilot-per-result'
  Vue.use(scroll)
  export default {
    name: 'result',
    data() {
      return {
        sortTimeQuery: true,
        loading: false,
        resultList: [],
        dates: [this.$moment().subtract(93, 'days').format('YYYY-MM-DD'), this.$moment(new Date()).format('YYYY-MM-DD')],
        menu: false,
        Format01: {
          GameID: this.$store.state.Content.GameID,
          StartDate: this.$moment().subtract(93, 'days').format('YYYY-MM-DD'),
          EndDate: this.$moment(new Date()).format('YYYY-MM-DD'),
          RecBegin: 0, // 查哪几条
          QueryCount: 10 // 查几条
        },
      }
    },
    components: {
      ilotPerResult
    },
    computed: {
      dateRangeText () {
        let arr = JSON.parse(JSON.stringify(this.dates))
        arr[0] = this.$moment(new Date(arr[0])).format('DD/MM/YYYY')
        arr[1] = this.$moment(new Date(arr[1])).format('DD/MM/YYYY')
        return arr.join(' ~ ')
      },
    },
    created() {
    },
    mounted() {
      if (this.$route.query.gameId) {
        this.Format01.GameID = this.$route.query.gameId
      }
      this.getWinningList()
    },
    methods: {
      loadMore () {
        if (this.loading) return
        if (!this.sortTimeQuery) return // 数据为空  1分钟内 不要加载
        this.loading = true
        this.Format01.RecBegin = JSON.parse(JSON.stringify(this.Format01.RecBegin)) + 10
        this.Format01.QueryCount = 10
        this.getWinningList()
      },
      okClick() {
        this.$refs.menu.save(this.dates)
        if (new Date(this.dates[0]).getTime() > new Date(this.dates[1]).getTime()) {
          let arr = JSON.parse(JSON.stringify(this.dates))
          this.$set(this.dates, 0, arr[1])
          this.$set(this.dates, 1, arr[0])
        }
        this.Format01.RecBegin = 0
        this.Format01.QueryCount = 10
        this.Format01.StartDate = this.dates[0]
        this.Format01.EndDate = this.dates[1]
        this.getWinningList()
        this.menu = false
      },
      async getWinningList() {
        let data = this.Format01
        let res = await this.$api.queryLotteryList({ data })
        this.loading = false
        if (this.Format01.RecBegin > 0) {
          this.resultList.push(...res.Format02)
        } else {
          this.resultList = res.Format02
        }
        if (res.Format02.length === 0) {
          this.sortTimeQuery = false
        }
      }
    }
  }
</script>


<style lang="less">
  .result{
    height: 100%;
    overflow: auto;
    /deep/ .v-text-field{
      padding-top: 0;
    }
    /deep/ .theme--light.v-text-field > .v-input__control > .v-input__slot:before{
      border-color: rgba(0, 0, 0, 0.22);
    }
  }
</style>
