<template>
  <el-dialog
    v-model="dialogVisible"
    :title="header"
    width="30%"
  >

    <el-input v-model="input" placeholder="请输入增加的类目名称" v-show="isShow"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDetail">
         确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
const props=defineProps(["name"])
const dialogVisible = ref(false)
const emit=defineEmits(["addDetail"])
const input=ref()
//标题
const header=ref()
//输入框的显示隐藏
const isShow=ref(true)
//暴露子组价属性
defineExpose({
    dialogVisible,
    header,
    isShow
})
//确定
const addDetail=()=>{
    //隐藏提示框
    dialogVisible.value=false
    //传递方法
    emit("addDetail",input.value)
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
