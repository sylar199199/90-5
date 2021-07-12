<template>
  <div class="lotto px-2">
    <!--两个选择框-->
    <div class="pt-4">
      <v-row align="center">
        <v-col
            class="d-flex"
            cols="6"
        >
          <v-select
              v-model="gamerule"
              :items="gameRuleOption"
              item-text="text"
              item-value="value"
              class="text-caption"
              height="30"
              dense
              outlined
              @change="gameruleChange"
          ></v-select>
        </v-col>

        <v-col
            class="d-flex"
            cols="6"
        >
          <v-select
              v-model="gametype"
              :items="$store.state.gameList9"
              item-text="PlayName"
              item-value="PlayID"
              class="text-caption"
              height="30"
              dense
              outlined
              @change="gametypeChange"
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <!--删除 机选-->
    <div style="margin-top: -25px">
      <!--清除+刷新-->
      <div class="d-flex justify-space-between">
        <span class="font-weight-bold text-body-2 text-truncate"
              style="line-height: 48px">Choose {{
            $store.state.gametypeObj.PlayID === '1010' ? $store.state.gametypeObj.MinBaseCount : $store.state.gametypeObj.BetNumCount
          }}</span>
        <div>
          <v-chip
              class="ma-2"
              color="secondary"
              style="cursor: pointer"
              label
              @click="cleanClick"
              text-color="primary"
          >
            <v-icon left>
              mdi-trash-can-outline
            </v-icon>
            Clean
          </v-chip>
          <v-chip
              class="ma-0"
              color="secondary"
              style="cursor: pointer"
              label
              @click="randomBet(true)"
              text-color="primary"
          >
            <v-icon left>
              mdi-refresh
            </v-icon>
            Auto
          </v-chip>
        </div>
      </div>
    </div>

    <ilotNumbox :ballArr="ballArr" @clickMoreNum="clickMoreNum" :key="ballKey"></ilotNumbox>
    <div>
      <!--清除+刷新-->
      <div class="d-flex justify-space-between" v-if="gametype === '1010'">
        <span class="font-weight-bold text-body-2 text-truncate"
              style="line-height: 48px">Choose {{ $store.state.gametypeObj.MinRoundNumCount }}</span>
      </div>
    </div>
    <ilotNumbox :ballArr="ballArr" v-if="gametype === '1010'" :secondFlag="true" @clickMoreNum="clickMoreNum"
                :key="ballKey"></ilotNumbox>
  </div>
</template>

