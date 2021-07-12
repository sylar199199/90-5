
export const date = (timestamp, fmt = 'YYYY-MM-DD') => {
  var date = new Date(timestamp)
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds(),
  }

  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d',
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export const time = (d, fmt = 'DD/MM/YYYY HH:mm:ss') => {
  return date(d, fmt)
}

export const minute = (d, fmt = 'DD/MM/YYYY HH:mm') => {
  return date(d, fmt)
}

export const second = (d, fmt = 'HH:mm:ss') => {
  return date(d, fmt)
}

export const month = (d, fmt = 'YYYY-MM') => {
  return date(d, fmt)
}

export const thousands = (num) => {
  if (typeof num !== 'number' && !num) {
    return ''
  }
  return (+num).toLocaleString()
}

export const decimal = (num, precision = 2) => {
  if (typeof num !== 'number' && !num) {
    return ''
  }
  return `${(+num).toFixed(precision).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}`
}

export const money = (num, prev = '￥', fixed = 2) => {
  if (typeof num !== 'number' && !num) {
    return ''
  }
  prev = prev === null ? '￥' : prev
  return `${prev}${(+num).toFixed(fixed).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}
