<template>
  <div>
    <!-- 基础展示组件 -->
    <!-- <Table :tableData="tableData"
           :defaultSort="defaultSort"
           :colums="colums"
    /> -->
    <!-- 带分页条的表格 -->
    <Table :tableData="tableData"
           :defaultSort="defaultSort"
           :pagesize="pagesize"
           :colums="colums"
    />
    <v-pagination :dataDatanum="tableData.length"
                  :cur="1"
                  :dataAll="2"
                  :dataCur="2"
                  @changePage="onChangePage"
    />
  </div>
</template>

<script lang="ts">
import { Table } from '../src/table'
import { VPagination } from '../src/pagination'
import { defineComponent, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'App',
  components: {
    Table,
    VPagination,
  },
  setup() {
    const pagesize =  ref('1')
    const onChangePage = (value: string) => {
      pagesize.value = value
    }
    const defaultSort = reactive({
      sort: 'desc',
      name: 'date',
    })
    const tableData = reactive([
      {
        date: '3',
        name: 'Tomjopjopgreg',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '8',
        name: 'Togkreopgkperokgem',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '23',
        name: 'Tomgreg',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '1',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    const colums = reactive([
      {
        key: 'a',
        field: 'date',
        title: '参数',
        sortAble: true,
      },
      {
        key: 'b',
        field: 'name',
        title: '说明',
      },
      {
        key: 'c',
        field: 'address',
        title: '类型',
      },
    ])

    return {
      tableData,
      colums,
      defaultSort,
      onChangePage,
      pagesize,
    }
  },
})
</script>
