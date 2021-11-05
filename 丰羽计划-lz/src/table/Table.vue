<template>
  <section class="mod-com_table">
    <table-header :colums="columsRow"
                  :tableData="tabledata"
                  :defaultSort="defaultSort"
                  @sortdata="onSortData"
    />
    <table-body :tableData="tabledata"
                :colums="columsRow"
    />
  </section>
</template>

<script lang="ts">

import { defineComponent, reactive } from '@vue/composition-api'

import TableHeader from './components/table_header'
import TableBody from './components/table_body'
import { useSort } from '../hooks/useSort'
import {  tableProps } from './types'
import { sortAutoType } from '../table/const'

export default defineComponent({
  name: 'Table',
  components: {
    TableHeader,
    TableBody,
  },
  props: tableProps,
  setup(props) {
    const columsRow = reactive(props.colums)
    const tabledata = reactive(props.tableData)
    const onSortData = (type: sortAutoType, index: number) => {
      const { tableData } = useSort(type, index, props)
      return {
        tableData,
      }
    }

    return {
      columsRow,
      tabledata,
      onSortData,
    }
  },
})
</script>



