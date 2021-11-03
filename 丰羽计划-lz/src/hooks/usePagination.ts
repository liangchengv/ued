import {  getCurrentInstance } from '@vue/composition-api'
export function usePagination() {
    const vm = getCurrentInstance()

    const changePagin = (data: number) => {
        vm?.emit('changePage', data)
    }

    return {
        changePagin
    }
    
}