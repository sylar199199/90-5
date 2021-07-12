<template>
  <v-btn
    class="mx-2 text-body-1 font-weight-bold mb-2"
    :class="[onFlag ? ['white--text'] : ['primary--text'], smallball ? 'smallball' : '']"
    fab
    depressed
    :disabled="disabledFlag"
    :small="mobileSize"
    :color="onFlag ? 'primary' : 'white'"
    @click="ballClick"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
  export default {
    name: 'ball',
    props: {
      // 是否显示右边搜索按钮
      onFlag: {
        type: Boolean,
        default: false
      },
      // 是否禁用
      disabledFlag: {
        type: Boolean,
        default: false
      },
      // 是否小球
      smallball: {
        type: Boolean,
        default: true
      },
    },
    computed: {
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return true
          // case 'sm': return 400
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
          default : return false
        }
      },
    },
    methods: {
      ballClick() {
        this.$emit('ballClick')
      }
    }
  }
</script>
<style lang="less" scoped>
  .smallball.v-btn--fab.v-size--small{
    width: 30px;
    height: 30px;
  }
</style>
