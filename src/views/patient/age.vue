<template>
    <div class="body">
        <div class="formCard">
            <saleForm :rule-form="ruleForm" />
            <div class="chartBox">
                <div class="display">
                    <el-card class="s_box">
                        <div>
                            <div class="topBox">
                                <div>
                                    <span><img src="@/assets/patient_images/分组 5.png" /></span>
                                    <span style="{margin-left:10px}">新患者</span>
                                </div>
                                <div>
                                    <span style="margin-top: 10px;"><i class="el-icon-warning-outline" /></span>
                                    <span class="text">选定时间范围内新发生购买行为的患者</span>
                                </div>
                            </div>
                            <div class="bottomBox">
                                <div>
                                    <div>543/23%</div>
                                    <div>患者人数/占比</div>
                                </div>
                                <div>
                                    <div>1.6</div>
                                    <div>Dot</div>
                                </div>
                                <div>
                                    <div>4152456/21%</div>
                                    <div>销售额/占比</div>
                                </div>
                                <div>
                                    <div>543/23%</div>
                                    <div>患者人数/占比</div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="s_box">
                        <div>
                            <div class="topBox">
                                <div>
                                    <span><img src="@/assets/patient_images/分组 5.png" /></span>
                                    <span style="{margin-left:10px}">新患者</span>
                                </div>
                                <div>
                                    <span style="margin-top: 10px;"><i class="el-icon-warning-outline" /></span>
                                    <span class="text">选定时间范围内新发生购买行为的患者</span>
                                </div>
                            </div>
                            <div class="bottomBox">
                                <div>
                                    <div>543/23%</div>
                                    <div>患者人数/占比</div>
                                </div>
                                <div>
                                    <div>1.6</div>
                                    <div>Dot</div>
                                </div>
                                <div>
                                    <div>4152456/21%</div>
                                    <div>销售额/占比</div>
                                </div>
                                <div>
                                    <div>543/23%</div>
                                    <div>患者人数/占比</div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
                <div class="chartDisplay">
                    <el-card>
                        <div class="inBox">
                            <div class="topBox">
                                <el-tabs v-model="tabIndex" @tab-click="handleClick">
                                    <el-tab-pane label="患者数据列表" name="list" />
                                    <el-tab-pane label="脱落原因分析" name="reason" />
                                </el-tabs>
                            </div>
                            <div class="inChartBox">
                                <div v-show="tabIndex == 'list'" style="padding:31px 64px 0 71px">
                                    <sTable :tableData="data1.tableData" :headerData="headerData" :total="data1.total"
                                        :currentPage="data1.currentPage" :pageSizes="data1.pageSizes"
                                        :pageSize="data1.pageSize"></sTable>
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
    </div>

</template>
  
  <script>
import saleForm from '@/components/saleForm'
import sTable from '@/components/table'
import * as echarts from 'echarts'
require("echarts/theme/macarons"); // echarts theme
export default {
    name: 'Yearly',
    components: {
        saleForm,
        sTable
    },
    data() {
        return {
            ruleForm: {
                time: 'year',
                year: '',
                startMonth: '',
                endMonth: '',
                goods: '',
                bigArea: '',
                middleArea: '',
                provienceArea: '',
                shop: ''
            },
            tabIndex: 'list',
            chartsData1: [
                { value: 10, name: '浙江省' },
                { value: 10, name: '江苏省' },
                { value: 10, name: '海南省' },
                { value: 10, name: '安徽省' },
                { value: 10, name: '云南省' },
                { value: 10, name: '河南省' },
                { value: 10, name: '四川省' },
                { value: 10, name: '贵州省' }
            ],
            data1: {
                currentPage: 1,
                pageSizes: [10, 20, 30, 40],
                pageSize: 10,
                total: 100,
                tableData: [
                    {
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
            headerData: [
                {
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
            ]

        }
    },
    computed: {
        countSum() {
            return this.chartsData1.reduce((data1, data2) => {
                if (data2.value) {
                    return data2.value + data1
                }
            }, 0)
        },
        countSum2() {
            return this.chartsData2.reduce((data1, data2) => {
                if (data2.value) {
                    return data2.value + data1
                }
            }, 0)
        },
        countSum3() {
            return this.chartsData3.reduce((data1, data2) => {
                if (data2.value) {
                    return data2.value + data1
                }
            }, 0)
        }
    },
    mounted() {
        this.initCharts();
    },
    methods: {
        handleClick() {

        },
        initCharts() {
            const charts1 = echarts.init(this.$refs['chartBox'])
            charts1.setOption({
                xAxis: {
                    type: 'category',
                    data: ['病情发展', '原因不明', '副反应大', '改治疗方案', '患者放弃', '经济原因', '治疗结束', '去世', '手术期间', '效果不好', '医院暂停', '疫情延迟', '指标不好'],
                    axisTick: {
                        show: false,
                    }
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 60,
                    axisLine: {
                        show: true,
                    }
                },
                series: [
                    {
                        data: [20, 20, 50, 40, 10, 25, 35, 20, 20, 50, 40, 10, 25],
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
                    }
                ]
            })
        },
    }
}
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
      margin: 0px 24px 25px -1px;
      width: 1655px;
      height: 80vh;
      padding: 26px 0px 34px 0px;
  
      .display {
          display: flex;
          flex-flow: row nowrap;
  
          .s_box {
              width: 812px;
              height: 203px;
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
          margin-top: 32px;
          display: flex;
          flex-flow: row wrap;
  
          ::v-deep .el-card__body {
              padding: 0px !important;
          }
  
          .inBox {
              width: 1655px;
              height: 547px;
  
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
                  width: 1655px;
                  height: 547px;
                  margin: 0 auto;
              }
  
              .inChartBox1 {
                  width: 1655px;
                  height: 447px;
                  margin: 0 auto;
              }
          }
      }
  }
  </style>