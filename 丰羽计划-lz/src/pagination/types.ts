export const pageProps = {
// 总页数
'dataAll': {
    type: Number,
    default: 100,
    required: true
  },
  // 当前页数
  'dataCur': {
    type: Number,
    default: 1,
    required: true
  },
  // 页面条数
  'datanum': {
    type: Number,
    default: 7
  },
  // 数据总量
  'dataDatanum': {
    type: Number,
    default: 456
  },
}