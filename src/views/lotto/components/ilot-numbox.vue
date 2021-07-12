<template>
  <div class="numbox pb-sm-4">
    <div class="grey lighten-4 rounded ballBox pt-2">
      <div class="d-flex justify-center flex-wrap" style="padding-bottom: 100px">
        <ilot-ball
            v-for="(value, index) in ballArr"
            :onFlag="onFlag(value)"
            @ballClick="numClick(value)"
            :key="index"
            :disabledFlag="setBallDisabled(value)"
            :smallball="false"
        >
          {{ value }}
        </ilot-ball>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'numbox',
  data() {
    return {}
  },
  props: {
    ballArr: {
      type: Array,
      default: () => [],
    },
    // 是否拖码 false 是第一位的  true是拖码第二位的
    secondFlag: {
      type: Boolean,
      default: false,
    },
  },

  components: {},
  computed: {
    onFlag() {
      return (value) => {
        let arr = this.secondFlag ? this.$store.state.currentNumArrBack : this.$store.state.currentNumArr
        arr.includes(value)
        return arr.includes(value)
      }
    },
    setBallDisabled() {
      return function (value) {
        let flag = false
        if (this.secondFlag) { // 拖码
          flag = this.$store.state.currentNumArr.includes(value)
        } else { // 拖码
          flag = this.$store.state.currentNumArrBack.includes(value)
        }
        return flag
      }
    },
  },
  beforeCreate() {

  },
  created() {
  },
  mounted() {
  },
  methods: {
    numClick(num) {
      if (this.secondFlag) {
        this.$store.commit('SET_CURRENTNUMARRBACK', num)
        this.$emit('clickMoreNum', this.$store.state.currentNumBackFlag)
      } else {
        this.$store.commit('SET_CURRENTNUMARR', num)
        this.$emit('clickMoreNum', this.$store.state.currentNumFlag)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.numbox {
  .ballBox {

  }
}
</style>
