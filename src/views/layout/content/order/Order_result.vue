<template>
  <div class="order">
    <Breadcrumb></Breadcrumb>
    <div class="order_top_box">
      <el-row>
        <el-col :span="14">
          <div class="order_id_box">
            <div class="order_id">
              <span class="aaa">订单编号:</span>
              <el-input
                placeholder="输入品牌名称"
                class="oreder_id_input inp"
              ></el-input>
            </div>
            <div class="appointment_box">
              <span></span>
              <span class="demonstration">汇总时间:</span>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                class="oreder_id_input"
              >
              </el-date-picker
              >至
              <el-time-select
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                }"
                placeholder="选择时间"
              >
              </el-time-select>
            </div>
            <div class="down_list order_id">
              <div class="down_list_user" style="margin-right: 10px">
                <span class="aaa">下单人:</span>
                <el-input
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
              <div class="block">汇总状态：<el-cascader /></div>
            </div>
          </div>
        </el-col>
        <el-col :span="10" class="abc">
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="oreder_midst">
      <!-- <download-excel
        class="export-excel-wrapper btnRevoke"
        :data="DetailsForm"
        :fields="json_fields"
        :header="title"
        name="商品信息.xls"
      > -->
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
       <el-button type="success" @click="derive">导出</el-button>
      <!-- </download-excel> -->
      <!-- <el-button type="danger" class="btnRevoke" @click="batches"
        >批量撤销</el-button
      > -->
    </div>
    <div class="order_table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        class="isCenter"
        ref="sel"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column
          prop="orderNum"
          label="汇总单编号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="operator"
          label="汇总人"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="phone" align="center" label="联系电话">
        </el-table-column>
        <el-table-column prop="time" align="center" label="汇总时间">
          <template #default="scope">
            {{ dayjs(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" align="center" label="汇总单总价格">
        </el-table-column>
        <el-table-column prop="" align="center" label="操作">
          <template #default="scope">
            <el-button type="danger" @click="revoke(scope)">
              撤销汇总
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination :pag="page_obj"></Pagination>
  </div>
</template>

<script setup>
import "lodash";
import exportExcel from "@/utils/excel.js"
import Pagination from "@/components/Pagination.vue";
import dayjs from "dayjs";
import { inject, onMounted, reactive, ref } from "vue";
const api = inject("$api");
const page_obj = reactive({ page: 1, total: 20 });
//多选的数据
const selectData = ref([]);
//点击多选框
const selectionChange = (selection) => {
  selectData.value = selection;
};
//撤销汇总
const revoke = (scope) => {
  if (selectData.value.length > 0) {
    //允许撤销 撤销的数据要在多选数据里面有
    selectData.value.find((item) => {
      if (item.id == scope.row.id) {
        //执行撤销
        Order_cancel(scope.row.id)
      } else {
        ElMessage({
          message: "请选择勾选的数据",
          type: "warning",
          duration:1000
        });
      }
    });
  }else {
        ElMessage({
          message: "请勾选要撤销的数据",
          type: "warning",
          duration:1000
        });
      }
};
//汇总来的数据
const tableData = ref([]);
//导出
const title = "";
const json_fields = "";
//请求汇总的网络请求
const Order_collect = async () => {
  let res = await api.Order_collect();
  if (res.data.status == 200) {
    tableData.value = res.data.data;
  }
};
//撤销的网络请求
const Order_cancel=async(id)=>{
  let res=await api.Order_cancel({id});
  if(res.data.status==200){
    //重新加载当前页数据
    Order_collect()
  }
  console.log("撤销的网络请求",res);
}
onMounted(() => {
  Order_collect();
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
    overflow: hidden;
    height: 60px;
    line-height: 60px;
    .aaa {
      display: block;
      height: 100%;
      float: left;
    }
    .oreder_id_input {
      float: left;
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
  .abc {
    position: absolute;
    top: 50px;
    left: 600px;
  }
  .btnRevoke {
    margin-right: 20px;
    display: inline-block;
  }
}
</style>