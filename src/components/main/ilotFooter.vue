<template>
  <div
    class="ilotFooter"
    :class="[showFooter ? 'd-block' : 'd-none', !isBetslip ? ['transition-swing', 'rounded-t-lg', 'px-0'] : ['px-0']]"
  >
    <!--非购物车页面-->
    <div class="twoBtn" v-show="!isBetslip">
      <p class="body-2 text-center pt-1 mb-0 text--secondary">Lines {{drawNum}}</p>
      <div style="width: 100%;overflow-x: hidden;" class="d-flex justify-space-between">
        <div style="width: 50%;" class="pa-2">
          <v-btn block color="accent" class="text-capitalize" @click="addToCard" depressed style="cursor: pointer">
            Add To Cart
            <div
              class="rounded-circle d-inline-block ml-2 white accent--text"
              style="width: 20px; height: 20px;line-height: 20px"
            >{{betLists9.length}}</div>
          </v-btn>
        </div>
        <div style="width: 50%;" class="pa-2">
          <v-btn block :color="$store.state.gameIssueData9.IssueStat === '100' ? 'primary' : 'delicate'" class="text-capitalize" @click="toCard" depressed style="cursor: pointer">Confirm</v-btn>
        </div>
      </div>
    </div>
    <!--购物车页面-->
    <div v-show="isBetslip" class="py-3 white--text text-center" :class="[(loading || $store.state.betLists9.length === 0 || !$store.state.gameIssueData9.Issue) ? ['grey lighten-1'] : ['primary']]" style="cursor: pointer">
      <template v-if="!$store.state.gameIssueData9.Issue">
        <p class="mb-0 text-body-2" v-show="!$store.state.gameIssueData9.Issue || $store.state.gameIssueData9.Issue !== $store.state.oldIssue9">Wait for next issue</p>
      </template>
      <template v-else>
        <p class="mb-0 text-body-2" v-show="$store.state.gameIssueData9.Issue === $store.state.oldIssue9" @click="pay">Pay</p>
        <p class="mb-0 text-body-2" v-show="$store.state.gameIssueData9.Issue !== $store.state.oldIssue9" @click="acceptChange">Accept Changes</p>
        <p class="mb-0 text-caption" v-show="$store.state.gameIssueData9.Issue !== $store.state.oldIssue9" @click="acceptChange">{{$store.state.oldIssue9}} Change to {{$store.state.gameIssueData9.Issue}}</p>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'ilotFooter',
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
      ...mapGetters(['betLists9', 'loading']),
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
      // 接受改变
      acceptChange() {
        if (this.loading || this.$store.state.betLists9.length === 0 || !this.$store.state.gameIssueData9.Issue) return
        this.$store.commit('SET_OLDISSUE', this.$store.state.gameIssueData9.Issue)
      },
      // 添加到购物差
      addToCard() {
        this.eventBus.$emit('addToCard')
        this.$changeShow(window.platform + '-5/90-game', {waySelect1: 'Add To Cart'})
      },
      // 判断是否显示底部导航
      isShowFootNav() {
        console.log(this.$route)
        if (this.$route.name === 'result' || this.$route.name === 'resultDetail' || this.$route.name === 'rule') {
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
        this.$changeShow(window.platform + '-5/90-game', {waySelect1: 'Pay from my wallet'})
        if (this.loading || this.$store.state.betLists9.length === 0 || !this.$store.state.gameIssueData9.Issue) return
        this.eventBus.$emit('bet')
      },
      toCard() {
        this.$changeShow(window.platform + '-5/90-game', {waySelect1: 'Confirm'})
        if (this.$store.state.gameIssueData9.IssueStat !== '100') return
        this.eventBus.$emit('toCard')
      }
    }
  }
</script>

<style lang="less">
  .ilotFooter{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
    /*height: 85px;*/
    /*position: absolute;*/
    /*bottom: 0;*/
    /*background: red;*/
  }
  .twoBtn{
    height: 100%;
    /*border-top: 1px solid #ccc;*/
    box-shadow:0px -1px 2px rgba(0, 0, 0, 0.1);
  }
  /*.bet-cart{*/
  /*position: relative;*/
  /*.twoBtn{*/
  /*border-top: 1px solid #ccc;*/
  /*}*/
  /*}*/

  .v-bottom-sheet.v-dialog{
    overflow: auto;
    background-color: #ffffff;
  }
</style>