<script>
import storage from '@/utils/storage'
import ilotNumbox from './components/ilot-numbox'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'lotto',
  data() {
    return {
      initTimer: '',
      ballKey: 1,
      WagerMode: '1', // 选号方式：0—其它方式，1—手选，2—机选，3—手选
      SaleGameData9: {}, // 可销售游戏列表
      GameID: 6,
      ballArr: [],
      gameRuleOption: [
        {
          value: '1',
          text: 'WINNING',
        },
        {
          value: '2',
          text: 'MACHINE',
        },
        {
          value: '3',
          text: 'DOUBLE CHANCE',
        },
      ],
      gamerule: '1',
      gametype: '',
    }
  },
  components: {
    ilotNumbox,
  },
  computed: {
    ...mapGetters(['gameList9']),
  },
  watch: {
    gameList9(newValue, oldValue) {
      this.makeArr(newValue[0].MinNum, newValue[0].MmaxNum)
      this.setgametype()
    },
    deep: true,
  },
  activated() {
    this.initTimer = setInterval(() => {
      if (this.$store.state.gameList9.length > 0) {
        this.initE()
        clearInterval(this.initTimer)
      }
    }, 200)
  },
  deactivated() {
  },
  created() {

  },
  mounted() {
    this.checkSaleGame()
    this.eventBus.$on('addToCard', data => {
      this.addCard()
    })
    this.eventBus.$on('toCard', data => {
      this.toCard()
    })
  },
  methods: {
    ...mapMutations(['SET_BETLIST']),
    initE() {
      // 初始化gamerule选中
      this.gamerule = this.$store.state.gamerule ? this.$store.state.gamerule : '1'
      if (this.$store.state.gameList9.length > 0 && this.$store.state.gameList9[0].MinNum) {
        this.makeArr(this.$store.state.gameList9[0].MinNum, this.$store.state.gameList9[0].MmaxNum)
        this.setgametype()
      }
      if (this.$route.params.rule && this.$route.params.type) {
        this.gamerule = this.$route.params.rule
        this.gametype = this.$route.params.type
      } else if (sessionStorage.getItem('gametype') && sessionStorage.getItem('gamerule')) {
        this.gametype = sessionStorage.getItem('gametype')
        this.gamerule = sessionStorage.getItem('gamerule')
      } else {
        console.log(this.$route.query.index)
        if (this.$route.query.index || this.$route.query.index === 0) {
          // 初始化 gamerule 游戏类型
          this.gamerule = this.gameRuleOption.find(v => v.text === this.$store.state.betLists9[this.$route.query.index].rulename).value
          this.gametype = this.$store.state.betLists9[this.$route.query.index].PlayTypeID
        } else {
          this.gametype = this.$store.state.gameList9[0].PlayID
        }
      }
      // this.setgametype()
    },
    // 点击球给出的事件， flag为true 则为 修改值成功， flag 为 false 没有修改成功
    clickMoreNum(flag) {
      // flag true为修改成功，而且 WagerMode 为机选 2，这样
      if (flag && this.WagerMode === '2') {
        this.WagerMode = 3
      }
    },
    // 清空
    cleanClick() {
      this.$store.commit('SET_CLEARCURRENTNUMARR')
      this.$store.commit('SET_CLEARCURRENTNUMARRBACK')
      this.$changeShow(window.platform + '-5/90-game', {clickOn: 'Clean'})
    },
    // 初始化设置gamerule 跟 gametype
    async setgametype() {
      if (sessionStorage.getItem('gametype')) {
        this.gametype = sessionStorage.getItem('gametype')
        let data = {
          GameID: this.$store.state.Content.GameID
        }
        let res = await this.$api.gamePlayList({ data })
        let obj = res.Format02.find(item => this.gametype === item.PlayID)
        this.$store.commit('SET_GAMETYPEOBJ', obj)
        if (sessionStorage.getItem('oneMore')) {
          this.randomBet()
        }
      } else if (this.$store.state.gametypeObj.PlayID) {
        this.gametype = this.$store.state.gametypeObj.PlayID
      } else {
        this.gametype = this.$store.state.gameList9[0].PlayID
        // 设置选中的gametypeobj
        let obj = this.$store.state.gameList9.find(item => this.gametype === item.PlayID)
        this.$store.commit('SET_GAMETYPEOBJ', obj)
      }
    },
    // gamerule切换
    gameruleChange(value) {
      sessionStorage.setItem('gamerule', value)
      this.$store.commit('SET_GAMERULE', value)
      let text = this.gameRuleOption.find(v => v.value === value).text
      this.$changeShow(window.platform + '-5/90-game', {waySelect1: text})
    },
    // gametype切换
    gametypeChange(value) {
      sessionStorage.setItem('gametype', value)
      sessionStorage.setItem('gamerule', this.gamerule)
      // 初始
      this.$store.commit('SET_NUMFLAG')
      this.WagerMode = '1'
      // 清空当前投注的号码
      this.$store.commit('SET_CLEARCURRENTNUMARR')
      this.$store.commit('SET_CLEARCURRENTNUMARRBACK')
      // 设置选中的gametypeobj
      let obj = this.$store.state.gameList9.find(item => value === item.PlayID)
      this.$store.commit('SET_GAMETYPEOBJ', obj)
      this.$changeShow(window.platform + '-5/90-game', {waySelect2: obj.PlayName})
    },
    // 可销售游戏
    async checkSaleGame() {
      let data = {
        GameID: this.$store.state.Content.GameID,
      }
      let res = await this.$api.checkSaleGame({data})
      if (res.RetCode === '0') {
        res.Format02[0].SingleAmount =
            parseInt(res.Format02[0].SingleAmount) / 100
        res.Format02[0].MinMoneyPeTick =
            parseInt(res.Format02[0].MinMoneyPeTick) / 100
        res.Format02[0].MaxMoneyPerTick =
            parseInt(res.Format02[0].MaxMoneyPerTick) / 100
        this.SaleGameData9 = res.Format02[0]
        this.SaleGameData9.TickSN = parseInt(new Date().getTime() / 1000)
        this.SaleGameData9.WagerType = '3'
        this.SaleGameData9.PromotionType = '0'
        this.SaleGameData9.MultiIssue = '1'
      }
    },
    makeArr(start, end) {
      let arr = []
      for (var i = start * 1; i <= end * 1; ++i) {
        let str = String(i).length === 1 ? '0' + i : String(i)
        arr.push(str)
      }
      this.ballArr = arr
      this.ballKey++
    },
    // 随机取数组中 某几个元素
    getRandomArrayElements(arr, count) {
      let shuffled = arr.slice(0)
      let i = arr.length
      let min = i - count
      let temp
      let index
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    },
    // 机选
    randomBet(flag) {
      if (flag) {
        this.$changeShow(window.platform + '-5/90-game', {clickOn: ' Auto'})
      }
      // 机选时候vuex的gametypeObj 值没有 或者 与 gametype 不同步
      if (!this.$store.state.gametypeObj.PlayID || this.$store.state.gametypeObj.PlayID !== this.gametype) {
        this.$store.commit('SET_GAMETYPEOBJ', this.$store.state.gameList9[0])
        this.gametype = this.$store.state.gameList9[0].PlayID
      }
      if (this.$store.state.gametypeObj.PlayID === '1010') {
        let first = this.getRandomArrayElements(this.ballArr, 1)
        this.$store.commit('SET_REPLAYCURRENTNUMARR', first)
        let arr = JSON.parse(JSON.stringify(this.ballArr))
        var index = arr.indexOf(first[0])
        arr.splice(index, 1)
        this.$store.commit('SET_REPLAYCURRENTNUMARRBACK', this.getRandomArrayElements(arr, this.$store.state.gametypeObj.MinRoundNumCount * 1))
      } else {
        this.$store.commit('SET_REPLAYCURRENTNUMARR', this.getRandomArrayElements(this.ballArr, this.$store.state.gametypeObj.BetNumCount))
      }
      this.WagerMode = '2'
    },
    // 添加至购物车
    addCard() {
      let flag = false
      let noticeNum = 0
      if (this.$store.state.gametypeObj.PlayID === '1010') { // 胆拖
        if (this.$store.state.currentNumArr.length < this.$store.state.gametypeObj.MinBaseCount * 1) {
          flag = true
          noticeNum = this.$store.state.gametypeObj.MinBaseCount
        }
        if (this.$store.state.currentNumArrBack.length < this.$store.state.gametypeObj.MinRoundNumCount * 1) {
          flag = true
          noticeNum = this.$store.state.gametypeObj.MinRoundNumCount
        }
      } else {
        if (this.$store.state.currentNumArr.length < this.$store.state.gametypeObj.BetNumCount * 1) {
          flag = true
          noticeNum = this.$store.state.gametypeObj.BetNumCount
        }
      }
      if (flag) {
        let obj = {
          msg: `Please select ${noticeNum} numbers`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return false
      }
      // betlist 不能超过20注 单票最多不能超过
      if (this.$store.state.betLists9.length === this.SaleGameData9.MaxBetsPerTick * 1 && this.$route.query.index === undefined) {
        let obj = {
          msg: `The maximum number of bets ${+this.SaleGameData9.MaxBetsPerTick} has been exceeded.`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }

      function compare(val1, val2) {
        return val1 - val2
      }

      // 普通 或者胆码   第一位
      let numList = []
      numList.push(this.$store.state.currentNumArr.sort(compare).join('|') + '|')
      // 拖码   第二位
      let numListSecond = []
      numListSecond.push(this.$store.state.currentNumArrBack.sort(compare).join('|') + '|')
      // Num 投注号码拼接
      let betnum = ''
      if (this.$store.state.gametypeObj.PlayID === '1010') {
        betnum = numList.join('-') + '-' + numListSecond.join('-')
      } else {
        betnum = numList.join('-')
      }
      // 设置玩法类型
      let SubPlayTypeID = '0'
      // 计算 转换注数
      let draws = 0
      if (this.$store.state.gametypeObj.PlayID * 1 >= 1001 && this.$store.state.gametypeObj.PlayID * 1 <= 1005) {
        draws = this.$common.comb(this.$store.state.currentNumArr.length, this.$store.state.gametypeObj.BetNumCount)
        SubPlayTypeID = '0'
      } else if (this.$store.state.gametypeObj.PlayID * 1 >= 1006 && this.$store.state.gametypeObj.PlayID * 1 <= 1009) {
        draws = this.$common.comb(this.$store.state.currentNumArr.length, this.$store.state.gametypeObj.BetNumCount)
        SubPlayTypeID = '1'
      } else if (this.$store.state.gametypeObj.PlayID * 1 === 1010) {
        draws = this.$common.comb(this.$store.state.currentNumArrBack.length, 1)
        SubPlayTypeID = '2'
      }
      // 玩法还没有选择提示选择玩法
      if (!this.$store.state.gametypeObj.PlayID || !this.$store.state.gametypeObj.PlayName) {
        let obj = {
          msg: 'Please select the bet number type',
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return false
      }
      let data = {
        draws: draws, // stake number
        SubPlayTypeID: SubPlayTypeID, // 玩法类型 3D默认为单式 ：0—单式、1—复式、2—胆拖
        NumberType: this.gamerule,
        rulename: this.gameRuleOption.find(item => this.gamerule === item.value).text,
        typename: this.$store.state.gametypeObj.PlayName,
        PlayTypeID: this.$store.state.gametypeObj.PlayID, // 玩法编号
        WagerMode: this.WagerMode, // 选号方式：0—其它方式，1—手选，2—机选，3—手选
        MultiTimes: 1, // 单注倍数
        Num: betnum, // 号码字符串，如。如1|2|3|-4|。-为选号区域分割，|为区域内号码分割。3D的则如下：1|2|3| 1|2|-1|3|...
        // money: this.form.totalAmount
      }
      let betList = this.$store.state.betLists9
      if (this.$route.query.index !== undefined) {
        betList.splice(this.$route.query.index * 1, 1, data)
      } else {
        betList.push(data)
      }
      this.SET_BETLIST(betList)
      // 初始
      this.$store.commit('SET_NUMFLAG')
      this.WagerMode = '1'
      // 重置numObj
      this.$store.commit('SET_CLEARCURRENTNUMARR')
      this.$store.commit('SET_CLEARCURRENTNUMARRBACK')
      if (this.$route.query.index) {
        this.$router.push({name: 'Lotto'})
      }
      return true
    },
    // 跳转
    toCard() {
      // 假如已经到达一样的限制数量 直接跳
      if (this.$store.state.betLists9.length === this.SaleGameData9.MaxBetsPerTick * 1 && this.$route.query.index === undefined) {
        this.$router.push({name: 'betslip'})
      } else {
        // 修改进入购物车逻辑 1、没有选好点击confirm随机生成投注号，在点击confirm进入购物车页面 2、当前半选号 提示按照规则选号 3、全选了一注符合规则的号码，点击confirm进入到购物车，顺带把当前页面的号码加入到购物车
        if (this.$store.state.betLists9.length === 0 && this.$store.state.gametypeObj.PlayID === '1010' && this.$store.state.currentNumArr.length === 0 && this.$store.state.currentNumArrBack.length === 0) { // 胆拖
          this.randomBet()
        } else if (this.$store.state.betLists9.length === 0 && this.$store.state.gametypeObj.PlayID !== '1010' && this.$store.state.currentNumArr.length === 0) {
          this.randomBet()
        } else {
          if (sessionStorage.getItem('betLists9')) {
            sessionStorage.removeItem('betLists9')
          }
          if (sessionStorage.getItem('oneMore')) {
            sessionStorage.removeItem('oneMore')
          }
          if (this.$store.state.gametypeObj.PlayID === '1010' && this.$store.state.currentNumArr.length === 0 && this.$store.state.currentNumArrBack.length === 0) {
            storage.set('SaleGameData9', this.SaleGameData9)
            this.$router.push({name: 'betslip'})
          } else if (this.$store.state.gametypeObj.PlayID !== '1010' && this.$store.state.currentNumArr.length === 0) {
            storage.set('SaleGameData9', this.SaleGameData9)
            this.$router.push({name: 'betslip'})
          } else {
            if (this.addCard()) {
              storage.set('SaleGameData9', this.SaleGameData9)
              this.$router.push({name: 'betslip'})
            }
          }
        }
      }
      // 假如没有选的话  就随机生成一注
      // if (this.$store.state.betLists9.length === 0) {
      //   this.randomBet()
      //   this.addCard()
      // }
      // storage.set('SaleGameData9', this.SaleGameData9)
      // this.$router.push({path: '/betslip'})
    },
  },
}
</script>


<style lang="less" scoped>
.lotto {
  overflow-x: hidden;

  /deep/ .v-chip.v-size--default {
    height: 28px;
  }
  /*padding-bottom: 176px;*/
}
</style>
