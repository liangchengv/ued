import { ref } from '@vue/composition-api'

import { sortAutoType } from '../table/const'

export function useSort(columsRow, order: sortAutoType, index: Number) {
  const columns = ref([]);
  const tableData = ref([]);

  // 没有排序字段的按照不排序展示
  columns.value.forEach((col) => {
    col.sortType = sortAutoType.normal;
  });

  columns.value[index].sortType = order;
  let key: string = columns.value[index].key;
  if (order === sortAutoType.normal) {
    tableData.value = columsRow;
    return;
  }

  const indexSort = order === sortAutoType.asc ? 1 : -1;
  tableData.value.sort((a, b) => indexSort * (a[key] - b[key]));

  return {
    columns,
    tableData
  }
}