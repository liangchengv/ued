import { getCurrentInstance, reactive } from '@vue/composition-api';

export function useSort(order, props, columsRow, index) {
    const me = getCurrentInstance()
      columsRow.value[index].sortType = order;
      let key = columsRow.value[index].key;

      if ( order === props.defaultSort.sort.asc) {
        props.tableData.value.sort((a, b) => {
            return a[key] > b[key] ? 1 : -1;
          });
      }
      props.currentTableData.value.sort((a, b) => {
        return a[key] < b[key] ? 1 : -1;
      });

      me?.emit('sort-change', columsRow)

      return {
        columsRow
      }
}

