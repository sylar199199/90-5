<script src="../../../store/state.js"></script>
<template>
  <div class="cardList">
    <div v-for="(item, key) in $store.state.betLists9" :key="key">
      <div class="d-flex justify-space-between pt-2">
        <span class="font-weight-bold text-truncate text-body-2">5/90-{{ item.rulename }}-{{ item.typename }}</span>
        <span class="text--secondary text-truncate text-caption">Lines {{ item.draws }}</span>
        <v-icon class="text--disabled mt-1" small @click="delBetlist(key)">mdi-close-circle</v-icon>
      </div>
      <div class="d-flex justify-space-between">
        <div>
          <div>
            <ilot-ball
                v-for="(value, index) in item.Num.split('-')[0].split('|')"
                :onFlag="true"
                :key="index"
                class="my-1"
                v-if="value && value !== '255'"
            >
              {{ value }}
            </ilot-ball>
            <span v-if="item.Num.indexOf('-') > -1">-</span>
            <template v-if="item.Num.indexOf('-') > -1">
              <ilot-ball
                  v-for="(value, index) in item.Num.split('-')[1].split('|')"
                  :onFlag="true"
                  :key="index + 100"
                  class="my-1"
                  v-if="value && value !== '255'"
              >
                {{ value }}
              </ilot-ball>
            </template>
          </div>
        </div>
        <v-icon small @click="jumpto(key)">mdi-chevron-right</v-icon>
      </div>
      <v-divider style="opacity: 0.5"></v-divider>
    </div>
  </div>
</template>

<script type="text/javascript">

import {mapMutations} from '_vuex@3.6.2@vuex'

export default {
  name: 'cardList',
  data() {
    return {}
  },
  props: {
    // cardList数据
    cardList: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  components: {},
  computed: {},
  created() {
    if (sessionStorage.getItem('betLists9')) {
      const betLists9 = JSON.parse(sessionStorage.getItem('betLists9'))
      this.SET_BETLIST(betLists9)
    }
  },
  mounted() {
    console.log('betList9', this.$store.state.betLists9)
  },
  methods: {
    ...mapMutations(['SET_BETLIST']),
    // 删除对应购物车数据
    delBetlist(index) {
      let arr = this.$store.state.betLists9
      arr.splice(index, 1)
      this.$store.commit('SET_BETLIST', arr)
    },
    // 跳回投注页面
    jumpto(index) {
      Array.prototype.remove = function (val) {
        var index = this.indexOf(val)
        if (index > -1) {
          this.splice(index, 1)
        }
      }
      let betObj = this.$store.state.betLists9[index]
      // 赋值rule 跟 type
      this.$store.commit('SET_GAMETYPEOBJ', this.$store.state.gameList9.find(item => this.$store.state.betLists9[index].PlayTypeID === item.PlayID))
      let firstArr = betObj.Num.split('-')[0].split('|')
      firstArr.remove('')
      if (betObj.Num.indexOf('-') > -1) {
        let secondArr = betObj.Num.split('-')[1].split('|')
        secondArr.remove('')
        this.$store.commit('SET_REPLAYCURRENTNUMARR', firstArr)
        this.$store.commit('SET_REPLAYCURRENTNUMARRBACK', secondArr)
      } else {
        this.$store.commit('SET_REPLAYCURRENTNUMARR', firstArr)
      }
      this.$router.push({
        name: 'Lotto',
        query: {index: index},
      })
      // Array.prototype.remove = function(val) {
      //   var index = this.indexOf(val)
      //   if (index > -1) {
      //     this.splice(index, 1)
      //   }
      // }
      // let betObj = this.$store.state.betLists9[index]
      // this.$store.commit('SET_GAMETYPE', betObj.PlayTypeID)
      // let arr0 = betObj.Num.split('-')[2].split('|')
      // let arr1 = betObj.Num.split('-')[1].split('|')
      // let arr2 = betObj.Num.split('-')[0].split('|')
      // arr0.remove('')
      // arr1.remove('')
      // arr2.remove('')
      // let newNunObj = {
      //   Digits: arr0[0] === '' || arr0[0] === '255' ? [] : arr0,
      //   Tens: arr1[0] === '' || arr1[0] === '255' ? [] : arr1,
      //   Hundreds: arr2[0] === '' || arr2[0] === '255' ? [] : arr2
      // }
      // this.$store.commit('SET_REPLAYNUMOBJ', newNunObj)
      // // this.delBetlist(index)
      // this.$router.push({ path: '3D', query: { index: index }})
    },
  },
}
</script>

<style lang="less" scoped>
.cardList {
  .gameName {
    display: inline-block;
    width: 90px;
  }
}
</style>
