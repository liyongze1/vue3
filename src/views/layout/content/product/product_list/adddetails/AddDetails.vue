<template>
  <div class="custom-tree-container">
    <div class="custom-nav">
      <el-button size="small" type="success" class="btn_one" @click="One_Nav">
        新增一级类目
      </el-button>
    </div>
    <el-tree
      :data="dataSource"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
      @check-change="check"
    />
  </div>
  <Dialog ref="diaRef" :name="name" @addDetail="addDetail_par"></Dialog>
</template>

<script setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
import Dialog from "./AddDetail_Dialog.vue";
import { ref, inject, onMounted } from "vue";
const api = inject("$api");
//父元素获取子元素的 方法控制diglog显示隐藏
const diaRef = ref(null);
//节点树的cid
const cid = ref();
//标题名称
const name = ref();
//获取子组件的属性
const dataSource = ref([]);
//方法标识
let pd = 0;
//节点树的id
let id = 0;
const check = (data, option, sunOption) => {
  id = data.id;
  console.log(data, id);
};
//添加
const append = (data) => {
  pd = 1;
  //父元素获取子元素的 方法控制diglog显示隐藏
  diaRef.value.dialogVisible = true;
  diaRef.value.header = "新增【" + data.name + "】商品类目";
  cid.value = data.cid;
};
//修改
const upData = (data) => {
  pd = 2;
  diaRef.value.dialogVisible = true;
  diaRef.value.header = "修改【" + data.name + "】类目名称";
  id = data.id;
};
//删除
const remove = (data) => {
  pd = 3;
  diaRef.value.isShow = false;
  id = data.id;
  diaRef.value.dialogVisible = true;
  diaRef.value.header = "是否删除【" + data.name + "】商品类目";
};
//新增一级导航类目 name
const One_Nav = () => {
  pd = 4;
  diaRef.value.dialogVisible = true;
  diaRef.value.header = "增加一级类目";
};
//页面内容渲染
const renderContent = (h, { node, data, store }) => {
  //   console.log(node.data.name);//表示所有的节点
  // console.log(data);//表示当前的节点的属性
  // console.log(store);
  // console.log(h);
  //h函数有三个参数 第一个表示渲染内容的标签 第二个参数表示节点的属性
  return (
    //大括号里面是jsx语法
    <span class="custom-tree-node">
      <span>{node.data.name}</span>
      {node.level == 1 ? (
        <span class="box">
          <el-button
            size="small"
            type="primary"
            onClick={() => append(data)}
            class="btn_add"
          >
            新增
          </el-button>
          <el-button
            size="small"
            type="success"
            onClick={() => upData(data)}
            class="btn_add"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="danger"
            onClick={() => remove(data)}
            class="btn_add"
          >
            <el-icon>
              <Delete />
            </el-icon>
            删除
          </el-button>
        </span>
      ) : (
        <span class="box box1">
          <el-button
            size="small"
            type="success"
            onClick={() => upData(data)}
            class="btn_add"
          >
            修改
          </el-button>
          <el-button
            size="small"
            onClick={() => remove(data)}
            class="btn_add"
            type="danger"
          >
            <el-icon>
              <Delete />
            </el-icon>
            删除
          </el-button>
        </span>
      )}
    </span>
  );
};
//dialog的确定方法
const addDetail_par = (name) => {
  switch (pd) {
    case 1:
      product_AddDetail(cid.value, name);
      break;
    case 2:
      product_AlterName(id, name);
      break;
    case 3:
      product_Delet_Detail(id);
      break;
    case 4:
      product_One_Detail(name);
      break;
    default:
  }
};
//存放数据
const data = async () => {
  let res = await api.product_itemCategory();
  let data = res.data.result;
  //获取一级目录   存放二级目录
  let oneArr = [],
    twoArr = [];
  data.map((item) => {
    if (item.type == 1) {
      item.children = [];
      oneArr.push(item);
    } else {
      twoArr.push(item);
    }
  });
  oneArr.map((one) => {
    twoArr.map((two) => {
      if (one.cid == two.type) {
        one.children.push(two);
      }
    });
  });
  //合并数组对象
  Object.assign(dataSource.value, oneArr);
};
//网络请求 添加子类目cid  name
const product_AddDetail = async (cid, name) => {
  let res = await api.product_AddDetail({ cid, name });
  if (res.data.status == 200) {
    ElMessage({
      message: "添加成功",
      type: "success",
    });
    data();
  } else {
    ElMessage.error("添加失败");
  }
};
//网络请求 修改类目id  name
const product_AlterName = async (id, name) => {
  let res = await api.product_AlterName({ id, name });
  if (res.data.result == 200) {
    ElMessage({
      message: "修改成功",
      type: "success",
    });
    data();
  } else {
    ElMessage.error("修改失败");
  }
};
//网络请求 删除的类目id
const product_Delet_Detail = async (id) => {
  let res = await api.product_Delet_Detail({ id });
  if (res.data.status == 200) {
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    diaRef.value.isShow = true;
    data();
  } else {
    ElMessage.error("删除失败");
  }
  console.log(res);
};
//网络请求 新增一级导航类目
const product_One_Detail = async (name) => {
  let res = await api.product_One_Detail({ name });
   if (res.data.status == 200) {
    ElMessage({
      message: "添加成功",
      type: "success",
    });
    data();
  } else {
    ElMessage.error("添加失败");
  }
};
onMounted(() => {
  data();
});
</script>

<style>
.custom-tree-container {
  padding: 20px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.btn_one {
  height: 30px;
}
.custom-nav {
  height: 50px;
  background-color: #ccc;
  line-height: 50px;
  margin-bottom: 10px;
}
</style>
