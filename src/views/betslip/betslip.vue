<template>
  <div class="betslip">
    <div class="px-2" v-if="$store.state.betLists9.length > 0">
      <!--购物车清单列表-->
      <ilot-cardlist></ilot-cardlist>
      <!--投注汇总-->
      <ilot-cardsum class="py-2" @changePerStake="changePerStake"></ilot-cardsum>
    </div>
    <!--成功提示框-->
    <betSuccess :orderId="orderId" v-if="showSuccess" :gamerule="gamerule" :gametype="gametype"
                @closeDialog="closeDialog"></betSuccess>
  </div>
</template>

<script>
import {money, time} from '@/utils/filter'
import {mapGetters, mapMutations} from 'vuex'
import betSuccess from '@/components/main/betSuccess'
import storage from '@/utils/storage'
import ilotCardlist from './components/ilot-cardlist'
import ilotCardsum from './components/ilot-cardsum'

export default {
  name: 'betslip',
  data() {
    return {
      form: {},
      showSuccess: false, // 显示投注成功弹窗
      times: 1, // 单注金额
      gametype: '',
      gamerule: '',
      orderId: '',
    }
  },
  components: {
    ilotCardlist,
    ilotCardsum,
    betSuccess,
  },
  computed: {
    ...mapGetters(['betCoupon']),
  },
  activated() {
    // 页面进入，主动把oldIssue9改成 新的期号
    this.$store.commit('SET_OLDISSUE', this.$store.state.gameIssueData9.Issue)
    this.form = storage.get('SaleGameData9')
    this.eventBus.$off('bet')
    this.eventBus.$on('bet', data => {
      this.bet()
    })
  },
  created() {
    if (sessionStorage.getItem('betLists9')) {
      if (!sessionStorage.getItem('store')) {
        window.location.reload()
        return
      }
      const betLists9 = JSON.parse(sessionStorage.getItem('betLists9'))
      this.SET_BETLIST(betLists9)
    }
  },
  deactivated() {
    sessionStorage.removeItem('betLists9')
  },
  destroyed() {
    sessionStorage.removeItem('betLists9')
  },
  methods: {
    ...mapMutations(['SET_BETLIST']),
    money,
    time,
    changePerStake(value) {
      console.log(value)
      this.times = value
    },
    async bet() {
      let dataList = JSON.parse(JSON.stringify(this.$store.state.betLists9))
      console.log(dataList)
      var NumList = []
      // let WagerMoney = 0
      dataList.forEach((item, index) => {
        let obj = {
          Num: '',
        }
        // 计算判断是多组还是单式 还是复式
        // let countNum = 0
        // let gameTypeArr = item.Num.split('|-')
        // gameTypeArr.forEach((gameTypeItem) => {
        //   countNum += gameTypeItem.split('|').length
        // })
        // countNum--
        let playTypeId = item.PlayTypeID
        obj.SubPlayTypeID = item.SubPlayTypeID// 玩法类型 3D默认为单式 ：0—单式、1—复式、2—胆拖
        obj.BetSN = ++index
        obj.PlayTypeID = playTypeId
        obj.WagerMode = item.WagerMode
        obj.MultiTimes = this.times
        obj.Num = item.Num
        obj.NumberType = item.NumberType
        NumList.push(obj)
        // WagerMoney += (item.draws * this.times * this.$store.state.gameIssueData9.MoneyPerBet)
      })
      let payCode = '0'
      if (this.betCoupon.coupon > 0) {
        payCode = '1'
      }
      let nowTime = new Date().getTime()
      let StartSaleTime = new Date(this.$common.toMyLocalTime(this.$store.state.gameIssueData9.StartSaleTime)).getTime()
      let EndSaleTime = new Date(this.$common.toMyLocalTime(this.$store.state.gameIssueData9.EndSaleTime)).getTime()
      if (nowTime < StartSaleTime) {
        let obj = {
          msg: `Start sale at  ${this.time(this.$common.toMyLocalTime(this.$store.state.gameIssueData9.StartSaleTime))}`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }
      if (nowTime > EndSaleTime) {
        let obj = {
          msg: `End sale at  ${this.time(this.$common.toMyLocalTime(this.$store.state.gameIssueData9.EndSaleTime))}`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }
      // 最大注数
      if (this.$store.state.betLists9.length > +this.form.MaxBetsPerTick) {
        let obj = {
          msg: `The maximum number of bets ${+this.form.MaxBetsPerTick} has been exceeded. Please delete it`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }
      // 单票最小金额
      if (this.$store.state.betMoneyObj.totalStake < this.form.MinMoneyPeTick) {
        let obj = {
          msg: `Please bet more than the minimum amount of ${money(this.form.MinMoneyPeTick, '₦')}`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }
      // 单票最大金额
      if (this.$store.state.betMoneyObj.totalStake > this.form.MaxMoneyPerTick) {
        let obj = {
          msg: `Please bet less than the maximum amount of ${money(this.form.MaxMoneyPerTick, '₦')}`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }
      this.$store.commit('SET_LOADING', true)
      let data = {
        Format01: {
          'UserID': this.$store.state.Content.PlayerID,
          'TimeStamp': new Date().getTime(),
          'Access-Token': this.$store.state.Content.Token,
          Lang: 'en_US',
          GameID: this.$store.state.gameIssueData9.GameID,
          WagerIssue: this.$store.state.gameIssueData9.Issue,
          TickSN: parseInt(new Date().getTime() / 1000),
          WagerType: '3',
          PromotionType: this.$store.state.gameIssueData9.PromotionType,
          WagerMoney: this.$store.state.betMoneyObj.totalStake + '00',
          MultiIssue: this.$store.state.gameIssueData9.MultiIssue,
          PayMode: payCode, // 是否使用优惠券
          couponHid: this.betCoupon.couponId, // 优惠券编码
          couponCode: this.betCoupon.couponCode, // 优惠券券码
        },
        Format02: NumList,
      }
      let res = await this.$api.gameBet({data})
      this.$store.commit('SET_LOADING', false)
      if (res.RetCode === '0') {
        this.gametype = this.$store.state.gametypeObj.PlayID
        this.gamerule = {'WINNING': '1', 'MACHINE': '2', 'DOUBLE CHANCE': 3}[this.$store.state.betLists9[this.$store.state.betLists9.length - 1].rulename]
        this.$store.commit('SET_BETLIST', [])
        // 设置投注成功的期号
        this.$store.commit('SET_WAGERISSUE', res.Format01.WagerIssue)
        this.orderId = res.Format01.OrderID
        sessionStorage.removeItem('betLists9')
        // 显示投注成功弹窗
        this.showSuccess = true
      } else {
        let obj = {
          msg: res.ERR_MSG,
          msgType: 'error',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
      }
      console.log('下注' + res.RetCode)
    },
    // 关闭投注成功提示弹窗
    closeDialog() {
      this.showSuccess = false
    },
  },
}
</script>


<style lang="less">
.betslip {
  /*padding-bottom: 76px;*/
}
</style>
