<template>
  <div class="ilotDrawNotice">
    <!--第一步进入  -->
    <div class="to-watch white--text" v-if="mesFlag">
      <div class="rounded-pill to-watch-circle d-flex">
        <div class="img-box">
          <img src="../../assets/img/905logo.png"/>
        </div>
        <div class="pl-4">
          <p class="text-caption my-1 " style="padding-top: 2px">NO.{{$store.state.oldIssue9}}</p>
          <p class="mb-0 text-body-1" @click="mesFlag=false" style="cursor: pointer">Check to watch</p>
        </div>
        <!--关闭按钮-->
        <v-icon class="close-btn text--black mt-1" @click="closeNotice">mdi-close-circle</v-icon>
        <div class="btn-line"></div>
      </div>
    </div>
    <!--开奖动画irfame-->
    <div class="watch-draw py-4 " v-else>
      <v-responsive :aspect-ratio="4/3" >
        <iframe :src="weburl"
                id="ifrme"
                scrolling="no"
                frameborder="0"
                width="100%"
                height="100%"></iframe>
      </v-responsive>
      <v-icon color="white" large class="draw-right" @click="closeNotice">mdi-chevron-right</v-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ilotDrawNotice',
    components: {
    },
    data() {
      return {
        mesFlag: true,
        weburl: ''
      }
    },
    computed: {},
    watch: {

    },
    beforeMount() {
      this.weburl = process.env.VUE_APP_LOTTERY_DRAWIFRAMEURL
    },
    created() {
    },
    methods: {
      closeNotice() {
        this.$store.commit('SET_DRAWNOTICE', false)
      }
    }
  }
</script>

<style lang="less">
  .ilotDrawNotice{
    .to-watch{
      position: absolute;
      height: 100px;
      top: 82px;
      right: 5px;
      &-circle{
        background: rgba(0, 0, 0, 0.8);
        height: 60px;
        width: 220px;
        padding: 1px;
        position: relative;
        .img-box{
          width: 58px;
          height: 58px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        /*关闭按钮*/
        .close-btn{
          position: absolute;
          bottom: -40px;
          left: 50%;
          cursor: pointer;
        }
        /*关闭线*/
        .btn-line{
          position: absolute;
          left: calc(50% + 11px);
          bottom: -20px;
          width: 2px;
          height: 20px;
          background: rgba(0, 0, 0, 0.8);
        }
      }
    }
    .watch-draw{
      width: 100%;
      position: absolute;
      top: 82px;
      right: 0px;
      overflow-y: auto;
      max-width: 500px;
      background: rgba(0, 0, 0, 0.8);
      padding-left: 16px;
      padding-right: 40px;
      .draw-right{
        position: absolute;
        right: 2px;
        top: 50%;
        margin-top: -18px;
      }
    }
  }
</style>
