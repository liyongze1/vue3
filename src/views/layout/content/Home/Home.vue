<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class="num">{{ adjective.saleTotal }}</div>
        <div class="bottom">今日销售额：{{ adjective.sale }}</div>
      </div>
      <div class="item">
        总访问量
        <div class="num">{{ adjective.viewsTotal }}</div>
        <div class="bottom">今日访问量：{{ adjective.views }}</div>
      </div>
      <div class="item">
        总收藏量
        <div class="num">{{ adjective.collect }}</div>
        <div class="bottom">今日销售额：{{ adjective.collect }}</div>
      </div>
      <div class="item">
        总支付量
        <div class="num">{{ adjective.payTotal }}</div>
        <div class="bottom">今日支付量：{{ adjective.pay }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id="box13">
        <div class="title">月销售额</div>
        <div id="charts" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">比例分配</div>
    </div>

    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div>111</div>
            </el-col>
            <el-col :span="8">
              <div>222</div>
            </el-col>
            <el-col :span="8">
              <div>333</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div>111</div>
            </el-col>
            <el-col :span="8">
              <div>222</div>
            </el-col>
            <el-col :span="8">
              <div>333</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import { Home_Sell, Home_MoonSell } from "@/api/home/home.js";
//总数据
const adjective = ref({});
//柱状图的数据
const monthData = ref([]);
//网络请求的数据
async function homeData() {
  let res = await Home_Sell();
  adjective.value = res.data.data.list;
}
async function month() {
  //柱状图 名字
  let monthName = [] ,barData=[],mothLineData=[],pieData=[];
  let res = await Home_MoonSell();
  monthData.value = res.data.result.data.sale_money;
  monthData.value.map((item) => {
    monthName.push(item.name);
    barData.push(item.num)
    mothLineData.push(item.real_amount)
    pieData.push({value:item.num,name:item.name})
  });
  console.log(monthData.value)
  chart(monthName,barData,mothLineData);
  pie(pieData)
}

//柱状图
function chart(x,barData,y) {
  // var myChart = echarts.init(document.getElementById("charts"));
  //解决echart  dom 报错问题
  let dsiab_com=document.getElementById("charts")
  dsiab_com.removeAttribute("_echarts_instance_")
  var myChart=echarts.init(dsiab_com)
  //根据浏览器窗口进行大小调整
  window.addEventListener('resize', function() {
    myChart.resize();
  });
  myChart.setOption({
    xAxis: {
      data: x,
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: barData,
      },
      {
        name: "销售",
        type: "line",
        data: y,
      },
    ],
  });
}
function pie(pieData) {
  var myChart = echarts.init(document.getElementById("box1"));
  window.addEventListener('resize', function() {
    myChart.resize();
  });
  myChart.setOption({
    tooltip:{
      trigger:"item"
    },
    legend:{
      orient:"vertical",
      left:"left"
    },
    series: [
      {
        name: "销量",
        type: "pie",
        data: pieData
      },
    ],
  });
}
onMounted(() => {
  //网络请求的数据
  homeData();
  month();
  // 绘制图表
  // 基于准备好的dom，初始化echarts实例
});
</script>

<!-- 局部样式 scoaped -->
<style lang="less" scoped>
.home {
  margin: 10px;
}
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;
    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }
    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }
  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }
  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }
  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }
  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

.content {
  margin: 20px;
  display: flex;
  height: 320px;
  padding-left: 0;
  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }
  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;
  .box-card {
    flex: 1;
    margin-right: 30px;
    span {
      font-weight: 600;
    }
  }
}
</style>