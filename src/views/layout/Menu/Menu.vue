<template>
  <el-menu
    router
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :default-active="$route.meta.activeeae || $route.path"
  >
    <div class="logo">
        <h3 v-if="!isCollapse" style="text-align: center;">后台管理系统</h3>
        <img :src="img" alt="" v-else>
    </div>
    <el-menu-item index="/home">
      <el-icon><location /></el-icon>
      <span>首页</span>
      </el-menu-item>
    <el-sub-menu index="/product">
      <template #title>
        <el-icon><location /></el-icon>
        <span>产品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/product/list">产品列表</el-menu-item>
        <el-menu-item index="/product/AddDetails">产品详情</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="/order">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/order/orderList">产品列表</el-menu-item>
        <el-menu-item index="2-2">产品详情</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>广告管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">产品列表</el-menu-item>
        <el-menu-item index="2-2">产品详情</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">产品列表</el-menu-item>
        <el-menu-item index="2-2">产品详情</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { onBeforeUnmount, ref, onMounted, watch, reactive} from "vue";
import emitter from "../../../utils/bus.js"
import img from "../../../assets/img/A1BDF275E87A2A0A8B761261782B029E.jpg"
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import {useRouter} from "vue-router"
//当前组件的this
const route=useRouter()
//添加高亮色
const active=ref("")
console.log(active);
watch(()=>route.currentRoute.value.meta,(to)=>{
  console.log(route.currentRoute.value);
  if(to.active){
    active.value=route.currentRoute.value.meta.active
    console.log("监听的数据",active.value);
    }else{
      console.log("监听的数据",route.currentRoute.value.path);
    active.value=route.currentRoute.value.path
  }
},{immediate:true})
const isCollapse = ref(false);
emitter.on("isShow",data=>{
    isCollapse.value=!data
    })
onBeforeUnmount(()=>{
    emitter.off("isShow")
})
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  position: fixed;
  height: 100%;
  background-color:rgb(215, 56, 56) ;
  top: 0;
  left: 0;
}
.el-menu{
    border: none;
}
.el-menu-item{
    background-color:rgb(215, 56, 56);
}
/deep/.el-menu-item-group__title{
    padding: 0;
}
.el-sub-menu__title:hover,.el-menu-item:hover{
    background-color:rgb(202, 41, 41);
}
.el-menu-item.is-active{
    color: #fff;
}
/deep/ .is-active {
    background-color:rgb(202, 41, 41)!important;
    color: #fff !important;
  }
.el-menu--collapse{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(215, 56, 56);
    height: 100%;
}
.logo{
    height: 50px;
    line-height: 50px;
    img{
        width: 50px;
        height: 50px;
    }
}
/deep/.el-sub-menu__title:hover{
  background-color: rgb(202, 41, 41);
}
</style>