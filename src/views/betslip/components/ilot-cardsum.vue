<template>
  <div class="cardsum">
    <div class="d-flex justify-space-between py-1">
      <span class="text--secondary pt-1 text-caption">Stake Per Line</span>
      <div class="moneyInput">
        <div class="d-flex justify-end moneyInputBox">
          <div class="minusplus">
            <v-icon
                color="delicate"
                @click="minusClick"
            >
              mdi-minus
            </v-icon>
          </div>
          <div class="inputBox d-flex font-weight-bold">
            <span class="pl-2 text-caption">₦</span>
            <v-text-field
                class="moneyInp my-0 py-0 text-caption"
                v-model.number="singleStake"
                type="number"
                hide-details
                oninput="if(value.length>5)value=value.slice(0,5)"
                @blur="changePoint"
                @change="singleStakeChange"
            ></v-text-field>
            <!--<input type="number" v-model="singleStake" @change="singleStakeChange"/>-->
          </div>
          <div class="minusplus">
            <v-icon
                color="delicate"
                @click="plusClick"
            >
              mdi-plus
            </v-icon>
          </div>
        </div>
      </div>
    </div>
    <!--Total Stake Number-->
    <div class="d-flex justify-space-between py-1">
      <span class="text--secondary text-caption">Total Lines</span>
      <span class="font-weight-bold text-caption">{{ totalStakeNumber }}</span>
    </div>
    <!--Total Stake-->
    <div class="d-flex justify-space-between py-1">
      <span class="text--secondary text-caption">Total Stake</span>
      <span class="font-weight-bold text-caption">{{ totalStake | money('₦') }}</span>
    </div>
    <!--Coupon-->
    <div class="d-flex justify-space-between py-1" style="overflow: hidden;cursor: pointer" @click="selectCoupon">
      <span class="text--secondary text-caption">Coupon</span>
      <div>
        <strong
            class="primary--text text-caption">{{
            parseFloat(betCoupon.coupon > 0 ? betCoupon.coupon : 0).toFixed(2)
          }}</strong>
        <!--:disabled="availableCoupon.length===0"-->
        <v-btn icon color="grey lighten-1" style="margin-right: -12px;margin-top: -3px;">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <!--Payment-->
    <div class="d-flex justify-space-between py-1">
      <span class="text--secondary text-caption">Pay</span>
      <span class="font-weight-bold text-caption">{{ payment | money('₦') }}</span>
    </div>
    <!--Max win-->
    <div class="d-flex justify-space-between py-1">
      <span class="text--secondary text-caption">Potential Win</span>
      <span class="font-weight-bold text-caption">{{ maxwin | money('₦') }}</span>
    </div>
    <!--优惠券列表-->
    <v-bottom-sheet class="cart-style" v-model="showCouponsList">
      <couponsList v-if="showCouponsList" @closeCoupons="closeCoupons"></couponsList>
    </v-bottom-sheet>
  </div>
</template>

