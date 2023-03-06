<template>
  <div class="add_right">
    <!-- 双向数据绑定需要简写 -->
    <el-form
      ref="ruleForm"
      label-width="100px"
      :model="table"
      class="demo-ruleForm"
      :rules="rulesF"
    >
      <el-form-item label="所属分类" prop="category">
        {{ table.category }}
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input type="text" v-model="table.title"></el-input>
        <i></i>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input type="text" v-model="table.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input type="text" v-model="table.num"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input type="text" v-model="table.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="image">
        <AddgoodsImg @fileListCopy="ImgUrl" :Img="table.image"></AddgoodsImg>
      </el-form-item>
      <el-form-item label="商品描述" prop="descs">
        <AddgoodsText ref="textRef" :descs="table.descs"></AddgoodsText>
      </el-form-item>
      <el-form-item label="首页轮播推送" style="padding-left: 10px">
        <el-switch active-color="#13ce66" inactive-color="#999"></el-switch>
      </el-form-item>
      <el-form-item label="是否推送商品" style="padding-left: 10px">
        <el-switch active-color="#13ce66" inactive-color="#999"></el-switch>
      </el-form-item>
      <el-form-item label="是否上架商品" style="padding-left: 10px">
        <el-switch active-color="#13ce66" inactive-color="#999"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="preserve">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button @click="upRooter">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, inject, watch, computed, reactive, toRef, onMounted,onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter,useRoute } from "vue-router";
import AddgoodsImg from "./AddgoodsImg.vue";
import AddgoodsText from "./AddgoodsText.vue";
const store = inject("$store");
const api = inject("$api");
//router route 必须在顶级作用域下使用
const route=useRoute()
const router = useRouter();
const table = ref({
  // title,cid ,category,sellPoint,price,num,descs,image
  title: "",
  cid: "",
  category: "",
  sellPonint: "",
  price: "",
  descs: "",
  image: [],
  num: "",
});
//富文本内容
const textRef = ref(null);
//监听仓库变化实现响应式   （）=>监听单个数据源
watch(
  () => store().addGoodlist.name,
  (ne) => {
    table.value.category = ne;
    table.value.cid = store().addGoodlist.cid;
  }
);
//判断仓库有没有数据
const isStore=store().addGoodsEdit.addGoods
if(Object.values(isStore).length>0){
    table.value=isStore
}
//表单验证
const ruleForm = ref(null);
const rulesF = {
  //表单项名        必填项          提示信息               什么事件会触发这个错误
  category: [{ required: true, message: "请输入商品类目", trigger: "blur" }],
  title: [{ required: true, message: "请输入商品名称", trigger: "" }],
  price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
  num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
  sellpoint: [{ required: true, message: "请输入商品卖点", trigger: "blur" }],
  descs: [{ required: true, message: "请输入商品描述", trigger: "blur" }],
};

//添加的方法
function ImgUrl(n) {
  console.log("添加的图片数据", n);
  table.value.image = n;
  console.log("添加的图片数据", table.value);
}
//删除的方法
function removeImg(n) {
  //返回要删除的元素的下标
  let removeID = table.image.findIndex((item) => item.cid == n.cid);
  table.image.splice(removeID, 1);
}
//保存
const preserve = async () => {
  table.value.descs = textRef.value.valueHtml;
  console.log(table);
  await ruleForm.value.validate((valid, fields) => {
    // valid 返回一个布尔值 fields 返回表单验证规则
    if (valid) {
      console.log(table);
      //验证成功 存储数据执行网络请求
      // title cid  category sellPoint price num descs paramsInfo image
      let { title, cid, category, sellPoint, price, num, descs, image } =
        table.value;
      console.log("存储的图片地址-------", image);
      let arrURL = [];
      image.map((item) => {
        arrURL.push(item);
      });
      let obj = {
        title,
        cid,
        category,
        sellPoint,
        price,
        num,
        descs,
        image: JSON.stringify(arrURL),
      };
      //存储仓库
      store().addGoodsEdit.setAddgoods(obj);
      list(obj);
    } else {
      ElMessage({
        message: "必填项没有填!",
        type: "warning",
      });
    }
  });
};
//重置
const resetForm = () => {
  table.value = {};
};
//取消 删除本地存储 删除仓库的数据
const upRooter = () => {
  store().addGoodsEdit.removeAddgoods();
  router.push("/product/list");
};
//保存的网络请求
const list = async (params) => {
  let res = await api.product_AddGoods({ params });
  console.log(res);
};
//组件卸载清空本地存储
onUnmounted(()=>{
  localStorage.removeItem("addGoodsInfo")
})
onMounted(()=>{
  console.log("当前路由信息",route);
})
</script>
<style lang="less" scoped>
.add_right {
  width: 100%;
  float: left;

  .el-form {
    padding-right: 20px;
  }
  .el-textarea__inner {
    min-height: 50px;
    height: 100px;
  }
  .AddImg {
    overflow: hidden;
    position: relative;
    min-height: 150px;
    line-height: 150px;
  }
  .AddImg_title {
    float: left;
    width: 88px;
    margin-left: 12px;
    font-size: 14px;
  }
  .Add {
    float: left;
  }
}
</style>