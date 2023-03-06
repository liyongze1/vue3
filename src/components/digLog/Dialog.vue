<template>
  <el-dialog
    v-model="dialogVisible"
    title="删除"
    width="30%"
    :modal="false"
  >
    <span style="font-size: 15px;">是否删除当前所选数据</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="delDataF">取消</el-button>
        <el-button type="primary" @click="delDataT">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
const dialogVisible = ref(false)
const prop=defineProps(["del","delID"])
//确定删除的标识
const delDataT=()=>{
  //删除数据
  prop.del(prop.delID)
  dialogVisible.value=false
}
const del=function(n){
  prop.del(n)
}
const delDataF=()=>{
  ElMessage({
    message: '取消删除',
    type: 'warning',
  })
  dialogVisible.value=false
}
const isShow=()=>{
  dialogVisible.value=!dialogVisible.value
}
defineExpose({
  isShow,
})
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
