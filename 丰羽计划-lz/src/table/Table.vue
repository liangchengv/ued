<template>
  <section>
    <table-header :colums="columsRow"
                  :tableData="tabledata"
                  :defaultSort="defaultSort"
                  @sortdata="SortData" />
    <table-body :tableData="tabledata"
                :colums="columsRow"
    />
  </section>
</template>

<script lang="ts">

import { defineComponent, reactive, watchEffect } from '@vue/composition-api'

import TableHeader from './components/table_header'
import TableBody from './components/table_body'
import { useSort } from '../hooks/useSort'
import {  tableProps } from './types'
import { sortAutoType } from './const'

export default defineComponent({
  name: 'Table',
  components: {
    TableHeader,
    TableBody,
  },
  props: tableProps,
  setup(props, { slots }) {
    const columsRow = reactive(props.colums)
    const tabledata = reactive(props.tableData)
    const sortData = (sort: sortAutoType, index: number) => {
      const {columns, tableData} = useSort(columsRow, sort, index)
      return {
        columns, 
        tableData
      }
    }
    
    watchEffect(() => {
      columns = columsRow;
      tableData.value = tabledata;
    });

    return {
      columsRow,
      tabledata,
      sortData,
    }
  },
})
</script>