<script type="text/javascript">
import couponsList from '@/components/main/couponsList'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'cardList',
  data() {
    return {
      singleStake: 10,
      showCouponsList: false,
      perStake: 1,
      totalStake: 100,
      totalStakeNumber: 0,
      payment: 200,
      maxwin: 0,
    }
  },
  props: {},
  components: {
    couponsList,
  },
  computed: {
    ...mapGetters(['betCoupon', 'betLists9', 'availableCoupon']),
  },
  activated() {
    this.calTotalDraws(this.$store.state.betLists9)
  },
  created() {
  },
  mounted() {
  },
  watch: {
    totalStake() {
      this.getCoupon()
    },
    betLists9(newValue, oldValue) {
      this.calTotalDraws(this.$store.state.betLists9)
    },
    singleStake(value) {
      this.calTotalDraws(this.$store.state.betLists9)
      this.$emit('changePerStake', this.singleStake / this.$store.state.gameIssueData9.MoneyPerBet)
    },
    deep: true,
  },
  methods: {
    ...mapMutations(['SET_COUPON', 'COUPON_DATA']),
    // 减号操作
    minusClick() {
      if (this.singleStake <= 9) return
      this.singleStake = this.singleStake * 1 - this.$store.state.gameIssueData9.MoneyPerBet * 10
    },
    // 加号操作
    plusClick() {
      this.singleStake = this.singleStake * 1 + this.$store.state.gameIssueData9.MoneyPerBet * 10
    },
    changePoint() {
      this.singleStake = String(this.singleStake).replace('.', '')
    },
    singleStakeChange(value) {
      let vnew = value
      if (value > 10000) {
        vnew = 10000
      }
      this.singleStake = vnew
      this.calTotalDraws(this.$store.state.betLists9)
      this.$emit('changePerStake', this.singleStake / this.$store.state.gameIssueData9.MoneyPerBet)
      if (vnew * 1 < this.$store.state.gameIssueData9.MoneyPerBet * 1) {
        this.singleStake = this.$store.state.gameIssueData9.MoneyPerBet
      }
    },
    // 获取可用优惠券
    async getCoupon() {
      let list = JSON.parse(JSON.stringify(this.$store.state.betLists9))
      let playMethodArr = []
      list.forEach((item, index) => {
        let playTypeId = item.PlayTypeID
        // 计算判断是多组还是单式 还是复式
        let countNum = 0
        let gameTypeArr = item.Num.split('|-')
        gameTypeArr.forEach((gameTypeItem) => {
          countNum += gameTypeItem.split('|').length
        })
        countNum--
        if (!playMethodArr.includes(playTypeId)) {
          playMethodArr.push(playTypeId)
        }
      })
      const res = await this.$api.availableCoupon({
        normalData: true,
        data: {
          details: [{
            betMoney: this.totalStake,
            playMethod: playMethodArr.join('|'),
          }],
          gameType: 0,
          gameId: this.$store.state.Content.GameID,
        },
      })
      if (res.code !== 0) return
      let dataList = res.data.availableCoupons
      if (dataList !== undefined && dataList.length > 0) {
        let max = parseFloat(dataList[0].faceValue)
        let num = 0
        let havCoupon = false // 优惠券列表是否有已选优惠券数据
        dataList.forEach((val, i) => {
          val.expireEndTime = this.$moment(val.expireEndTime).format('DD/MM/YYYY')
          val.expireBeginTime = this.$moment(val.expireBeginTime).format('DD/MM/YYYY')
          // 判断可用优惠券是否有已选的优惠券
          if (val.couponHid === this.betCoupon.couponId) {
            havCoupon = true
          }
          // 获取可用金额最大的优惠券
          if (max < parseFloat(val.faceValue)) {
            max = parseFloat(val.faceValue)
            num = i
          }
        })
        // 保存可用优惠券数据
        this.COUPON_DATA(dataList)
        // 判断是否使用优惠券
        if (this.betCoupon.status && !havCoupon) {
          let obj = {
            status: true, // 是否使用优惠券
            couponId: dataList[num].couponHid,
            coupon: dataList[num].faceValue,
            couponCode: dataList[num].couponCode,
          }
          this.SET_COUPON(obj)
        }
      } else {
        // 当没有可用优惠券
        let obj = {
          status: this.betCoupon.status, // 是否使用优惠券
          couponId: '',
          coupon: 0,
          couponCode: '',
        }
        this.SET_COUPON(obj)
        // 清除之前优惠券数据
        let arr = []
        this.COUPON_DATA(arr)
      }
      this.calTotalDraws(this.$store.state.betLists9)
    },
    // 选择优惠券
    selectCoupon() {
      // if (this.availableCoupon.length === 0) {
      //   return
      // }
      this.showCouponsList = true
    },
    // 关闭优惠券列表
    closeCoupons() {
      this.calTotalDraws(this.$store.state.betLists9)
      this.showCouponsList = false
    },
    // 计算订单数据值
    async GameList(betLists9) {
      let data = {
        GameID: this.$store.state.Content.GameID,
      }
      let res = await this.$api.gamePlayList({data})
      if (res.RetCode === '0') {
        // this.SET_THREEDCOLORLIST(this.Format03)
        this.$store.commit('SET_GAMELIST9', res.Format02)
        this.gameIssue(betLists9)
      }
    },
    async gameIssue(betLists9) {
      let draws = 0
      let maxwin = 0
      let data = {
        GameID: this.$store.state.Content.GameID,
        Issue: '-1',
        RecBegin: 0,
        QueryCount: 30,
      }
      let res = await this.$api.gameIssue({data})
      this.$store.commit('SET_GAMEISSUEDATA', res.Format02[0])
      betLists9.forEach((item) => {
        draws += item.draws
        // 设置选中的gametypeobj
        let obj = this.$store.state.gameList9.find(ii => item.PlayTypeID === ii.PlayID)
        // 可能中的组合数
        let maybeTime = 1
        let MaxPrizeTimes = item.rulename === 'DOUBLE CHANCE' ? obj.MaxPrizeTimes / 2 : obj.MaxPrizeTimes
        maxwin += MaxPrizeTimes * this.singleStake * maybeTime
      })
      this.totalStakeNumber = draws
      this.totalStake = this.singleStake * this.totalStakeNumber
      this.payment = this.totalStake - parseFloat(this.betCoupon.coupon > 0 ? this.betCoupon.coupon : 0)
      this.maxwin = maxwin
      this.$store.commit('SET_BETMONEYOBJ', {
        totalStake: this.totalStake, // 总金额
        coupon: this.betCoupon.coupon > 0 ? this.betCoupon.coupon : 0, // 优惠卷金额
        total: this.payment, // 付款金额（减去了优惠卷）
        totalStakeNumber: draws,
        maxwin: this.maxwin,
      })
      this.$emit('changePerStake', this.singleStake / this.$store.state.gameIssueData9.MoneyPerBet)
    },
    async calTotalDraws(betLists9) {
      if (sessionStorage.getItem('betLists9')) {
        this.GameList(betLists9)
      } else {
        let draws = 0
        let maxwin = 0
        betLists9.forEach((item) => {
          draws += item.draws
          // 设置选中的gametypeobj
          let obj = this.$store.state.gameList9.find(ii => item.PlayTypeID === ii.PlayID)
          // 可能中的组合数
          let maybeTime = 1
          let MaxPrizeTimes = item.rulename === 'DOUBLE CHANCE' ? obj.MaxPrizeTimes / 2 : obj.MaxPrizeTimes
          maxwin += MaxPrizeTimes * this.singleStake * maybeTime
        })
        this.totalStakeNumber = draws
        this.totalStake = this.singleStake * this.totalStakeNumber
        this.payment = this.totalStake - parseFloat(this.betCoupon.coupon > 0 ? this.betCoupon.coupon : 0)
        this.maxwin = maxwin
        this.$store.commit('SET_BETMONEYOBJ', {
          totalStake: this.totalStake, // 总金额
          coupon: this.betCoupon.coupon > 0 ? this.betCoupon.coupon : 0, // 优惠卷金额
          total: this.payment, // 付款金额（减去了优惠卷）
          totalStakeNumber: draws,
          maxwin: this.maxwin,
        })
        this.$emit('changePerStake', this.singleStake / this.$store.state.gameIssueData9.MoneyPerBet)
      }
    },
  },
}
</script>

<style lang="less">
.cardsum {
  .moneyInputBox {
    .inputBox {
      max-width: 120px;
      border-top: 1px solid #D9D9D9;
      border-bottom: 1px solid #D9D9D9;
      overflow: hidden;

      span {
        display: inline-block;
        width: 20px;
        height: 28px;
        line-height: 28px;
      }

      .moneyInp {
        width: calc(100% - 20px);

        .v-input__slot {
          margin-bottom: 0;
        }
      }

      .v-text-field input {
        padding: 4px 0 4px;
      }
    }

    .minusplus {
      border: 1px solid #D9D9D9;
      line-height: 24px;
    }
  }

  .moneyInput {
    width: 120px;

    .v-text-field__details {
      height: 0 !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;

      .v-messages theme--light {
        height: 0 !important;
        min-height: 0 !important;
      }
    }
  }

  .v-btn--icon.v-size--default {
    height: 21px;
  }
}
</style>
