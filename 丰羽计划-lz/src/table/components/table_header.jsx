
import { defineComponent, reactive, ref } from '@vue/composition-api'
import { sortAutoType } from '../const'

/**
 * 获取排序状态class
 * @param {*} sort 
 * @param {*} field 
 * @returns 
 */
function getSortStatus(sort, field) {
  const cls = field === sort? 'sortable asc': 'desc'
  return sort ? `<div class="">${cls}</div>` : ''
}

export default defineComponent({
  props: ['colums', 'tableData'],
  setup (props, { emit }) {
    const columsRow = reactive(props.colums)
    const clickAbort = reactive({
      sortIndex: 0,
      click: 1,
    })
    const length = sortAutoType.length;
    const sortType = sortAutoType[clickAbort.click];

    const sortData = (index) => {
      
      // 记录点击当前排序状态
      clickAbort.click = clickAbort.sortIndex === index ? clickAbort.click % length : 1;
      clickAbort.sortIndex = index;
      clickAbort.click++;

      console.log(`当前表格列排序方式为${sortType}`)

      emit('sortdata', sortType, index);
    }

    return {
      sortData,
      columsRow,
      sortType,
    }
  },
  render () {
    const sort = getSortStatus(canSort, field);

    const onClickSort = (canSort, index)  => {
      if(!canSort) {
        console.log('当前表格列不允许排序')
        return;
      }
      this.sortData(canSort, index)
    }

    return (
      <thead>
        <tr>
          {this.columsRow.map((groupColum, index) => {
            return <td onClick={
              () => onClickSort(groupColum.sortAble, index)
            }>{groupColum.field}{() => sort(groupColum.sortAble, groupColum.field)}</td>
          })
          }
        </tr>
      </thead>
    )
  },
})
