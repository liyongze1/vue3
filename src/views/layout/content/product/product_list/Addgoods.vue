<template>
  <div class="addGoods">
    <div class="addGoods_list">
      <AddgoodsList></AddgoodsList>
    </div>
    <div class="addGoods_edit">
      <Addgoodedit></Addgoodedit>
    </div>
  </div>
</template>

<script setup>
import AddgoodsList from "./addGoods/Addgoods_List.vue";
import Addgoodedit from "./addGoods/AddgoodsEdit.vue";
</script>

<style lang="less" scoped>
.addGoods {
  width: 1220px;
  height: 100%;
  margin: 10px;
  overflow: hidden;
  .addGoods_list {
    float: left;
    height: 100%;
  }
  .addGoods_edit {
    background-color: #fff;
    margin-left: 10px;
    float: left;
    width: 1010px;
  }
}
</style>