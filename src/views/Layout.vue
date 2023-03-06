<template>
<div class="content">
    <div class="hea" ref="head">
      <Headers @show="isShow"></Headers>
      <router-view></router-view>
    </div>
    <div class="cont">
      <Menu></Menu>
    </div>
  </div>
</template>

<script setup>
import Menu from "./layout/Menu/Menu.vue";
import Headers from "./layout/header/Header.vue";
import { onMounted,ref} from "vue";
const head=ref(null)
function isShow(data){
     if(data){
    head.value.style.marginLeft=200+"px" 
    }else{
    head.value.style.marginLeft=60+"px" 
    }
}
</script>

<style>
.hea{
    margin-left: 200px;
}
</style>