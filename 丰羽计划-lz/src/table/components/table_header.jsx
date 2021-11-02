
import { defineComponent, reactive } from '@vue/composition-api'
import useSort from '../hooks/useSort'
function getSortStatus(sort, name) {
    const cls = sort.field === sort? 'sortable asc': 'desc';
    return isShowSort ? `<div class="">${cls}</div>` : ''

}
export default defineComponent({
  props: ['colums'],
  setup (props) {
    const columsRow = reactive(props.colums)
    return {
      columsRow,
    }
  },
  render () {
      const sort = getSortStatus(this.sort, this.name);
      const onClickSort = (index) => {
        this.defaultSort ? useSort(col.field, columsRow, index) : '';
      }
    const row = this.columsRow.map((groupColum, index) => {
      return <td onClick={onClickSort(index)}>{groupColum.field}{sort} </td>
    })
    return (
      <thead>
        <tr>
          {row}
        </tr>
      </thead>
    )
  },
})
