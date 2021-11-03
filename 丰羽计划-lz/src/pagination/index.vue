<template>
  <div>
    <ul>
      <li class="first">
        <!-- <span>共{{dataNum}}条记录 第 {{cur}} / {{all}} 页</span> -->
        <span>共{{ dataNum }}条记录 </span>
      </li>
      <li v-if="cur > 1" class="prev-next">
        <!-- 点击上一页 -->
        <a @click="cur--, pageClick()"> prev </a>
      </li>
      <li v-if="cur === 1" class="prev-next">
        <!-- 点击第一页时显示 -->
        <a class="banclick"> prev </a>
      </li>
      <li
        class="li_a"
        v-for="index in indexs"
        :key="`li${index}`"
        :class="{ active: cur === index }"
      >
        <!-- 页码 -->
        <a @click="btnClick(index)"> {{ index }}</a>
      </li>
      <li v-if="cur != all" class="prev-next">
        <!-- 点击下一页 -->
        <a @click="cur++, pageClick()"> next </a>
      </li>
      <li v-if="cur === all" class="prev-next">
        <!-- 点击最后一页时显示 -->
        <a class="banclick"> next </a>
      </li>
 
      <li>
        <!-- 共有多少页 -->
        跳至<input type="text" class="page-input" @blur.prevent="changePage()" v-model="jumpPage">页
      </li>
 
      <li>
        <!-- 共有多少页 -->
        <span
          >共<i>{{ all }}</i
          >页</span
        >
      </li>
    </ul>
  </div>
</template>
<script>
import {PropType,ref,computed,reactive,toRefs} from '@vue/composition-api'
import { usePagination } from '../hooks/usePagination'
import {  tableProps } from './types'
export default defineComponent({
  name: "Pagination",
  props: {
    tableProps
  },
  setup(props, content)
  {
    const data = reactive({
      all: props.dataAll, //总页数
      cur: Number(props.dataCur),//当前页码
      num: props.datanum, //一页显示的数量  奇数
      dataNum: props.dataDatanum,//数据的数量
      jumpPage:0,// 跳转页码

      indexs: computed(()=>{
        Math.ceil(dataNuml / num)
      })
    });

    const { changePagin } = usePagination()
 
    const btnClick = (val) => { 
      if (val != data.cur) 
      {
        data.cur = val
        changePagin(data.cur)
      }
    };
    
    const pageClick = () => changePagin(data.cur)
 
    /**
     * 跳至 xxx 页
     */
    const changePage = () => {
      if (data.jumpPage > data.all || data.jumpPage < 1 || isNaN(data.jumpPage) )
      {
        console.error('参数错误');
        return;
      }
      changePagin(data.jumpPage)
    }
    const dataRef = toRefs(data);
    return {
      btnClick,
      pageClick,
      changePage,
      ...dataRef
    }
  },

});
</script>
