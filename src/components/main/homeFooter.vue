<template>
  <div>
    <v-footer
        :app="showFooter"
        fixed
        :elevation="!isBetslip ? 10 : 0"
        class="py-0  white"
        :class="[showFooter ? 'd-block' : 'd-none', !isBetslip ? ['transition-swing', 'rounded-t-lg', 'px-2'] : ['px-0']]"
      >
      <v-container class="px-0 bet-cart" :class="!isBetslip ? 'py-2' : 'py-0'">
        <!--非购物车页面-->
        <div class="twoBtn" v-if="!isBetslip">
          <p class="body-2 text-center">Num.Of draw(s)<span class="pl-2 h6 font-weight-bold primary--text">{{drawNum}}</span></p>
          <v-row
            justify="space-around"
          >
            <v-col md="4">
              <!--<v-btn block color="delicate text&#45;&#45;disabled" v-if="betLists9.length === 0" class="text-capitalize">Add To Cart</v-btn>-->
              <v-btn block color="accent" class="text-capitalize" @click="addToCard">
                Add To Cart
                <div
                  class="rounded-circle d-inline-block ml-2 white accent--text"
                  style="width: 20px; height: 20px;"
                >{{betLists9.length}}</div>
              </v-btn>
            </v-col>
            <v-col md="4">
              <v-btn block color="primary" class="text-capitalize" @click="toCard">Confirm</v-btn>
            </v-col>
          </v-row>
        </div>

        <div v-if="isBetslip" class="primary py-3 white--text text-center" >
          <p class="mb-0 text-body-2" v-if="currentIssue" @click="pay">Pay from my wallet</p>
          <p class="mb-0 text-body-2" v-if="!currentIssue">Accept Changes</p>
          <p class="mb-0 text-caption" v-if="!currentIssue">20200230203203 Change to 23234234234</p>
        </div>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'homeFooter',
    components: {
    },
    data() {
      return {
        showFooter: false, // 当前组件是否显示
        isBetslip: false, // 是否是购物车页面
        currentIssue: true, // 是否是当前期
      }
    },
    computed: {
      ...mapGetters(['betLists9']),
      // 计算draw数量
      drawNum() {
        let num = 0
        this.$store.state.betLists9.forEach((item) => {
          num += item.draws
        })
        return num
      }
    },
    watch: {
      '$route': {
        handler(newVal, oldVal) {
          this.isShowFootNav()
        }
      }
    },
    beforeMount() {
      this.isShowFootNav()
    },
    created() {
    },
    methods: {
      // 添加到购物差
      addToCard() {
        let obj = {
          msg: 'Please choose Num',
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        if (this.$store.state.gameType === '1' || this.$store.state.gameType === '2') {
          if (this.$store.state.numObj.Digits.length > 0 && this.$store.state.numObj.Tens.length > 0 && this.$store.state.numObj.Hundreds.length > 0) {
            console.log(99999)
            this.eventBus.$emit('addToCard')
          } else {
            this.$store.commit('SET_MSG', obj)
          }
        } else if (this.$store.state.gameType === '3') {
          if (this.$store.state.numObj.Digits.length > 0 || this.$store.state.numObj.Tens.length > 0 || this.$store.state.numObj.Hundreds.length > 0) {
            console.log(88888)
            this.eventBus.$emit('addToCard')
          } else {
            this.$store.commit('SET_MSG', obj)
          }
        }
      },
      // 判断是否显示底部导航
      isShowFootNav() {
        console.log(this.$route)
        if (this.$route.name === 'result') {
          this.showFooter = false
        } else {
          this.showFooter = true
        }
        if (this.$route.name === 'betslip') {
          this.isBetslip = true
        } else {
          this.isBetslip = false
        }
      },
      // 投注
      pay() {
        this.eventBus.$emit('bet')
      },
      toCard() {
        // this.$router.push({path: 'betslip'})
        this.eventBus.$emit('toCard')
      }
    }
  }
</script>

<style lang="less">
  .bet-cart{
    position: relative;
    .twoBtn{
    }
  }

  .v-bottom-sheet.v-dialog{
    overflow: auto;
    background-color: #ffffff;
  }
</style>
