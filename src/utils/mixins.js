/**
 * @desc 数据字典获取
 * @remark initState(vm) 顺序：props > methods > data > computed > watch
*/
import store from '@/store'
import { getDicData } from '@/utils/userCache'

const getData = () => {
  let data = getDicData()
  if (!data) {
    data = store.getters.dicStore
  }
  return data
}

/**
 * @desc 扁平化树结构数据的字典
 * @remark 针对嵌套children的数据，将所有层级的{label, value} 组装成一个数组
 * @param {Array} list
*/
const flatDic = list => {
  const arr = []
  let flag = !(function flatArr(v) {
    v.forEach(item => {
      arr.push(item)
      if (item.children) {
        flatArr(item.children)
      }
    })
  }(list))
  if (flag) {
    return arr
  }
}

// console.log(getData())

export default {
  methods: {
    // 使用：this.lookUpOptions('stationPerson.salesStatus')
    lookUpOptions: (key) => {
      return (window.__lookup__ || getData())[key]
    },
    // 使用： this.lookup('stationPerson.salesStatus', v)
    lookup: (key, val) => {
      const dicArr = (window.__lookup__ && window.__lookup__[key]) || getData()[key] || []
      const obj = (dicArr.some(v => v.children) ? flatDic(dicArr) : dicArr).find(v => v.value === val)
      return obj ? obj.label : val
    },
  },
}
