<template>
  <v-dialog
    v-model="dialog"
    max-width="400px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Log In to ILOT</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="formIsValid"
        >
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.playerAccount"
                  placeholder="Phone Number Or Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.password"
                  placeholder="Password"
                  type="password"
                  required
                  @keyup.enter.native="loginFunc"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <LoadingBtn
          class="login-form-btn"
          :disabled="!formIsValid"
          text="Log In"
          @click="loginFunc"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import storage from '@/utils/storage'
  import md5 from 'js-md5'
  import LoadingBtn from '@/components/main/loading-btn'
  export default {
    name: 'ilotLogin',
    components: {
      LoadingBtn
    },
    data() {
      return {
        dialog: false,
        form: {
          codeUses: 0,
          playerAccount: '',
          password: ''
        },
        formIsValid: true,
      }
    },
    computed: {
      ...mapGetters(['loginDialog'])
    },
    watch: {
      'loginDialog': {
        handler(newValue, oldValue) {
          this.dialog = newValue
        },
        immediate: true,
        deep: true
      },
      dialog(newValue) {
        console.log(newValue)
        this.$store.commit('SET_LOGINDIALOG', newValue)
      }
    },
    beforeMount() {
    },
    created() {
    },
    methods: {
      ...mapMutations(['SET_CONTENT']),
      async loginFunc(fn) {
        try {
          if (this.form.playerAccount === '' || this.form.playerAccount === undefined) {
            let obj = {
              msg: window.vm.$t('rules.PHONE-INPUT'),
              msgType: 'warning',
              status: true,
              num: Math.random(),
            }
            this.$store.commit('SET_MSG', obj)
            return
          }
          if (this.form.password === '' || this.form.password === undefined) {
            let obj = {
              msg: window.vm.$t('rules.PASSWORD-MSG'),
              msgType: 'warning',
              status: true,
              num: Math.random(),
            }
            this.$store.commit('SET_MSG', obj)
            return
          }
          const res = await this.$api.getLogin({
            message: 'Login successful', // 登录成功
            data: {
              loginType: 0,
              password: md5(md5(this.form.password).toLocaleLowerCase()).toLocaleLowerCase(),
              playerAccount: this.form.playerAccount
            }
          })
          if (res.code !== 0) return
          // 登录状态传递到iframe外
          window.parent.postMessage({ type: 'lotteryLogin', token: res.data }, '*')
          let obj = this.$store.state.Content
          obj.Token = res.data
          storage.set('Content905', obj)
          this.SET_CONTENT(obj)
          this.$store.commit('SET_LOGINDIALOG', false)
        } catch (err) {
          console.error('err', err)
        } finally {
          fn && fn()
        }
      }
    }
  }
</script>

<style lang="less">

</style>
