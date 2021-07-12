import ajax from '@/utils/ajax.js'
import { game } from '@/api/baseConfig'
// 操作日志
export default {
  // 心跳
  heartbeat: (options = {}) => ajax.post('/engine/T300100', options),
  // 游戏跳转url
  gameUrl: (options = {}) => ajax.post('/engine/T300102', options),
  // 查询游戏玩法列表
  gamePlayList: (options = {}) => ajax.post('/engine/T300112', options),
  // 查询可销售游戏
  checkSaleGame: (options = {}) => ajax.post('/engine/T300110', options),
  // 查询开奖号码列表
  queryLotteryList: (options = {}) => ajax.post('/engine/T300152', options),
  // 开奖公告详情
  gameOrderDetail: (options = {}) => ajax.post('/engine/T300150', options),
  // 查询游戏期
  gameIssue: (options = {}) => ajax.post('/engine/T300111', options),
  // 同步投注
  gameBet: (options = {}) => ajax.post('/engine/T301200', options),
  // 时间同步
  updateTime: (options = {}) => ajax.post('/engine/T300101', options),
  // 获取可用优惠券
  availableCoupon: (options = {}) => ajax.post('/coupon/api/availableCoupon', {
    ...options,
    baseURL: game
  }),
  // 登录
  getLogin: (options = {}) => ajax.post('/user/un/login', {
    normalData: true,
    ...options,
    baseURL: game
  }),
}
