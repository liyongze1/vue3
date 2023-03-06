<template>
  <div class="add_goods_page">
    <div class="add_goods_list">
      <div class="goods_list-title">
        <h3>产品类型列表</h3>
      </div>
      <div class="goods_list">
        <el-tree :props="props" :load="loadNode" lazy @node-click="clickTree" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
const api = inject("$api");
const store = inject("$store");
const props = {
  label: "name",
  // children: "zones",
  isLeaf: "leaf",
};
const addData = ref([]);
//四个参数：对应于节点点击的节点对象，TreeNode 的 node 属性, TreeNode和事件对象
function clickTree(clickObj, node, treeNode, event) {
  console.log(node);
  //传递节点树的内容
  if (node.parent.data.name) {
    store().addGoodlist.setAddgoodList(node.parent.data.name +"/"+ node.data.name,node.data.cid);
  } else {
    store().addGoodlist.setAddgoodList(node.data.name,node.data.cid);
  }
}
const loadNode = (node, resolve) => {
  //网络请求
  // async function addGoods_list(type) {
  //   let res = await api.product_Add({ type });
  //   if(res.data.status==200){
  //     res.data.result.map(item=>{
  //         addData.value.push({name:item.name})
  //     })
  //   }
  //   console.log("-------",res)
  // }

  if (node.level === 0) {
    api.product_Add().then((res) => {
      if (res.data.status == 200) {
        return resolve(res.data.result);
      } else {
        return resolve([]);
      }
    });
  }
  if (node.level >= 1) {
    api.product_Add({ type: node.data.cid }).then((res) => {
      if (res.data.status == 200) {
        return resolve(res.data.result);
      } else {
        return resolve([]);
      }
    });
  }
};
</script>

<style lang="less" scoped>
.add_goods_page {
  .add_goods_list {
    .el-tree {
      padding-left: 30px;
    }
    .goods_list-title {
      padding-left: 10px;
      height: 50px;
      line-height: 50px;
      background-color: #1e78bf;
    }
    width: 200px;
    height: 666px;
    background-color: #ffffff;
  }
}
</style>