<template>
  <div>
    <!-- 基础展示组件 -->
    <TestTable :tableData="tableData"
               :defaultSort="defaultSort"
               :colums="colums"
    />
    <!-- 带分页条的表格 -->
    <TestTable :tableData="tableData"
               :defaultSort="defaultSort"
               :pagesize="pagesize"
               :colums="colums" />
    <Pagination :dataDatanum="tableData.length"
                dataCur="1"
                @changePage="onChangePage"
    ></Pagination>
  </div>
</template>

<script lang="ts">
import { TestTable } from '../src/table'
import { Pagination } from '../src/pagination'
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  name: 'App',
  components: {
    TestTable,
    Pagination,
  },
  setup() {
    const pagesize =  ref('1');
    const onChangePage = (value) => {
      pagesize.value = value
    }
    const defaultSort = reactive({
      sort: 'desc',
      name: 'date',
    })
    const tableData = reactive([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    const colums = reactive([
      {
        key: 'a',
        field: 'date',
        title: '参数',
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
      pagesize
    }
  },
})
</script>
