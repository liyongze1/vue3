<template>
  <div class="header" ref="head">
    <div class="right_header_icon">
      <div
        class="el-icon-s-unfold"
        @click="showChange"
        v-if="isShow"
      >
        <Fold class="icn"/>
      </div>
      <div
        class="el-icon-s-unfold"
        @click="showChange"
        v-else
      >
        <Expand class="icn"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import emitter from "../../../utils/bus.js"
// const emit=defineEmits(["isShow"])
const isShow=ref(true)
const head=ref(null)
const emit=defineEmits(["show"])
function showChange(){
    isShow.value=!isShow.value
    //父传子
    emit("show",isShow.value)
    //兄弟传参插件写法
    emitter.emit("isShow",isShow.value)
}
defineExpose({
    isShow:Boolean
})
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  background-color: rgb(215, 56, 56);
  .right_header_icon {
    float: left;
    height: 100%;
    width: 100px;
  }
  .el-icon-s-unfold{
    height: 100%;
    padding: 10px 0;
    box-sizing: border-box;
  }
  .icn{
    display: block;
    width: 40px;
    height: 40px;
    color: #111;
  }
}

</style>