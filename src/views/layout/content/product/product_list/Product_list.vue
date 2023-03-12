<template>
  <div class="product_list">
    <Breadcrumb></Breadcrumb>
    <div class="product_info">
      <div class="product_info_top">
        <div class="product_name">
          <span class="name">产品名称:</span>
          <input
            type="text"
            placeholder="产品名称"
            style="border: 1px solid #dcdfe6"
            class="inp"
            v-model="inputInp"
            @keyup.enter="search"
          />
        </div>
        <div class="product_time">
          <div class="block">
            <span class="demonstration">添加时间:</span>
            <el-date-picker type="date" placeholder="选择日期" size="small">
            </el-date-picker>
          </div>
        </div>
        <div class="btn">
          <button class="product_search" @click="search">查询</button>
        </div>
      </div>
      <div class="product_ac">
        <el-button type="primary" @click="jumpAddGoods">
          <el-icon><Plus /></el-icon>添加商品</el-button
        >
        <el-button type="danger"
          ><el-icon><Delete /></el-icon>批量删除</el-button
        >
      </div>
    </div>
    <div class="product_tab">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :border="true"
        @select="productSelect"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品编号" width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="category"
          label="商品类目"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="添加时间"
          width=""
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="num" label="商品描述" align="center">
          <template #default="scope">
            {{ removeHTMLTag(scope.row.descs) }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="200" align="center">
          <template #default="scope">
            <el-button type="primary" @click="editClick(scope)">编辑</el-button>
            <el-button type="danger" @click="handleClick(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination @result="product_List" :pag="result"></Pagination>
    <Dialog
      ref="isShow"
      :del="deleteProduct"
      :page="currentPage"
      :delID="del"
    ></Dialog>
  </div>
</template>

<script setup>
import Pagination from "@/components/Pagination.vue";
import Dialog from "@/components/digLog/Dialog.vue";
import { onMounted, getCurrentInstance, inject, ref, watch, reactive} from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { removeHTMLTag } from "../../../../../utils/html";
//仓库数据
const store = inject("$store");
const router = useRouter();
//表格数据
const tableData = ref([]);
//当前行的数据
let rowData={}
//总数据每页显示条数 和总数据
let result = ref({});
//需要删除的数据
let delData = ref([]);
//digLog
const isShow = ref(null);
//获取全局指令的方法2 inject
const api = inject("$api");
// const symbol=true
//编辑
function str(n){
  return n.replace(/^http\:\/\/localhost\:4000\//,"/bpi/")
}
const editClick = (scope) => {
  rowData=scope.row
  let {image}=rowData
  rowData.image=image.split(",")
  rowData.image=rowData.image.map((item)=>{
    return item={url:str(item)}
  })
  console.log("元素换成数组",rowData.image);
  store().addGoodsEdit.setAddgoods(rowData);
  router.push("/product/addgoods");
};
//点击搜索
let inputInp = ref("");
//当前页码
let currentPage = ref(1);
//删除的id
let del = ref();
//侦听器监听当前页面的数据变化
watch(tableData, (newData) => {
  if (newData.length < 1 && currentPage > 1) {
    product_List(currentPage - 1);
  }
});
//查找多选框的数组
function inxof(n) {
  return delData.value.includes(n);
}
//搜索
function search() {
  //搜索框有数据执行网络请求没有返回最开始的请求界面
  if (inputInp.value.length > 0) {
    searchProduct(inputInp.value);
  } else {
    product_List(1);
  }
}
//勾选多选按钮的回调
function productSelect(selection, row) {
  delData.value = selection;
}
//跳转路由
const jump = useRouter();
function jumpAddGoods() {
  jump.push("/product/addgoods");
}
//删除当前数据
const handleClick = (n) => {
  if (delData.value.length > 0 && inxof(n.row)) {
    del.value = n.row.id;
    isShow.value.isShow();
  } else {
    ElMessage({
      message: "请勾选左侧选框进行删除",
      type: "warning",
    });
  }
};
//获取全局指令的方法1
// const app=getCurrentInstance()
//网络请求
//表格渲染 要一个参数页码
const product_List = async (page = 1) => {
  //页码赋值
  currentPage = page;
  let res = await api.product_List({ page });
  if (res.data.status == 200) {
    tableData.value = JSON.parse(JSON.stringify(res.data.data));
    tableData.value.forEach((item) => {
      item.create_time = dayjs(item.create_time).format("YYYY/MM/DD HH:hh:ss");
    });
    //设置总数据
    result.value.total = parseInt(res.data.total);
    result.value.page = res.data.pageSize;
  }
  console.log(res.data.data);
};
//搜索接口 参数：search
const searchProduct = async (search) => {
  let res = await api.product_Search({ search });
  if (res.status == 200) {
    let searchArr = [];
    console.log(res);
    res.data.result.forEach((item) => {
      searchArr.push(item);
    });
    tableData.value = searchArr;
  }
};
//删除的接口 参数:id
const deleteProduct = async (id) => {
  let res = await api.product_Delet({ id });
  if (res.status == 200) {
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    //删除成功获取当前页的页码去执行网络请求
    product_List(currentPage);
    delData.value = [];
  }
};
//生命周期
onMounted(() => {
  product_List();
  //获取全局指令的方法1
  // console.log(app.appContext.config.globalProperties.$api)
});

</script>

<style lang="less" scoped>
.product_pilot {
  padding-left: 10px;
  font-weight: 700px;
  .color {
    color: #999;
  }
  .pilot {
    &::after {
      content: "/";
      width: 1px;
      height: 3px;
      color: #999;
      margin: 0 2px;
    }
  }
  .pilot:last-child {
    &::after {
      content: "";
    }
  }
}
.product_info {
  margin: 10px;
  padding: 10px;
  background: #fff;
  text-align: left;
  .product_ac {
    border: 1px solid #eee;
    padding: 10px;
  }
}
.product_info_top {
  margin-bottom: 25px;
  .btn {
    line-height: 30px;
  }
  .product_search {
    padding: 6px 10px;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
  }
}
.product_name {
  float: left;
  margin-right: 10px;
  height: 30px;
  line-height: 30px;
  .name {
    margin-right: 5px;
  }
  .inp {
    width: 200px;
    height: 100%;
    border-radius: 5px;
    padding-left: 5px;
  }
}
.product_time {
  float: left;
  margin-right: 10px;
  height: 32px;
  line-height: 32px;
}
.product_tab {
  margin: 10px;
  background-color: #fff;
}
/deep/.el-input__wrapper {
  height: 32px;
  line-height: 12px;
}
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  height: 32px;
}
</style>