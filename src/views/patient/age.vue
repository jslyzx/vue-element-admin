<template>
  <div class="body">
    <div class="formCard">
      <saleForm :rule-form="ruleForm" @changeForm="changeForm" />
    </div>
    <div class="chartBox">
        <div class="display">
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span><img src="@/assets/patient_images/分组 5.png" /></span>
                  <span>新患者</span>
                </div>
                <div>
                  <span style="margin-top: 10px;"><i class="el-icon-warning-outline" /></span>
                  <span class="text">选定时间范围内新发生购买行为的患者</span>
                </div>
              </div>
              <div class="bottomBox">
                <div>
                  <div>{{newInfo.num}}/{{newInfo.numRate}}</div>
                  <div>患者人数/占比</div>
                </div>
                <div>
                  <div class="orange">{{newInfo.dot}}</div>
                  <div>Dot</div>
                </div>
                <div>
                  <div>{{newInfo.sales}}/{{newInfo.salesRate}}</div>
                  <div>销售额/占比</div>
                </div>
                <div>
                  <div>{{newInfo.buyTimesAvg}}</div>
                  <div>平均购买次数</div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span><img width="35" src="@/assets/patient_images/分组 8.png" /></span>
                  <span>老患者</span>
                </div>
                <div>
                  <span style="margin-top: 10px;"><i class="el-icon-warning-outline" /></span>
                  <span class="text">选定时间范围内新发生购买行为的患者</span>
                </div>
              </div>
              <div class="bottomBox">
                <div>
                  <div>{{oldInfo.num}}/{{oldInfo.numRate}}</div>
                  <div>患者人数/占比</div>
                </div>
                <div>
                  <div class="orange">{{oldInfo.dot}}</div>
                  <div>Dot</div>
                </div>
                <div>
                  <div>{{oldInfo.sales}}/{{oldInfo.salesRate}}</div>
                  <div>销售额/占比</div>
                </div>
                <div>
                  <div>{{oldInfo.buyTimesAvg}}</div>
                  <div>平均购买次数</div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="chartDisplay">
          <el-card>
            <div class="inBox">
              <div class="topBox">
                <el-tabs v-model="tabIndex">
                  <el-tab-pane label="患者数据列表" name="list" />
                  <el-tab-pane label="脱落原因分析" name="reason" />
                </el-tabs>
              </div>
              <div class="inChartBox">
                <div v-show="tabIndex == 'list'" style="padding:15px">
                  <el-table :data="dataList" style="width: 100%" max-height="340" :header-cell-style="{ background: 'rgba(245, 247, 250, 1)' }">
                    <el-table-column prop="month" label="月份"></el-table-column>
                    <el-table-column prop="totalnum" label="总患者数(人)"></el-table-column>
                    <el-table-column prop="newnum" label="本月新增患者数(人)"> </el-table-column>
                    <el-table-column prop="stopnum" label="脱落人数(人)"> </el-table-column>
                    <el-table-column prop="stoprate" label="脱落率(%)"> </el-table-column>
                  </el-table>
                </div>
                <div v-show="tabIndex == 'reason'">
                  <div id="chartBox" ref="chartBox" class="inChartBox1" />
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
  </div>
