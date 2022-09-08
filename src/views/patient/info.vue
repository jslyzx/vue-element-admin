<template>
  <div class="body">
    <div class="formCard">
      <sale-form :rule-form="ruleForm" />
      <div class="chartBox">
        <div class="display">
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>患者总数</span>
                </div>
                <div>
                  <span
                    style="
                      float: right;
                      font-size: 12px;
                      color: rgba(53, 64, 82, 1);
                    "
                    ><i
                      class="el-icon-warning-outline"
                      style="margin-right: 5px"
                    />时间范围内发生购买行为的患者数量
                  </span>
                </div>
              </div>
              <div class="bottomBox">
                <div v-show="tabIndex == 'total'">
                  <div class="price">1,438,900</div>
                  <div class="compare">
                    <div>
                      <span>同比</span
                      ><span style="margin-left: 19px">67.66%</span
                      ><span style="margin-left: 16px"
                        ><img src="@/assets/sale_images/路径 16.png"
                      /></span>
                    </div>
                    <div style="margin-left: 37px">
                      <span>环比</span
                      ><span style="margin-left: 19px">-15.89%</span
                      ><span style="margin-left: 16px"
                        ><img src="@/assets/sale_images/Info Icon.png"
                      /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>患者DOT</span>
                </div>
                <div>
                  <span
                    style="
                      float: right;
                      font-size: 12px;
                      color: rgba(53, 64, 82, 1);
                    "
                    ><i
                      class="el-icon-warning-outline"
                      style="margin-right: 5px"
                    />DOT=AVG(SUM(购药量/默认计量/30))
                  </span>
                </div>
              </div>
              <div class="bottomBox">
                <div v-show="tabIndex2 == 'total'">
                  <div class="price">1,438,900</div>
                  <div class="compare">
                    <div>
                      <span>同比</span
                      ><span style="margin-left: 19px">67.66%</span
                      ><span style="margin-left: 16px"
                        ><img src="@/assets/sale_images/路径 16.png"
                      /></span>
                    </div>
                    <div style="margin-left: 37px">
                      <span>环比</span
                      ><span style="margin-left: 19px">-15.89%</span
                      ><span style="margin-left: 16px"
                        ><img src="@/assets/sale_images/Info Icon.png"
                      /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>新增患者数</span>
                </div>
                <div>
                  <span
                    style="
                      float: right;
                      font-size: 12px;
                      color: rgba(53, 64, 82, 1);
                    "
                    ><i
                      class="el-icon-warning-outline"
                      style="margin-right: 5px"
                    />时间范围内新增患者占总患者比重
                  </span>
                </div>
              </div>
              <div class="bottomBox">
                <div v-show="tabIndex3 == 'total'">
                  <div class="price">1,438,900</div>
                  <div class="compare">
                    <div>
                      <span>同比</span
                      ><span style="margin-left: 19px">67.66%</span
                      ><span style="margin-left: 16px"
                        ><img src="@/assets/sale_images/路径 16.png"
                      /></span>
                    </div>
                    <div style="margin-left: 37px">
                      <span>环比</span
                      ><span style="margin-left: 19px">-15.89%</span
                      ><span style="margin-left: 16px"
                        ><img src="@/assets/sale_images/Info Icon.png"
                      /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>患者脱落数</span>
                </div>
                <div>
                  <span
                    style="
                      float: right;
                      font-size: 12px;
                      color: rgba(53, 64, 82, 1);
                    "
                    ><i
                      class="el-icon-warning-outline"
                      style="margin-right: 5px"
                    />时间范围内脱落患者占总患者比重
                  </span>
                </div>
              </div>
              <div class="bottomBox">
                <div v-show="tabIndex4 == 'total'">
                  <div class="price">1,438,900</div>
                  <div class="compare">
                    <div>
                      <span>同比</span
                      ><span style="margin-left: 19px">67.66%</span
                      ><span style="margin-left: 16px"
                        ><img src="@/assets/sale_images/路径 16.png"
                      /></span>
                    </div>
                    <div style="margin-left: 37px">
                      <span>环比</span
                      ><span style="margin-left: 19px">-15.89%</span
                      ><span style="margin-left: 16px"
                        ><img src="@/assets/sale_images/Info Icon.png"
                      /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="chartDisplay">
          <el-card>
            <div class="inBox">
              <div class="topBox">
                <h3 style="margin-top: 1px">月度数据统计</h3>
                <div style="margin-top: -5px"></div>
              </div>
              <div>
                <div id="chartBox" ref="chartBox" class="inChartBox" />
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import saleForm from "@/components/saleForm";
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
export default {
  name: "PatientInfo",
  components: {
    saleForm,
  },
  data() {
    return {
      ruleForm: {
        time: "year",
        year: "",
        startMonth: "",
        endMonth: "",
        goods: "",
        bigArea: "",
        middleArea: "",
        provienceArea: "",
        shop: "",
      },
      tabIndex: "total",
      tabIndex2: "total",
      tabIndex3: "total",
      tabIndex4: "total",
    };
  },
  computed: {},
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      const charts1 = echarts.init(
        document.getElementById("chartBox"),
        "macarons"
      );
      charts1.setOption({
        yAxis: {
          type: "value",
          name: "患者数量（人）",
          show: true,
          axisLine: {
            show: true,
          },
          min: 0,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["患者数量", "患者增长数", "患者脱落", "患者DOT"],
          top: 0,
          right: 410,
          icon: "roundRect",
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          },
        ],
        series: [
          {
            data: [821, 932, 732, 612, 732, 1231, 355, 612, 497, 868, 812, 456],
            type: "bar",
            name: "患者数量",
            barWidth: "17",
            itemStyle: {
              color: "#3AA0FF",
            },
          },
          {
            data: [220, 412, 215, 148, 517, 167, 321, 80, 192, 447, 641, 187],
            type: "bar",
            name: "患者增长数",
            barWidth: "17",
            itemStyle: {
              color: "#00BAAD",
            },
          },
          {
            data: [22, 41, 52, 81, 72, 17, 33, 48, 19, 67, 16, 27],
            type: "bar",
            name: "患者脱落",
            barWidth: "17",
            itemStyle: {
              color: "#9873F0",
            },
          },
          {
            data: [2, 1, 2, 1, 2, 1, 3, 4, 1, 6, 1, 2],
            type: "bar",
            name: "患者DOT",
            barWidth: "17",
            itemStyle: {
              color: "#FF4F7B",
            },
          },
        ],
      });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.body {
  width: 100%;
  height: 100vh;
  background: rgba(235, 238, 242, 1);
  padding: 29px;
}

