import storage from './storage'

// token
export const setToken = token => {
  token = token || ''
  storage.set('token', token)
}

export const getToken = () => {
  return storage.get('token') || ''
}

// 用户信息
export const setUserInfo = data => {
  data = data || ''
  storage.set('userInfo', data)
}

export const getUserInfo = () => {
  return storage.get('userInfo') || {}
}

// 子系统参数
export const setNowModel = data => {
  data = data || ''
  storage.set('nowModel', data)
}

export const getNowModel = () => {
  return storage.get('nowModel') || {}
}

// 数据字典
export const setDicData = data => {
  data = data || ''
  storage.session.set('dicData', data)
}

export const getDicData = () => {
  return storage.session.get('dicData')
}

// 清除缓存
export const clear = (all) => {
  storage.clear()
  if (all) {
    storage.session.clear()
  }
}

