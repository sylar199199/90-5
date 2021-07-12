<template>
  <v-snackbar
    app
    top
    width="100%"
    :color="colorName"
    v-model="snackbar"
  >
    {{ msgData.msg }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color=""
        text
        v-bind="attrs"
        @click="closeMsg"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'msgBar',
    data() {
      return {
        snackbar: true,
        colorName: 'warning'
      }
    },
    computed: {
      ...mapGetters(['msgData']),
      msgStatus() {
        return this.snackbar
      }
    },
    mounted() {
      if (this.msgData.msgType !== '') {
        this.colorName = this.msgData.msgType
      }
    },
    watch: {
      'msgStatus': {
        handler(newValue, oldValue) {
          if (oldValue === undefined) return
          if (newValue) return
          let obj = {
            msg: '',
            msgType: '',
            status: newValue,
            num: Math.random(),
          }
          this.SET_MSG(obj)
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      ...mapMutations(['SET_MSG']),
      closeMsg() {
        this.snackbar = false
        console.log('关闭消息弹窗')
      }
    }
  }
</script>

<style scoped>

</style>
