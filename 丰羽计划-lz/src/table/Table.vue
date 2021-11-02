<template>
  <section>
    <table-header :colums="columsRow"
                    :defaultSort="defaultSort" />
    <table-body :tableData="tabledata"
                :colums="columsRow"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import {  tableProps } from './types'
import TableHeader from './components/table_header'
import TableBody from './components/table_body'

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
    return {
      columsRow,
      tabledata,
    }
  },
})
</script>



