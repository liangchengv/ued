
import { defineComponent, reactive } from '@vue/composition-api'
import { sortAutoArray , sortAutoType} from '../const'

/**
 * 获取排序状态class
 * @param {*} canSort 是否允许排序
 * @param {*} type 排序列状态
 * @returns
 */
function getSortStatus(canSort: boolean, type: sortAutoType) {
  return canSort ? <div class={`sortable ${type}`}></div> : ''
}

export default defineComponent({
  name: 'TableHeader',
  props: ['colums', 'tableData', 'defaultSort'],
  setup (props, { emit }) {
    const columsRow = reactive(props.colums)
    const canSort = reactive(props.defaultSort)
    const clickAbort = reactive({
      sortIndex: 0,
      click: 0,
    })


    const sortData = (index: number) => {

      // 记录点击当前排序状态
      clickAbort.click++
      clickAbort.click = clickAbort.sortIndex === index ? clickAbort.click % sortAutoArray.length : 1
      clickAbort.sortIndex = index
  
      console.log(`当前表格列排序方式为${sortAutoArray[clickAbort.click]}`)

      emit('sortdata', sortAutoArray[clickAbort.click], index)
    }

    return {
      sortData,
      columsRow,
      canSort,
      clickAbort
    }
  },
  render () {
    const sort = sortAutoArray[this.clickAbort.click]

    /**
     * 判断当前表格列是否可以点击
     * @param canSort 当前表格列是否可排序
     * @param index 
     * @returns 
     */
    const onClickSort = (canSort: boolean, index: number)  => {
      if(!canSort) {
        console.log('当前表格列不允许排序')
        return
      }
      this.sortData(index)
    }

    return (
      <thead>
        <tr>
          {
          this.columsRow.map((groupColum, index) => {
            return <td class="mod-com_table_td" onClick={
              () => {
                onClickSort(groupColum.sortAble, index)
              }
            }>{groupColum.field}{getSortStatus(groupColum.sortAble, sort)}</td>
          })
          }
        </tr>
      </thead>
    )
  },
})