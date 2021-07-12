/**
 * @desc 通用的方法，计算，消息，数据处理等
 */
// import { Message, MessageBox } from 'element-ui'
import { md5 } from 'md5js'
import store from '../store'
import moment from 'moment'

export function showMsg(content, type = 'warning') {
  // Message.closeAll()
  // Message[type]({ message: content })
}
// 计算组合方式 c m n
export function comb(m, n) {
  if (m < 0 || n < 0 || m < n) {
    return 0
  }
  n = n < (m - n) ? n : m - n
  if (n === 0) {
    return 1
  }
  var result = m
  for (var i = 2, j = result - 1; i <= n; i++, j--) {
    result = result * j / i
  }
  return result
}

export function showConfirm(
  content = '确定执行此操作么？',
  title = '提示',
  confirmBtn = '确定',
  cancelBtn = '取消',
  type = 'warning',
  align = false) {
  // return MessageBox.confirm(content, title, {
  //   confirmButtonText: confirmBtn,
  //   cancelButtonText: cancelBtn,
  //   type: type,
  //   center: align
  // })
}

/**
 * @desc 乘法函数，用来得到精确的乘法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accMul(arg1,arg2)
 * 返回值：arg1乘以arg2的精确结果
 */
export function accMul(arg1, arg2) {
  var m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try { m += s1.split('.')[1].length } catch (e) {
    // empty
  }
  try { m += s2.split('.')[1].length } catch (e) {
    // empty
  }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m))
}

/**
 * @desc 除法函数，用来得到精确的除法结果
 * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 * 调用：accDiv(arg1,arg2)
 * 返回值：arg1除以arg2的精确结果
 */
export function accDiv(arg1, arg2) {
  var t1 = 0
  var t2 = 0
  var r1, r2
  try { t1 = arg1.toString().split('.')[1].length } catch (e) {
    // empty
  }
  try { t2 = arg2.toString().split('.')[1].length } catch (e) {
    // empty
  }
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

/**
 * @desc 加法函数，用来得到精确的加法结果
 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * 调用：accAdd(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 */
export function accAdd(arg1, arg2) {
  var r1, r2, m
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

/**
 * @desc 减法函数，用来得到精确的减法结果
 * 说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
 * 调用：accSubtr(arg1,arg2)
 * 返回值：arg1减去arg2的精确结果
 */
export function accSubtr(arg1, arg2) {
  var r1, r2, m, n
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  // 动态控制精度长度
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}


/**
 * @desc 判断浏览器类型
 * @param {void}
 */
export function getBrowser() {
  var userAgent = navigator.userAgent
  // 判断是否Opera浏览器 OPR/43.0.2442.991
  if (userAgent.indexOf('OPR') > -1) {
    return 'Opera'
  }
  // 判断是否Firefox浏览器 Firefox/51.0
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  }
  // 判断是否IE浏览器  Trident/7.0 rv:11.0
  if (userAgent.indexOf('Trident') > -1) {
    return 'IE'
  }
  // 判断是否Edge浏览器  Edge/14.14393
  if (userAgent.indexOf('Edge') > -1) {
    return 'Edge'
  }
  // Chrome/56.0.2924.87
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  // 判断是否Safari浏览器 AppleWebKit/534.57.2 Version/5.1.7 Safari/534.57.2
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  }
}

/**
 * @desc 树转换为对象(场景:上级机构的树转换)
 * @param {Array} data 树机构
 * @param {String} key
 */
export const treeToObj = (data, key = 'id') => {
  const obj = {}
  const getCodes = (data, key) => {
    data.forEach(cur => {
      obj[cur[key]] = cur
      if (cur.children) {
        getCodes(cur.children, key)
      }
    })
  }
  getCodes(data, key)
  return obj
}

/**
 * @desc 获取当前节点及其父节点的集合(场景:上级机构的树转换)
 * @param {Object} obj 树对象
 * @param {String} val 根据某个值获取获取其父节点
 * @param {String} pid
 */
export const getPcRelationArr = (obj, val, pid = 'pid') => {
  // 顶级节点
  if (obj[val] && !(+obj[val][pid])) {
    return [obj[val][pid]]
  }
  const arr = []
  const toArrVal = (obj, val, pid) => {
    if (obj[val]) {
      if (+obj[val][pid]) {
        arr.unshift(obj[val][pid])
        toArrVal(obj, obj[val][pid], pid)
      }
    }
  }
  toArrVal(obj, val, pid)
  return arr
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export const hasClass = (ele, cls) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export const addClass = (ele, cls) => {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}
/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export const removeClass = (ele, cls) => {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// 计算body签名
// 计算body签名
export const getSign = (body) => {
  let signObj = {}
  Object.assign(signObj, body)
  delete signObj.sign
  function getSignString(params) {
    let arr = []
    for (let key in params) {
      if (!key || !params[key]) {
        continue
      }
      arr.push((key + params[key]))
    }
    return arr.sort().join('').replace(/'/g, '')
  }
  let sign = getSignString(signObj) // 获取签名字符串sign
  // 验证密钥
  let confirmKey = ''
  // md5计算
  let md1 = md5(confirmKey + sign)
  if (md1) {
    let md2 = md5(md1.substring(0, 5) + md1.substring(md1.length - 5, md1.length))
    return md2.toLowerCase() // 转大写
  }
  return ''
}

/**
 * 获取全路由
 * @param {Array} context 数组
 * @param {Object} ignore 字符
 */
export const getRoutes = (context, ignore) => {
  const children = []
  context.keys().forEach(key => {
    if (key !== ignore) {
      try {
        const arr = context(key).default
        if (arr && arr.length) {
          children.push(...arr)
        }
      } catch (e) {
        console.error(e)
      }
    }
  })
  return children
}
export const GetPreMonthDay = (date, monthNum) => {
  let dateArr = date.split('-')
  let year = dateArr[0] // 获取当前日期的年份
  let month = dateArr[1] // 获取当前日期的月份
  let day = dateArr[2] // 获取当前日期的日
  // let days = new Date(year, month, 0)
  // days = days.getDate() // 获取当前日期中月的天数
  let year2 = year
  let month2 = parseInt(month) - monthNum
  if (month2 <= 0) {
    let absM = Math.abs(month2)
    year2 = parseInt(year2) - Math.ceil(absM / 12 === 0 ? 1 : parseInt(absM) / 12)
    month2 = 12 - (absM % 12)
  }
  let day2 = day
  let days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  let t2 = year2 + '-' + month2 + '-' + day2
  return t2
}
// 把时间转换成 当前时区时间 withNetFlag表示是否带上网络延时
export function toMyLocalTime(data, withNetFlag) {
  let dif = withNetFlag ? store.state.timeDif : store.state.timeDifWithoutNet
  let time1 = new Date(moment(data)).getTime() + dif
  return moment(new Date(time1)).format('yy/MM/DD HH:mm:ss')
}
/**
 * 判断当前是否PC端环境
 */
export function isPc() {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod'
  ]
  var flag = true
  for (var i = 0; i < Agents.length; i++) {
    if (userAgentInfo.indexOf(Agents[i]) !== -1) {
      flag = false
      break
    }
  }
  return flag
}
/**
 * 判断当前是否PC端环境
 * 平台：0-投注设备，1-IOS，2-Android，3-H5，4-PC
 */
export function checkPlatform() {
  if (isPc()) {
    return 'PC'
  } else {
    return 'H5'
  }
}
export default {
  showMsg,
  comb,
  toMyLocalTime,
  isPc,
  checkPlatform
}
