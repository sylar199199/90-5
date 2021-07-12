<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="520px"
  >
    <v-card>
      <v-icon class="text--secondary mt-3 mr-3 float-right"  @click="closePop">mdi-close</v-icon>
      <v-card-text class="px-sm-7 px-4">
        <v-container class="flex-column pa-0">
          <div class="text-center pt-3">
            <v-icon class="success-icon" color="primary">mdi-check-circle</v-icon>
          </div>
          <p class="text-center text-subtitle-1 text-sm-h4 black--text mt-1 mb-3 font-weight-bold">Submission Successful</p>
          <div>
            <!--3D-->
            <p class="d-flex justify-space-between align-center pt-3 mb-0">
              <span class="text-caption">Lottery</span>
              <strong class="black--text text-caption">5/90</strong>
            </p>
            <!--期号-->
            <p class="d-flex justify-space-between align-center pt-3 mb-0">
              <span class="text-caption">NO.</span>
              <strong class="black--text text-caption">{{$store.state.WagerIssue}}</strong>
            </p>
            <!--总金额-->
            <p class="d-flex justify-space-between align-center pt-3 mb-0">
              <span class="text-caption">Total stake</span>
              <strong class="black--text text-caption">{{$store.state.betMoneyObj.totalStake | money('₦')}}</strong>
            </p>
            <!--coupon-->
            <p class="d-flex justify-space-between align-center pt-3 mb-0">
              <span class="text-caption">Coupon</span>
              <strong class="black--text text-caption">-{{$store.state.betMoneyObj.coupon | money('₦')}}</strong>
            </p>
            <!--total-->
            <p class="d-flex justify-space-between align-center pt-3 mb-0">
              <span class="text-caption">Total</span>
              <strong class="black--text text-caption">{{$store.state.betMoneyObj.total | money('₦')}}</strong>
            </p>
            <!--max win-->
            <p class="d-flex justify-space-between align-center pt-3 mb-0">
              <span class="text-caption">Potential Win</span>
              <strong class="black--text text-caption">{{$store.state.betMoneyObj.maxwin | money('₦')}}</strong>
            </p>
          </div>
          <div class="d-flex pt-3">
            <v-card-actions class="pb-3 pt-2">
              <v-btn class="text-capitalize align-center font-weight-bold"
                     block
                     width="130"
                     elevation="0"
                     x-large
                     style="cursor: pointer"
                     color="primary"
                     outlined
                     @click="linkHistory">
                View details
              </v-btn>
            </v-card-actions>
            <v-card-actions class="px-sm-7 px-4 pb-3 pt-2">
              <v-btn class="text-capitalize align-center font-weight-bold"
                     block
                     elevation="0"
                     x-large
                     width="130"
                     style="cursor: pointer"
                     color="primary"
                     @click="linkMore">
                One more
              </v-btn>
            </v-card-actions>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'betSuccess',
    props: {
      orderId: {
        type: String,
        default: ''
      },
      gametype: {
        type: String,
        default: '1'
      },
      gamerule: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        dialog: true
      }
    },
    methods: {
      _isMobile() {
        let plat = navigator.userAgent.match( // 判断不同端
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
        return plat
      },
      linkHistory() {
        this.$changeShow(window.platform + '-3D-game', {paySuccessedGoWhere: 'lottery bet history'})
        if (Boolean(this._isMobile())) {
          // window.parent.postMessage({type: 'toh5lotteryBetHistory', gameId: this.$store.state.Content3D.GameID}, '*')
          window.parent.postMessage({type: 'h5lotteryTicketDetail', orderId: this.orderId}, '*')
        } else {
          window.parent.postMessage({type: 'pclotteryTicketDetail', orderId: this.orderId}, '*')
        }
      },
      linkMore() {
        if (Boolean(this._isMobile())) {
          window.parent.postMessage({type: 'toh5905Dlotto', gamerule: this.gamerule, gametype: this.gametype}, '*')
        } else {
          window.parent.postMessage({type: 'topc905lotto', gamerule: this.gamerule, gametype: this.gametype}, '*')
        }
        this.$emit('closeDialog', false,)
      },
      // 关闭弹窗
      closePop() {
        this.$changeShow(window.platform + '-3D-game', {paySuccessedGoWhere: 'close'})
        if (Boolean(this._isMobile())) {
          window.parent.postMessage({type: 'toh5lotto'}, '*')
        } else {
          window.parent.postMessage({type: 'topclotto'}, '*')
        }
        this.$emit('closeDialog', false,)
      }
    }
  }
</script>

<style lang="less">
  .success-icon{
    font-size: 80px !important;
    margin-right: -25px;
  }
  #codeInput{
    position: absolute;
    left: 0;
    opacity: 0;
  }
</style>
