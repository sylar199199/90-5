import '@babel/polyfill'
import Vue from 'vue'
import xss from 'xss'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/'
import '@/assets/less/app.less'
import '@/assets/less/common.less'
import i18n from '@/components/i18n'
import rules from '@/utils/rules'
import storage from '@/utils/storage'
import { changeShow } from '@/utils/fireBase'
import * as common from '@/utils/common' // 通用处理方法
import mixins from '@/utils/mixins' // 全局mixins
import '@/assets/icon' // 图标库
import vuetify from '@/plugins/vuetify'
// 引入moment.js
import moment from 'moment'
import iLotToolbar from '@/components/common/toolbar'
import glSvgIcon from '@/components/common/glSvgIcon/glSvgIcon' // svg组件
import ilotUi from '@/libs/ilotUi'
import * as filters from '@/utils/filter'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.mixin(ilotUi)
// 注册为全局组件
Vue.component('glSvgIcon', glSvgIcon)

Vue.mixin(mixins) // 注册全局mixins

Vue.config.productionTip = false
Vue.prototype.$api = api // 请求接口
Vue.prototype.$changeShow = changeShow
Vue.prototype.$rules = rules
Vue.prototype.$common = common // 通用方法
window.platform = common.checkPlatform()
Vue.prototype.eventBus = new Vue()

Vue.prototype.$moment = moment

Vue.component('iLotToolbar', iLotToolbar) // 区域树


Object.defineProperty(Vue.prototype, '$xss', {
  value: xss,
})

// 防重复点击-自定义指令
Vue.directive('prevent', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 1000)
      }
    })
  },
})

// 按钮权限-自定义指令
Vue.directive('has', {
  inserted: function(el, binding) {
    if (!permissionJudge(binding.value)) {
      el.parentNode.removeChild(el)
    }
    function permissionJudge(value) {
      // 此处this.$storage.get('menuBtnList')代表storage中储存的按钮菜单数据
      const list = storage.get('menuBtnList')
      for (const item of list) {
        if (item.permission === value) {
          return true
        }
      }
      return false
    }
  },
})

window.vm = new Vue({
  render: h => h(App),
  router,
  vuetify,
  store,
  i18n
}).$mount('#app')
