import { mount } from '@vue/test-utils'
import { Table } from '../table'
import Vue from 'vue'

const tableData = [
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
]
const colums = [
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
    sortAble: false,
  },
  {
    key: 'c',
    field: 'address',
    title: '类型',
    sortAble: false,
  },
]

describe('表格', () => {
  const TableMount = options => mount(Table, options)

  test('表格渲染测试', () => {
    const wrapper = TableMount()
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.vm.$destroy()
    }).not.toThrow()
  })

  test('表格props测试', () => {
    const wrapper = TableMount({
      propsData: {
        tableData,
        colums,
        defaultSort: {
          sort: '',
          name: '',
        },
      },
    })

    expect(wrapper.find('.mod-com_table').exists()).toBeTruthy()
  })

  test('测试排序功能', async () => {
    const wrapper = TableMount({
      propsData: {
        tableData,
        colums,
        defaultSort: {
          sort: 'asc',
          name: 'date',
        },
      },
    })

    await Vue.nextTick()
    const header = wrapper.findAll('.mod-com_table_td')
    const [wrappersHeader] = header.wrappers
    expect(wrappersHeader).toBeTruthy

    await wrappersHeader.trigger('click')
    expect(wrappersHeader.html()).toContain('desc')
    expect(wrappersHeader).toMatchInlineSnapshot(`
      Wrapper {
        "selector": ".mod-com_table_td",
      }
    `)

    await wrappersHeader.trigger('click')
    expect(wrappersHeader.html()).not.toContain('asc')
    expect(wrappersHeader.html()).not.toContain('desc')
    expect(wrappersHeader).toMatchInlineSnapshot(`
      Wrapper {
        "selector": ".mod-com_table_td",
      }
    `)

    await wrappersHeader.trigger('click')
    expect(wrappersHeader.html()).toContain('asc')
    expect(wrappersHeader).toMatchInlineSnapshot(`
      Wrapper {
        "selector": ".mod-com_table_td",
      }
    `)

    expect(wrapper.find('.sortable').exists()).toBeTruthy()
  })

  test('测试表格不可以排序', async () => {
    const wrapper = TableMount({
      propsData: {
        tableData,
        colums: [
          {
            key: 'b',
            field: 'name',
            title: '说明',
            sortAble: false,
          },
        ],
      },
    })

    await Vue.nextTick()
    const header = wrapper.findAll('.mod-com_table_td')
    const [wrappersHeader] = header.wrappers
    expect(wrappersHeader).toBeTruthy

    await wrappersHeader.trigger('click')
    expect(wrappersHeader).toMatchInlineSnapshot(`
      Wrapper {
        "selector": ".mod-com_table_td",
      }
    `)

    expect(wrapper.find('.sortable').exists()).toBeFalsy()
  })
})
