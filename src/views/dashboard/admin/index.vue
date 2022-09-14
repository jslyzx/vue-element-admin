<template>
  <div class="dashboard-editor-container body">
    <el-row>
      <el-col :span="24">
        <el-radio-group
          @change="handleClick()"
          v-model="dateActive"
          style="float: right"
        >
          <el-radio-button label="1" name="1">当年</el-radio-button>
          <el-radio-button label="2" name="2">当季</el-radio-button>
          <el-radio-button label="3" name="3">当月</el-radio-button>
          <el-radio-button label="4" name="4">当天</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <panel-group
      :dotInfo="dotInfo"
      :salesNumInfo="salesNumInfo"
      :salesPriceInfo="salesPriceInfo"
      :salesInfo="salesInfo"
      :queryType="dateActive"
      @handleClick1="getClick1"
      @handleClick2="getClick2"
      @handleClick3="getClick3"
      @handleClick4="getClick4"
    />
    <el-row :gutter="20" class="allChartBox" style="height: 305px">
      <el-col :xs="18" :sm="18" style="height: 100%">
        <div class="chartTitle">患者分布热点图</div>
        <div class="mapBox">
          <div id="map" class="chart-part" style="height: 100%" />
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" style="height: 100%">
        <div class="phBox">
          <div class="phTitle">
            <div>门店销售排行榜（TOP10）</div>
            <span @click="goShop">查看全部</span>
          </div>
          <ul>
            <li class="pbBox">
              <div class="firstPb">排行</div>
              <div class="secondPb">药房</div>
              <div class="thirdPb">本月销售额</div>
            </li>
            <li
              v-for="(item, index) in shopSaleList"
              :key="index"
              class="pbBox bgfff"
            >
              <div class="firstPb">
                <img v-if="index == 0" src="@/assets/index_img/gold.png" />
                <img v-if="index == 1" src="@/assets/index_img/silver.png" />
                <img v-if="index == 2" src="@/assets/index_img/bronze.png" />
                <div v-if="index > 2">{{ index + 1 }}</div>
              </div>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.shopName"
                placement="top-start"
              >
                <div class="secondPb">
                  {{ item.shopName }}
                </div>
              </el-tooltip>
              <div class="thirdPb">￥{{ item.salePrice }}</div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="allChartBox" style="margin-bottom: 0!important;">
      <el-col :xs="18" :sm="18" style="height: 100%">
        <div class="chartTitle">销售统计</div>
        <div class="barChartBox">
          <bar-chart
            v-if="medicine1Data.length > 0"
            :medicine1Data="medicine1Data"
            :medicine2Data="medicine2Data"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  queryDot,
  querySalesPrice,
  querySalesNum,
  querySalesInfo,
  queryCustomerHotInfo,
  queryShopSale,
  querySalesCompletionRate,
  queryMonthSalesPrice,
} from "@/api/home";
import PanelGroup from "./components/PanelGroup";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import echarts from "echarts";
import _ from "lodash";
import ieee754 from "ieee754";

