/**
 * @desc 公用配置
 */
const runingIP = process.env.VUE_APP_API_FLATFORM_URL
export const baseURL = process.env.VUE_APP_API_LOTTERY_URL

export const game = runingIP

// 获取api
export const getApis = (context, ignore) => {
  return context.keys().reduce((modules, modulePath) => {
    if (modulePath !== ignore) {
      modules = { ...modules, ...(context(modulePath).default || {}) }
    }
    return modules
  }, {})
}
