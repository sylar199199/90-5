import Vue from 'vue'
import Router from 'vue-router'
// 登录
import locking from '@/views/locking/locking'
// lotto主投注页
import Lotto from '@/views/lotto/Lotto'
// 购物车
import betslip from '@/views/betslip/betslip'
// 开奖结果
import result from '@/views/result/result'
// 开奖结果详情
import resultDetail from '@/views/result/resultDetail'
// 投注历史
import history from '@/views/history/history'
// 玩法
import rule from '@/views/rule/rule'
Vue.use(Router)


export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE,
  base: process.env.VUE_APP_ROUTER_BASE,
  routes: [
    {
      path: '/',
      name: 'Lotto',
      meta: {
        title: '5/90',
        keepAlive: true
      },
      component: Lotto
    },
    {
      path: '/c905/:rule/:type', // rule三种情况1、winning为1  2、machine 为2 3、double为3   type 10种情况 playid为准
      name: 'Lotto',
      meta: {
        title: '5/90',
        keepAlive: true
      },
      component: Lotto
    },
    {
      path: '/905betslip',
      name: 'betslip',
      meta: {
        title: 'betslip',
        keepAlive: true
      },
      component: betslip
    },
    {
      path: '/result',
      name: 'result',
      meta: {
        title: '5/90 Result'
      },
      component: result
    },
    {
      path: '/resultDetail',
      name: 'resultDetail',
      meta: {
        title: 'ResultDetail'
      },
      component: resultDetail
    },
    {
      path: '/history',
      name: 'history',
      meta: {
        title: 'History'
      },
      component: history
    },
    {
      path: '/rule',
      name: 'rule',
      meta: {
        title: '5/90 Rule'
      },
      component: rule
    },
    {
      path: '/locking',
      component: locking
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
