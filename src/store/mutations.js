import * as types from './mutation-types'
import storage from '@/utils/storage'

// 页面入口缓存更新，处理多窗口打开页面异常问题
if (storage.get('entry') && !storage.session.get('entry')) {
  storage.session.set('entry', storage.get('entry'))
}
Array.prototype.remove = function(val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}
export default {
  [types.SET_LOADING](state, data) {
    state.loading = data
  },
  // 时区时差 不包括网络延时
  [types.SET_TIMEDIFWITHOUTNET](state, data) {
    state.timeDifWithoutNet = data
  },
  // 时差
  [types.SET_TIMEDIF](state, data) {
    state.timeDif = data
  },
  // 登录弹窗
  [types.SET_LOGINDIALOG](state, data) {
    state.loginDialog = data
  },
  // 投注期号
  [types.SET_WAGERISSUE](state, data) {
    state.WagerIssue = data
  },
  // 设置当前gamerule
  [types.SET_GAMERULE](state, data) {
    state.gamerule = data
  },
  // 设置当前gametypeObj
  [types.SET_GAMETYPEOBJ](state, data) {
    state.gametypeObj = data
  },
  // 清空投注号码
  [types.SET_CLEARCURRENTNUMARR](state, data) {
    state.currentNumArr = []
  },
  // 设置开奖动画提示
  [types.SET_DRAWNOTICE](state, data) {
    state.drawNotice = data
  },
  // 替换投注号码
  [types.SET_REPLAYCURRENTNUMARR](state, data) {
    state.currentNumArr = data
  },
  // 清空投注号码-拖码
  [types.SET_CLEARCURRENTNUMARRBACK](state, data) {
    state.currentNumArrBack = []
  },
  // 初始 currentNumFlag currentNumBackFlag 为false
  [types.SET_NUMFLAG](state, data) {
    state.currentNumFlag = false
    state.currentNumBackFlag = false
  },
  // 替换投注号码-拖码
  [types.SET_REPLAYCURRENTNUMARRBACK](state, data) {
    console.log(data)
    state.currentNumArrBack = data
  },
  // 设置投注号码 普通 或者 胆码
  [types.SET_CURRENTNUMARR](state, data) {
    let currentNum = JSON.parse(JSON.stringify(state.currentNumArr))
    console.log(currentNum.includes(data))
    if (currentNum.includes(data)) {
      currentNum.remove(data)
    } else {
      currentNum.push(data)
    }
    console.log(currentNum)
    // 对比选好数量  不能超过上限
    // 胆拖 胆码 state.gametypeObj.MaxBaseCount 不等于 0  用MaxBaseCount 判断
    // 假如是直选 MaxMultiNumCount === 0 用BetNumCount判断
    // 假如是复选 MaxMultiNumCount 不等于 0  用 MaxMultiNumCount
    let obj = {
      msg: 'Maximum balls you reached',
      msgType: 'warning',
      status: true,
      num: Math.random(),
    }
    if (state.gametypeObj.MaxBaseCount !== '0' && currentNum.length > state.gametypeObj.MaxBaseCount * 1) { // 胆拖--胆
      state.msgData = obj
      state.currentNumFlag = false
      return
    } else if (state.gametypeObj.MaxMultiNumCount === '0' && currentNum.length > state.gametypeObj.BetNumCount * 1) { // 直选
      state.msgData = obj
      state.currentNumFlag = false
      return
    } else if (state.gametypeObj.MaxMultiNumCount !== '0' && currentNum.length > state.gametypeObj.MaxMultiNumCount * 1) { // 复选
      state.msgData = obj
      state.currentNumFlag = false
      return
    }
    state.currentNumArr = currentNum
    state.currentNumFlag = true
  },
  // 设置投注号码 拖码
  [types.SET_CURRENTNUMARRBACK](state, data) {
    let currentNum = JSON.parse(JSON.stringify(state.currentNumArrBack))
    if (currentNum.includes(data)) {
      currentNum.remove(data)
    } else {
      currentNum.push(data)
    }
    let obj = {
      msg: 'Maximum balls you reached',
      msgType: 'warning',
      status: true,
      num: Math.random(),
    }
    if (state.gametypeObj.MaxBaseCount !== '0' && currentNum.length > state.gametypeObj.MaxRoundNumCount * 1) { // 胆拖--胆
      state.msgData = obj
      state.currentNumBackFlag = false
      return
    }
    state.currentNumArrBack = currentNum
    state.currentNumBackFlag = false
  },
  [types.COUPON_LIST](state, data) {
    // coupon列表
    state.couponList = data
  },
  [types.COUPON_DATA](state, data) {
    // 可用优惠券
    state.availableCoupon = data
  },
  [types.SET_COUPON](state, data) {
    // coupon数据
    state.betCoupon = data
  },
  [types.SET_BETMONEYOBJ](state, data) {
    state.betMoneyObj = data
  },
  [types.SET_GAMEISSUEDATA](state, data) {
    // storage.set('betLists9', data)
    state.gameIssueData9 = data
  },
  [types.SET_OLDISSUE](state, data) {
    state.oldIssue9 = data
  },
  [types.SET_GAMELIST9](state, data) {
    // storage.set('betLists9', data)
    state.gameList9 = data
  },
  [types.SET_BETLIST](state, data) {
    state.betLists9 = data
  },
  [types.SET_CONTENT](state, data) {
    // storage.set('Content', data)
    state.Content = data
  },
  // 信息弹窗
  [types.SET_MSG](state, data) {
    state.msgData = data
  },
  [types.SET_GAMETYPE](state, data) {
    // storage.set('Content', data)
    state.numObj = {
      Digits: [],
      Tens: [],
      Hundreds: []
    }
    state.gameType = data
  },
  // 重置numObj
  [types.SET_RESETNUMOBJ](state, data) {
    // storage.set('Content', data)
    state.numObj = {
      Digits: [],
      Tens: [],
      Hundreds: []
    }
  },
  // 替换numObj
  [types.SET_REPLAYNUMOBJ](state, data) {
    state.numObj = data
  },
  // 点击小球，对当前numObj数据修改
  [types.SET_NUMOBJ](state, data) {
    if (state.gameType === '1' || state.gameType === '2' || state.gameType === '3') {
      if (state.numObj[data.numTitle].includes(data.num)) {
        let arr = state.numObj[data.numTitle]
        arr.remove(data.num)
        state.numObj[data.numTitle] = arr
      } else {
        state.numObj[data.numTitle].push(data.num)
      }
    }
  },
  [types.SET_THREEDCOLORLIST](state, data) {
    // storage.set('ThreeDColorList', data)
    state.ThreeDColorList = data
  },
}
