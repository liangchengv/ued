import {  getCurrentInstance } from '@vue/composition-api'

/**
 * 点击切换分页事件
 * @returns 分页事件
 */
export function usePagination() {
  const vm = getCurrentInstance()

  const changePagin = (data: number) => {
    vm?.emit('changePage', data)
  }

  return {
    changePagin,
  }

}
