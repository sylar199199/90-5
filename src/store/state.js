import storage from '@/utils/storage'
// import { getUserInfo } from '@/utils/userCache'

const state = {
  loading: false,
  timeDifWithoutNet: 0, // 时区时差 不包了网络延迟
  timeDif: 0, // 时区时差 包了网络延迟
  loginDialog: false, // 当接口请求返回code 20018 弹出登录窗口
  drawNotice: false, // 开奖提醒
  WagerIssue: '', // 投注成功的期号
  couponList: false, // 是否显示优惠券列表
  availableCoupon: [], // 可用优惠券
  betCoupon: { // 优惠券数据
    status: true, // 是否使用优惠券
    couponId: '',
    coupon: 0,
    couponCode: '',
  },
  gameIssueData9: {}, // 游戏期信息
  oldIssue9: '', // 旧期号
  gameList9: [], // 游戏玩法
  Content: storage.get('Content905') || {}, // 游戏信息
  betLists9: storage.get('betLists9') || [], // 3D下注订单
  gameType: '1', // 1=Direct 3     2=Perm 3    3=Any 1
  // lotto当前投注号码 第一位
  currentNumArr: [],
  // 是否修改了currentNumArr
  currentNumFlag: false,
  // lotto当前投注号码 第二位（托码）
  currentNumArrBack: [],
  // 是否修改了currentNumArrBack
  currentNumBackFlag: false,
  // 当前gamerule
  gamerule: '',
  // 当前gametype
  gametypeObj: {},
  // 当前投注对象
  numObj: {
    Digits: [],
    Tens: [],
    Hundreds: []
  },
  // 投注计算金额
  betMoneyObj: {
    totalStake: 0, // 总金额
    coupon: 0, // 优惠卷金额
    total: 0, // 付款金额（减去了优惠卷）
    maxwin: 0 // 最高可赢金额
  },
  // digitsNumArr: [],
  // tensNumArr: [],
  // hundredsNumArr: [],
  // 消息弹窗
  msgData: {
    msg: '', // 提示框信息
    msgType: 'error', // 提示框类型 error、warning、info、success
    status: false, // 提示框状态
    num: 1, // 用随机数
  },
  ThreeDColorList: storage.get('ThreeDColorList') || [], // 3D颜色
}

export default state