let BMap = {};
let map = {};
let heatmapOverlay = {};

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    PieChart,
    BarChart,
  },
  data() {
    return {
      dateActive: "1",
      salesPriceInfo: {},
      salesPriceData: {
        medicineId: "",
      },
      dotInfo: {},
      dotData: {
        medicineId: "",
      },
      salesNumInfo: {},
      salesNumData: {
        medicineId: "",
      },
      salesInfo: {},
      salesInfoData: {
        medicineId: "",
      },
      options: [],
      shopSaleList: [],
      medicine1Data: [],
      medicine2Data: [],
      salesCompletionRate: {},
    };
  },
  created() {
    const that = this
    setTimeout(() => {
      that.queryDot();
    }, 2000);
    this.querySalesPrice();
    this.querySalesNum();
    this.querySalesInfo();
    this.getHearMap();
    setTimeout(() => {
      that.querySalesInfo();
    }, 3000);
    this.queryShopSale();
    this.querySalesCompletionRate();
    this.queryMonthSalesPrice();
  },
  methods: {
    // 跳转到门店
    goShop() {
      this.$router.push({
        name: "ShopSale",
      });
    },
    // 切换年季月日
    handleClick(tab, event) {
      const that = this
      setTimeout(() => {
        that.queryDot();
      }, 2000);
      this.querySalesPrice();
      this.querySalesNum();
      setTimeout(() => {
        that.querySalesInfo();
      }, 3000);
      this.getHearMap();
      this.queryShopSale();
    },
    // 查患者数
    querySalesInfo() {
      querySalesInfo({
        queryType: this.dateActive,
        medicineId: this.salesInfoData.medicineId,
      }).then((res) => {
        if (res.code == 0) {
          this.salesInfo = res.data[0];
        }
      });
    },
    // 查销售额
    querySalesPrice() {
      querySalesPrice({
        queryType: this.dateActive,
        medicineId: this.salesPriceData.medicineId,
      }).then((res) => {
        if (res.code == 0) {
          this.salesPriceInfo = res.data[0];
        }
      });
    },
    // 查销售数量
    querySalesNum() {
      querySalesNum({
        queryType: this.dateActive,
        medicineId: this.salesNumData.medicineId,
      }).then((res) => {
        if (res.code == 0) {
          this.salesNumInfo = res.data[0];
        }
      });
    },
    // 查DOT
    queryDot() {
      queryDot({
        queryType: this.dateActive,
        medicineId: this.dotData.medicineId,
      }).then((res) => {
        if (res.code == 0) {
          this.dotInfo = res.data[0];
        }
      });
    },
    // 切换规格
    getClick1(item) {
      this.salesPriceData.medicineId = item;
      this.querySalesPrice();
    },
    getClick2(item) {
      this.salesNumData.medicineId = item;
      this.querySalesNum();
    },
    getClick3(item) {
      this.dotData.medicineId = item;
      this.queryDot();
    },
    getClick4(item) {
      this.salesInfoData.medicineId = item;
      this.querySalesInfo();
    },
    // 热力图
    getHearMap() {
      queryCustomerHotInfo({
        queryType: this.dateActive,
      }).then((res) => {
        if (res.code == 0) {
          res.data.forEach((item) => {
            item.count = item.customerNum;
          });
          this.options = res.data;
          this.dealHearMap();
        }
      });
    },
    dealHearMap() {
      BMap = window.BMap;
      map = new BMap.Map("map");
      heatmapOverlay = new BMapLib.HeatmapOverlay({
        radius: 20,
        minOpacity: 0.2,
      });
      var point = new BMap.Point(119.208435, 32.02404);
      map.centerAndZoom(point, 8); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(); // 允许滚轮缩放
      map.setMapStyle({
        styleJson: [
          {
            featureType: "road",
            elementType: "all",
            stylers: {
              color: "#ffffff",
              visibility: "off",
            },
          },
        ],
      });
      heatmapOverlay = new BMapLib.HeatmapOverlay({
        radius: 20,
        minOpacity: 0.2,
      });
      map.addOverlay(heatmapOverlay);
      var maxNum = _.max(
        this.options.map(function (v) {
          return v.customerNum;
        })
      );
      heatmapOverlay.setDataSet({ data: this.options, max: maxNum });
    },
    // 销售预估完成率和年度完成率
    querySalesCompletionRate() {
      querySalesCompletionRate({
        queryType: this.dateActive,
      }).then((res) => {
        if (res.code == 0) {
          this.salesCompletionRate = res.data;
          this.pieChart1();
          this.pieChart2();
        }
      });
    },
    // 每月销售柱状图
    queryMonthSalesPrice() {
      queryMonthSalesPrice({
        queryType: this.dateActive,
      }).then((res) => {
        if (res.code == 0) {
          let arr1 = [];
          let arr2 = [];
          res.data.monthSalesNum160.forEach((item) => {
            arr1.push(item.salesNum);
          });
          res.data.monthSalesNum357.forEach((item) => {
            arr2.push(item.salesNum);
          });
          this.medicine1Data = arr1;
          this.medicine2Data = arr2;
        }
      });
    },
    // 完成率
    pieChart1() {
      const chart = echarts.init(
        document.getElementById("pieChart1"),
        "macarons"
      );
      chart.setOption({
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "预估金额: " + this.salesCompletionRate.salesPrice,
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value:
                  this.salesCompletionRate.salesPrice -
                  this.salesCompletionRate.estimateTotalMetrics,
                name: "未完成金额",
              },
              {
                value: this.salesCompletionRate.estimateTotalMetrics,
                name: "完成金额",
              },
            ],
          },
        ],
      });
    },
    pieChart2() {
      let chart = echarts.init(
        document.getElementById("pieChart2"),
        "macarons"
      );
      chart.setOption({
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "年度金额: " + this.salesCompletionRate.salesPrice,
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value:
                  this.salesCompletionRate.salesPrice -
                  this.salesCompletionRate.totalYearMetrics,
                name: "未完成金额",
              },
              {
                value: this.salesCompletionRate.totalYearMetrics,
                name: "完成金额",
              },
            ],
          },
        ],
      });
    },
    // 门店排行榜
    queryShopSale() {
      queryShopSale({
        queryType: this.dateActive,
      }).then((res) => {
        if (res.code == 0) {
          this.shopSaleList = res.data.splice(0, 10);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 15px !important;
}
.dashboard-editor-container {
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .flexBox {
    display: flex;
    justify-content: space-around;
  }
  .xsyg {
    height: 46%;
    background: #fff;
    display: flex;
  }
  .xsnd {
    height: 46%;
    background: #fff;
    margin-top: 6%;
    display: flex;
  }
  .xsTitleBox {
    width: 60%;
    font-size: 16px;
    padding: 16px 20px;
    .completionRate {
      color: rgba(0, 0, 0, 0.45);
      margin-top: 16px;
      font-size: 14px;
    }
    .completionRateNum {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      color: rgba(42, 130, 228, 1);
      margin-top: 10px;
    }
  }
  .phTitle {
    display: flex;
    justify-content: space-between;
    line-height: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(216, 220, 229, 1);
    margin-bottom: 16px;
    div {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(24, 144, 255, 1);
      cursor: pointer;
    }
  }
  .allChartBox {
    height: 330px;
    margin-bottom: 10px;
    .phBox {
      background: #fff;
      padding: 16px;
      box-sizing: border-box;
      ul {
        // height: 370px;
        // overflow-y: scroll;
      }
      .pbBox {
        display: flex;
        background: rgba(245, 247, 250, 1);
        padding: 8px;
        color: rgba(127, 143, 164, 1);
        font-size: 14px;
        .firstPb {
          width: 50px;
        }
        .secondPb {
          width: calc(70% - 51px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .thirdPb {
          width: 30%;
          text-align: right;
          padding-right: 12px;
        }
      }
      .bgfff {
        background-color: #fff;
        border-bottom: 1px solid rgba(216, 220, 229, 1);
        line-height: 40px;
        box-sizing: border-box;
        height: 53px;
      }
    }
  }
  .barChartBox {
    background-color: #fff;
    padding: 16px;
    box-sizing: border-box;
    height: 290px;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .chartTitle {
    background: #fff;
    line-height: 40px;
    font-size: 16px;
    font-weight: 700;
    vertical-align: top;
    padding-left: 16px;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }
  .mapBox {
    padding: 10px;
    height: calc(100% - 40px);
    background: #fff;
  }
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
    height: 100%;
  }
}
</style>