</template>
<script>
import { queryPatientComparison, queryPatientCountByMonth, queryPatientStopReasonRange } from '@/api/system'
import saleForm from '@/components/saleForm'
import * as echarts from 'echarts'
import _ from 'lodash'
require("echarts/theme/macarons")
export default {
  name: 'PatientAge',
  components: {
    saleForm
  },
  data() {
    return {
      ruleForm: {
        queryType: 1,
        year: '',
        startMonth: '',
        endMonth: '',
        goods: '',
        bigArea: '',
        middleArea: '',
        provienceArea: '',
        shop: '',
        page: 1,
        pageSize: 10
      },
      total: 0,
      dataList: [],
      tabIndex: 'list',
      data1: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        total: 100,
        tableData: [{
            id: 1,
            month: '1月',
            lastMonth: 128,
            sumCount: 365,
            thisMonth: 157,
            loseCount: 85,
            loseRate: "29%"
          },
          {
            id: 2,
            month: '2月',
            lastMonth: 128,
            sumCount: 365,
            thisMonth: 157,
            loseCount: 85,
            loseRate: "29%"
          },
          {
            id: 3,
            month: '3月',
            lastMonth: 128,
            sumCount: 365,
            thisMonth: 157,
            loseCount: 85,
            loseRate: "29%"
          },
          {
            id: 4,
            month: '4月',
            lastMonth: 128,
            sumCount: 365,
            thisMonth: 157,
            loseCount: 85,
            loseRate: "29%"
          },
          {
            id: 5,
            month: '5月',
            lastMonth: 128,
            sumCount: 365,
            thisMonth: 157,
            loseCount: 85,
            loseRate: "29%"
          },
          {
            id: 6,
            month: '6月',
            lastMonth: 128,
            sumCount: 365,
            thisMonth: 157,
            loseCount: 85,
            loseRate: "29%"
          },
        ]
      },
      headerData: [{
          id: 1,
          label: "月份",
          prop: "month"
        },
        {
          id: 2,
          label: "上月患者数",
          prop: "lastMonth"
        },
        {
          id: 3,
          label: "总患者数",
          prop: "sumCount"
        },
        {
          id: 4,
          label: "本月新增患者数",
          prop: "thisMonth"
        },
        {
          id: 5,
          label: "脱落人数",
          prop: "loseCount"
        },
        {
          id: 6,
          label: "脱落率",
          prop: "loseRate"
        }
      ],
      oldInfo: {},
      newInfo: {},
      chartData: undefined
    }
  },
  created() {
    this.changeForm(this.ruleForm)
  },
  methods: {
    async getPatientList(form) {
      const res = await queryPatientCountByMonth(form)
      this.dataList = res.data
    },
    async queryPatientComparison(form) {
      const res = await queryPatientComparison(form)
      this.newInfo = res.data.new
      this.oldInfo = res.data.old
    },
    async queryPatientStopReasonRange(form) {
      const res = await queryPatientStopReasonRange(form)
      this.chartData = res.data
    },
    changeForm(form) {
      this.getPatientList(form)
      this.queryPatientComparison(form)
      this.queryPatientStopReasonRange(form)
    },
    initCharts() {
      const charts1 = echarts.init(this.$refs['chartBox'])
      charts1.setOption({
        xAxis: {
          type: 'category',
          data: _.map(this.chartData,function(v){return v.name}),
          axisTick: {
            show: false,
          }
        },
        yAxis: {
          type: 'value',
          name: '人',
          min: 0,
          max: 60,
          axisLine: {
            show: true,
          }
        },
        series: [{
          data: _.map(this.chartData,function(v){return v.value}),
          type: 'bar',
          color: "#3aa0ff",
          barWidth: 30,
          itemStyle: { //上方显示数值
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: 'black',
                  fontSize: 16
                }
              }
            }
          }
        }]
      })
    }
  },
  watch: {
    chartData() {
      this.initCharts()
    }
  }
}

</script>
<style lang="scss" scoped>

.chartBox {
  margin-top: 20px;

  .display {
    display: flex;
    flex-flow: row nowrap;

    .s_box {
      width: 838px;
      margin: 0 28px 0 0;

      ::v-deep .el-card__body {
        padding: 0px !important;
      }

      .topBox {
        box-sizing: border-box;
        width: 100%;
        border-bottom: 1px solid rgba(216, 220, 229, 1);
        display: flex;
        justify-content: space-between;
        padding: 12px 30px 12px 24px;

        ::v-deep .el-tabs__header {
          margin: -15px 0 15px
        }

        >div {
          display: flex;
          flex-direction: row;
          align-content: center;

          span:nth-child(1) {
            margin-right: 10px;
          }

          span:nth-child(2) {
            margin-top: 10px;
          }

          .text {
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 19px;
            color: rgba(53, 64, 82, 1);
            text-align: center;
            vertical-align: top;
          }
        }
      }

      .bottomBox {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        .orange{
          color: rgb(255, 141, 26);
        }
        .red{
          color: rgb(240, 96, 96);
        }
        .green{
          color: rgb(0, 186, 173);
        }
        >div {
          width: 25%;
          height: 135px;
          display: flex;
          flex-flow: column wrap;
          justify-content: center;
          align-content: center;

          div:nth-child(1) {
            text-align: center;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 0px;
            color: rgba(58, 160, 255, 1);
          }

          div:nth-child(2) {
            margin-top: 13px;
            text-align: center;
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 0px;
            color: rgba(89, 89, 89, 1);
          }
        }

        >div:nth-child(2) {
          width: 15%;
        }

        >div:nth-child(3) {
          width: 30%;
        }

        >div:nth-child(4) {
          width: 30%;
        }
      }
    }

    .s_box:nth-child(2) {
      margin-right: 0;
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
      height: 430px;
      width: 100%;
      .topBox {
        border-bottom: 1px solid rgba(216, 220, 229, 1);

        ::v-deep .el-tabs {
          line-height: 66px !important;
          margin-left: 40px;
        }

        ::v-deep .el-tabs__header {
          margin: 0px !important;
        }
      }

      .inChartBox {
        height: 360px;
        margin: 0 auto;
      }

      .inChartBox1 {
        width: 1680px;
        height: 360px;
        margin: 0 auto;
      }
    }
  }
}

</style>
