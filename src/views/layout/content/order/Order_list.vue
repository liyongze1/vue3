<template>
<Breadcrumb></Breadcrumb>
  <div class="order" ref="order">
    <div class="order_top_box">
      <el-row>
        <el-col :span="14"
          ><div class="order_id_box">
            <div class="order_id">
              <span class="aaa">订单编号:</span>
              <el-input
                v-model="input"
                placeholder="输入品牌名称"
                class="oreder_id_input inp"
              ></el-input>
            </div>
            <el-row>
              <el-col :span="24">
                <div class="appointment_box">
                  <span></span>
                  <span class="demonstration">预定时间:</span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    class="oreder_id_input"
                  >
                  </el-date-picker
                  >至
                  <el-time-select
                    v-model="time"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                    }"
                    placeholder="选择时间"
                  >
                  </el-time-select>
                </div>
              </el-col>
            </el-row>
            <div class="down_list order_id">
              <div class="down_list_user" style="margin-right: 10px">
                <span class="aaa">下单人:</span>
                <el-input
                  v-model="userInput"
                  placeholder="输入下单人"
                  class="oreder_id_input inp"
                  style="margin-left: 25px"
                ></el-input>
              </div>
              <div class="order_id">
                <span class="aaa">所属单位:</span>
                <el-input
                  placeholder="输入单位名称"
                  class="oreder_id_input inp"
                ></el-input>
              </div>
            </div>
            <div class="result_data">
              <div class="block">
                汇总状态：
                <el-cascader v-model="value" :options="options" />
              </div>
            </div></div
        ></el-col>
        <el-col :span="10" class="abc"
          ><el-button type="primary">查询</el-button></el-col
        >
      </el-row>
    </div>
    <div class="oreder_midst">
      <el-button type="primary" class="aaaa" @click="orderGther"
        >订单汇总</el-button
      >
      <!-- <download-excel
        class="export-excel-wrapper"
        :data="DetailsForm"
        :fields="json_fields"
        :header="title"
        name="商品信息.xls"
      > -->
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
      <el-button type="success" @click="derive">导出</el-button>
      <!-- </download-excel> -->
    </div>
    <div class="order_table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        class="isCenter"
        @select="select"
      >
        <el-table-column type="selection" :selectable="selectable" />
        <el-table-column
          prop="code"
          label="订单编号"
          width="180"
          align="center"
        >
          <template #default="scope">
            <span
              @click="orderDecs(scope.row)"
              style="color: blue; cursor: pointer"
            >
              {{ scope.row.code }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ordername"
          label="下单人"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="company" align="center" label="所属单位">
        </el-table-column>
        <el-table-column prop="phone" align="center" label="联系电话">
        </el-table-column>
        <el-table-column prop="yudingTime" align="center" label="预定时间">
          <template #default="scope">
            {{ dayjs(scope.row.yudingTime).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column prop="price" align="center" label="订单总价格">
        </el-table-column>
        <el-table-column prop="huizongStatus" align="center" label="汇总状态">
          <template #default="scope">
            {{ scope.row.huizongStatus == 1 ? "未汇总" : "已汇总" }}
          </template>
        </el-table-column>
      </el-table>
      <!-- 总条数和页数 -->
      <Pagination :pag="page_obj" @result="product_One_List"></Pagination>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, reactive } from "vue";
import Pagination from "@/components/Pagination.vue";
import dayjs from "dayjs";
import { exportExcel } from "../../../../utils/excel";
import { ElStep } from "element-plus";
import { Message } from "@element-plus/icons-vue";
import {useRoute} from "vue-router"
const route=useRoute()
console.log("路由信息标识",route);
const api = inject("$api");
console.log(api);
//表格的数据
const tableData = ref([]);
//导出表格的中文名字
const excel = [
  "订单编号",
  "下单人",
  "所属单位",
  "联系电话",
  "预定时间",
  "汇总订单总价格",
];
//总页数和总条目数
const page_obj = reactive({ page: 8 });
//订单编号内容
const input = ref();
//预定日期
const value1 = ref();
//预定时间
const time = ref();
//下单人
const userInput = ref();
//汇总状态
const value = ref();
const options = ref([
  {
    value: "已汇总",
    label: "已汇总",
  },
  {
    value: "未汇总",
    label: "未汇总",
  },
]);
//汇总的数据
const huizong = ref([]);
//当前页码
const current_page = ref();
//点击订单汇总
const orderGther = () => {
  if (huizong.value.length > 1) {
    //执行汇总
    let ids = [];
    huizong.value.map((item) => {
      ids.push(item.id);
    });
    // console.log(ids);
    Order_changeStatus(String(ids));
  } else {
    ElMessage({
      message: "汇总数据必须大于1条",
      type: "warning",
    });
  }
};
//点击导出
const derive = () => {
  if (huizong.value.length > 0) {
    //导出       表格数据          表哥文件名  表格头 
    exportExcel(tableData.value, "test", excel, "sheetName");
  }
};
//点击表格的多选框触发
const select = (selection, row) => {
  huizong.value = selection;
  console.log("当前行的数据", selection);
};
//点击表格的多选框触发
const selectable = (row, index) => {
  if (row.huizongStatus == 2) {
    return false;
  } else {
    return true;
  }
};
//网络请求
const product_One_List = async (page = 1) => {
  //当前的页码
  current_page.value = page;
  let res = await api.product_One_List({ page });
  if (res.data.status == 200) {
    tableData.value = res.data.data;
    page_obj.total = res.data.total;
    // console.log(page.value.total=1);
    // page.total=res.data.total
  }
};
//汇总的网络请求
const Order_changeStatus = async (ids) => {
  let res = await api.Order_changeStatus({ ids });
  if (res.data.status == 200) {
    ElMessage({
      message: "汇总成功",
      type: "success",
    });
    //当前页的网络请求
    product_One_List(current_page.value);
  }
  console.log(res);
};
onMounted(() => {
  product_One_List();
});
</script>

<style lang="less" scoped>
.order {
  padding: 10px;
  background-color: #fff;
  .order_top_box {
    margin-bottom: 15px;
    height: 200px;
  }
  .order_btn {
    text-align: right;
    transform: translate(-200px, -100px);
  }
  /deep/.inp {
    width: 200px;
  }
  .oreder_id_input {
    width: 200px;
    margin-left: 10px;
  }
  .order_id {
    height: 60px;
    line-height: 60px;
    width: 600px;
    .aaa {
      display: block;
      height: 100%;
      float: left;
    }
    .oreder_id_input {
      float: left;
      margin-top: 10px;
    }
  }
  .oreder_midst {
    padding: 10px;
    border: 1px solid #eee;
    margin-bottom: 10px;
    .aaaa {
      width: 100px;
      background-color: orange;
      margin-right: 10px;
      border: none;
    }
  }
  .order_table {
    .isCenter {
      text-align: center;
    }
  }
}
.abc {
  position: absolute;
  top: 50px;
  left: 600px;
}
.export-excel-wrapper {
  display: inline-block;
}
</style>