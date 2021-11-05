
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  props: ['tableData', 'colums'],
  setup (props) {
    const tabledatas = reactive(props.tableData)
    const columsrw = reactive(props.colums)
    return {
      tabledatas,
      columsrw,
    }
  },
  render () {
    return (
      <tbody>
        {this.tabledatas.map(groupColum => (
          <tr>
            {this.columsrw.map(data => <td>{groupColum[data.field]}</td>)}
          </tr>
        ))}
      </tbody>
    )
  },
})
