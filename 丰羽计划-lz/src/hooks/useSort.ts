import { ref } from '@vue/composition-api'

import { sortAutoType } from '../table/const'

/**
 * 点击排序运行函数
 * @param type 排序方式（正序，倒序）
 * @param index 排序列索引
 * @param columsRow 排序的表格props
 * @returns 排序完成的字段
 */
export function useSort(type: sortAutoType, index: number, columsRow) {
  console.log('点击了排序')

  const sortTableData = ref([])
  const key: string = columsRow.colums[index].field

  const indexSort = type === sortAutoType.asc ? 1 : -1

  sortTableData.value = columsRow.tableData.sort((a, b) => indexSort * (a[key] - b[key]))

  console.log(`排序后的表格列${sortTableData.value}`)

  return {
    sortTableData,
  }
}
