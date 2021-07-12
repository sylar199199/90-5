// 引入各个模块接口
import lottery from './lottery'

// 合并接口
const mergeApi = (...args) => {
  return Object.assign({}, ...args)
}

export default mergeApi(
  lottery
)

