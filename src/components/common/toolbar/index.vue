<template>
  <v-toolbar dense dark  color="primary" class="fixed-bar" flat>
    <v-btn icon  @click="goBackEvent" v-if="!(!_isMobile() && $route.name === 'Lotto')">
      <v-icon class="text-h4">mdi-chevron-left</v-icon>
    </v-btn>
    <v-toolbar-title class="pl-0">{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in itemList"
          :key="index"
          @click="jumpTo(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script type="text/javascript">
// import * as userCache from '@/utils/userCache'
  export default {
    name: 'toolbar',
    data() {
      return {
        title: '',
        items: [
          {
            title: 'Rule',
            path: '/rule'
          },
          {
            title: 'Result',
            path: '/result'
          }
        ]
      }
    },
    components: {},
    computed: {
      itemList() {
        let arr = this.items.filter(item => this.$route.path !== item.path)
        return arr
      }
      // ...mapGetters(['isLogin', 'editProfile']),
    },
    watch: {
      '$route': {
        handler(newVal, oldVal) {
          this.title = this.$route.meta && this.$route.meta.title
        }
      }
    },
    created() {
      this.title = this.$route.meta && this.$route.meta.title
    },
    mounted() {},
    methods: {
      _isMobile() {
        let plat = navigator.userAgent.match( // 判断不同端
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
        return plat
      },
      goBackEvent() {
        if (this.$route.query.backURL) {
          if (Boolean(this._isMobile())) {
            window.history.go(-1)
          } else {
            window.parent.postMessage({ type: 'topclotto' }, '*')
          }
        } else {
          if (this.$route.meta.title === '5/90') {
            if (Boolean(this._isMobile())) {
              window.history.go(-1)
            } else {
              window.parent.postMessage({ type: 'topclotto' }, '*')
            }
          } else if (this.$route.name === 'betslip') {
            window.history.go(-1)
          } else {
            this.$router.go(-1)
          }
        }
      },
      jumpTo(item) {
        if (this.$route.path === item.path) return
        this.$router.push({path: item.path})
      }
    },
  }
</script>

<style lang="less" scoped>
.fixed-bar {
  position: sticky;
  top: 0;
  z-index: 99;
}
</style>