.formCard {
  margin: 0px 24px 25px -10px;
  width: 1655px;
  height: 143px;
}

.chartBox {
  margin: 25px 24px 25px -1px;
  width: 1655px;
  height: 80vh;
  background-color: #fff;
  padding: 39px 36px 34px 27px;

  .display {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    .s_box {
      width: 383px;
      height: 140px;

      ::v-deep .el-card__body {
        padding: 0px !important;
      }

      .topBox {
        width: 100%;
        height: 41px;
        line-height: 41px;
        border-bottom: 1px solid rgba(216, 220, 229, 1);
        display: flex;
        justify-content: space-between;
        padding: 0 26px 0 16px;

        ::v-deep .el-tabs__header {
          margin: -15px 0 15px;
        }
      }

      .bottomBox {
        width: 100%;
        padding: 10px 29px 0 16px;

        .price {
          font-size: 36px;
          font-weight: 700;
          color: rgba(58, 160, 255, 1);
          text-align: left;
        }

        .compare {
          display: flex;
          flex-flow: row nowrap;
          padding: 10px 0 0 0;
        }
      }
    }
  }

  .chartDisplay {
    margin-top: 32px;
    width: 1593px;
    display: flex;
    flex-flow: row wrap;

    ::v-deep .el-card__body {
      padding: 0px !important;
    }

    .inBox {
      height: 100%;
      width: 1593px;

      .topBox {
        height: 52px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 16px 16px 10px 20px;
        border-bottom: 1px solid rgba(216, 220, 229, 1);
      }

      .inChartBox {
        margin: 0 auto;
        width: 100%;
        height: 500px;
        padding: 20px 10px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
  