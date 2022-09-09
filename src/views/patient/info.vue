<template>
  <div class="body">
    <div class="formCard">
      <sale-form :rule-form="ruleForm" @changeForm="changeForm" />
    </div>
    <div class="chartBox">
        <div class="display">
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>患者总数</span>
                </div>
                <div>
                  <span style="
                      float: right;
                      font-size: 12px;
                      color: rgba(53, 64, 82, 1);
                    "><i class="el-icon-warning-outline" style="margin-right: 5px" />时间范围内发生购买行为的患者数量
                  </span>
                </div>
              </div>
              <div class="bottomBox">
                <div v-show="tabIndex == 'total'">
                  <div class="price">{{num.value}}人</div>
                  <div class="compare">
                    <div>
                      <span>同比</span><span style="margin-left: 16px">{{num.yoy}}</span><span style="margin-left: 16px"><img v-if="parseFloat(num.yoy) >= 0" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span>
                    </div>
                    <div style="margin-left: 26px">
                      <span>环比</span><span style="margin-left: 16px">{{num.mom}}</span><span style="margin-left: 16px"><img v-if="parseFloat(num.mom) >= 0" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span>
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
                  <span style="
                      float: right;
                      font-size: 12px;
                      color: rgba(53, 64, 82, 1);
                    "><i class="el-icon-warning-outline" style="margin-right: 5px" />DOT=AVG(SUM(购药量/默认计量/30))
                  </span>
                </div>
              </div>
              <div class="bottomBox">
                <div v-show="tabIndex2 == 'total'">
                  <div class="price">{{dot.value}}月</div>
                  <div class="compare">
                    <div>
                      <span>同比</span><span style="margin-left: 16px">{{dot.yoy}}</span><span style="margin-left: 16px"><img v-if="parseFloat(dot.yoy) >= 0" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span>
                    </div>
                    <div style="margin-left: 26px">
                      <span>环比</span><span style="margin-left: 16px">{{dot.mom}}</span><span style="margin-left: 16px"><img v-if="parseFloat(dot.mom) >= 0" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span>
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
                  <span style="
                      float: right;
                      font-size: 12px;
                      color: rgba(53, 64, 82, 1);
                    "><i class="el-icon-warning-outline" style="margin-right: 5px" />时间范围内新增患者占总患者比重
                  </span>
                </div>
              </div>
              <div class="bottomBox">
                <div v-show="tabIndex3 == 'total'">
                  <div class="price">{{newNum.value}}人</div>
                  <div class="compare">
                    <div>
                      <span>同比</span><span style="margin-left: 16px">{{newNum.yoy}}</span><span style="margin-left: 16px"><img v-if="parseFloat(newNum.yoy) >= 0" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span>
                    </div>
                    <div style="margin-left: 26px">
                      <span>环比</span><span style="margin-left: 16px">{{newNum.mom}}</span><span style="margin-left: 16px"><img v-if="parseFloat(newNum.mom) >= 0" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span>
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
                  <span style="
                      float: right;
                      font-size: 12px;
                      color: rgba(53, 64, 82, 1);
                    "><i class="el-icon-warning-outline" style="margin-right: 5px" />时间范围内脱落患者占总患者比重
                  </span>
                </div>
              </div>
              <div class="bottomBox">
                <div v-show="tabIndex4 == 'total'">
                  <div class="price">{{stopNum.value}}人</div>
                  <div class="compare">
                    <div>
                      <span>同比</span><span style="margin-left: 16px">{{stopNum.yoy}}</span><span style="margin-left: 16px"><img v-if="parseFloat(stopNum.yoy) >= 0" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span>
                    </div>
                    <div style="margin-left: 26px">
                      <span>环比</span><span style="margin-left: 16px">{{stopNum.mom}}</span><span style="margin-left: 16px"><img v-if="parseFloat(stopNum.mom) >= 0" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span>
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
</template>
<script>
import { queryPatientAnalysis } from '@/api/system'
import saleForm from "@/components/saleForm"
import echarts from "echarts"
import _ from 'lodash'
require("echarts/theme/macarons")
export default {
  name: "PatientInfo",
  components: {
    saleForm
  },
  data() {
    return {
      ruleForm: {
        queryType: 1,
        year: "2022",
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
      num: {},
      newNum: {},
      dot: {},
      stopNum: {},
      list: []
    }
  },
  created() {
    this.changeForm(this.ruleForm)
  },
  methods: {
    async queryPatientAnalysis(form) {
      const res = await queryPatientAnalysis(form)
      this.num = res.data.num
      this.newNum = res.data.newNum
      this.dot = res.data.dot
      this.stopNum = res.data.stopNum
      this.list = res.data.list
    },
    changeForm(form) {
      this.queryPatientAnalysis(form)
    },
    initCharts() {
      const charts1 = echarts.init(document.getElementById("chartBox"),"macarons")
      charts1.setOption({
        yAxis: [{
          type: "value",
          name: "患者数量（人）",
          show: true,
          axisLine: {
            show: true
          }
        }],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["患者数量", "患者增长数", "患者脱落"],
          top: 0,
          right: 410
        },
        calculable: true,
        xAxis: [{
          type: "category",
          data: _.map(this.list,function(v){return v.name})
        }],
        series: [{
            data: _.map(this.list,function(v){return v.num}),
            type: "bar",
            name: "患者数量",
            barWidth: "17",
            itemStyle: {
              color: "#3AA0FF"
            }
          },
          {
            data: _.map(this.list,function(v){return v.newNum}),
            type: "bar",
            name: "患者增长数",
            barWidth: "17",
            itemStyle: {
              color: "#00BAAD"
            },
          },
          {
            data: _.map(this.list,function(v){return v.stopNum}),
            type: "bar",
            name: "患者脱落",
            barWidth: "17",
            itemStyle: {
              color: "#9873F0"
            },
          }
        ]
      })
    }
  },
  watch: {
    list() {
      this.initCharts()
    }
  }
}

</script>
<style lang="scss" scoped>
.chartBox {
  margin-top: 20px;
  height: 80vh;
  padding: 20x;

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
    margin-top: 16px;
    display: flex;
    flex-flow: row wrap;

    .el-card{
      width: 100%;
    }

    ::v-deep .el-card__body {
      padding: 0px !important;
    }

    .inBox {
      height: 100%;
      width: 100%;
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
