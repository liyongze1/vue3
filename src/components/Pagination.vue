<template>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[result.pag.page,10]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="result.pag.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, toRefs, watch} from 'vue'
let result=defineProps(["pag"])
//设置总数
//设置每页显示
const currentPage4 = ref(1)
const pageSize4 = ref(8)
const emit=defineEmits(["result"])
//当前页显示多少条的事件
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
//点击的当前页数
const handleCurrentChange = (val) => {
    emit("result",val)
  console.log(`current page: ${val}`)
}
</script>

<style scoped>
.demo-pagination-block{
    margin-left: 10px;
}

</style>
