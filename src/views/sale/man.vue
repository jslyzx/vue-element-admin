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
                                    <span><img src="@/assets/sale_images/分组 1.png" /></span>
                                    <span>MDT</span>
                                    <span style="margin-left:9px"><i class="el-icon-warning-outline" /></span>
                                </div>
                                <div>
                                    <span>时间：三月</span>
                                </div>

                            </div>
                            <div class="bottomBox">
                                <div>
                                    <span>目标(万元)</span>
                                    <div>12,454,45</div>
                                </div>
                                <div>
                                    <span> 实际(万元)</span>
                                    <div>32,894,88</div>
                                </div>
                                <div>
                                    <span>达成率 A/T</span>
                                    <div>82%</div>
                                </div>
                                <div>
                                    <span>同比 GR</span>
                                    <div>100%</div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="s_box">
                        <div>
                            <div class="topBox">
                                <div>
                                    <span><img src="@/assets/sale_images/分组 1.png" /></span>
                                    <span>QDT</span>
                                    <span style="margin-left:9px"><i class="el-icon-warning-outline" /></span>
                                </div>
                                <div>
                                    <span>时间：三季度</span>
                                </div>

                            </div>
                            <div class="bottomBox">
                                <div>
                                    <span>目标(万元)</span>
                                    <div>12,454,45</div>
                                </div>
                                <div>
                                    <span> 实际(万元)</span>
                                    <div>32,894,88</div>
                                </div>
                                <div>
                                    <span>达成率 A/T</span>
                                    <div>82%</div>
                                </div>
                                <div>
                                    <span>同比 GR</span>
                                    <div>100%</div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="s_box">
                        <div>
                            <div class="topBox">
                                <div>
                                    <span><img src="@/assets/sale_images/分组 1.png" /></span>
                                    <span>YDT</span>
                                    <span style="margin-left:9px"><i class="el-icon-warning-outline" /></span>
                                </div>
                                <div>
                                    <span>时间：三季度</span>
                                </div>

                            </div>
                            <div class="bottomBox">
                                <div>
                                    <span>目标(万元)</span>
                                    <div>12,454,45</div>
                                </div>
                                <div>
                                    <span> 实际(万元)</span>
                                    <div>32,894,88</div>
                                </div>
                                <div>
                                    <span>达成率 A/T</span>
                                    <div>82%</div>
                                </div>
                                <div>
                                    <span>同比 GR</span>
                                    <div>100%</div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
                <div class="chartDisplay">
                    <el-card>
                        <div class="inBox">
                            <div class="topBox">
                                <h3 style="margin-top:1px">销售统计</h3>
                            </div>
                            <div>
                                <div id="chartBox" ref="chartBox" class="inChartBox" />
                            </div>
                        </div>
                    </el-card>
                </div>
                <div style="margin-top:20px">
                    <el-card>
                        <div class="tableBox">
                            <sTable :tableData="data1.tableData" :headerData="headerData" :total="data1.total"
                                :currentPage="data1.currentPage" :pageSizes="data1.pageSizes"
                                :pageSize="data1.pageSize"></sTable>

                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>

</template>
  
  <script>
import sTable from '@/components/table'
import saleForm from '@/components/saleForm2'
import * as echarts from 'echarts'
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
                month: '',
                goods: '',
                bigArea: '',
                middleArea: '',
                provienceArea: '',
                shop: ''
            },
            data1: {
                currentPage: 1,
                pageSizes: [10, 20, 30, 40],
                pageSize: 10,
                total: 100,
                tableData: [
                    {
                        index: 1,
                        person: 1,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 2,
                        person: 2,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 3,
                        person: 3,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 4,
                        person: 4,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 5,
                        person: 5,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 6,
                        person: 6,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 7,
                        person: 7,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 8,
                        person: 8,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 9,
                        person: 9,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 10,
                        person: 10,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                ],
            },
            headerData: [
                {
                    id: 1,
                    label: "排名",
                    prop: "person"
                },
                {
                    id: 2,
                    label: "业务员",
                    prop: "name"
                },
                {
                    id: 3,
                    label: "月度达成率",
                    prop: "monthRate"
                },
                {
                    id: 4,
                    label: "月度同比",
                    prop: "monthMath"
                },
                {
                    id: 5,
                    label: "季度达成率",
                    prop: "quarterRate"
                },
                {
                    id: 6,
                    label: "季度同比",
                    prop: "quarterMath"
                },
                {
                    id: 7,
                    label: "年度达成率",
                    prop: "yearRate"
                },
                {
                    id: 8,
                    label: "年度同比",
                    prop: "yearMath"
                },
                {
                    id: 9,
                    label: "同比",
                    prop: "math"
                },
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
        this.initCharts()
    },
    methods: {
        handleClick() {

        },
        initCharts() {
            const charts1 = echarts.init(this.$refs['chartBox'])
            charts1.setOption({
                color: ['#3c83e7', '#a1cf67'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    formatter: function (params) {
                        let str = '';
                        params.forEach((item, index) => {
                            str +=
                                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + new Date().getFullYear() + '年' + item.name + " : " + item.data * 100 + '万' + "<br />";
                        });
                        return str;
                    },
                },
                legend: {
                    data: ['选定年', '前一年'],
                    right: 150,
                    top: 20,
                },

                // grid: {
                //     left: '3%',
                //     right: '4%',
                //     bottom: '3%',
                //     containLabel: true
                // },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: "dashed",
                                color: 'rgba(0, 0, 0,0.2)',
                                dashOffset: 100,
                            }
                        },
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 10,
                        name: '销售额（百万元）',
                        axisLine: {
                            show: true
                        },
                        splitLine: {
                            show: false,
                        },
                    }
                ],
                series: [
                    {
                        name: '选定年',
                        type: 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {

                            opacity: 0,
                        },
                        select: {
                            scale: 10,
                            label: {
                                show: true,
                            }
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(80,141,255,0.39)'
                                }, {
                                    offset: .34,
                                    color: 'rgba(56,155,255,0.25)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(185, 219, 140,0.00)'
                                }
                            ])
                        },
                        data: [6, 5, 8, 6, 7, 9, 8, 5, 4, 3, 2, 1]
                    },
                    {
                        name: '前一年',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        itemStyle: {

                            opacity: 0,
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(185, 219, 140,0.39)'
                                }, {
                                    offset: .34,
                                    color: 'rgba(159, 224, 128,0.25)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(185, 219, 140,0.00)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [10, 9, 8, 7, 5, 4, 3, 4, 5, 5, 6, 7]
                    },
                ]
            })
        },
    }
}
</script>
  
  <style lang="scss" scoped>
  .body {
      width: 100%;
      height: 180vh;
      background: rgba(235, 238, 242, 1);
      padding: 29px;
  }
  
  .formCard {
      margin: 0px 24px 25px -10px;
      width: 1655px;
      height: 143px;
  }
  
  .chartBox {
      margin: 25px 0px 25px 0px;
  
      .display {
          display: flex;
          flex-flow: row nowrap;
  
          .s_box {
              width: 538px !important;
              height: 272px;
              margin: 0 21px 0 0;
  
              ::v-deep .el-card__body {
                  padding: 0px !important;
              }
  
              .topBox {
                  width: 100%;
                  height: 53px;
                  border-bottom: 1px solid rgba(216, 220, 229, 1);
                  display: flex;
                  flex-flow: row nowrap;
                  justify-content: space-between;
                  padding: 15px 23px 0 27px;
  
                  ::v-deep .el-tabs__header {
                      margin: -15px 0 15px
                  }
  
                  span {
                      margin-right: 13px;
                  }
  
                  span:nth-child(3) {
                      vertical-align: top;
                      font-size: 18px;
                      margin-top: 10px;
                  }
  
                  span:nth-child(2) {
                      font-weight: 700;
                      font-size: 20px;
                      vertical-align: top;
                  }
              }
  
              .bottomBox {
                  width: 100%;
                  display: flex;
                  flex-flow: row wrap;
  
                  >div {
                      width: 50%;
                      height: 109px;
                      border: 0.5px solid #E9E9E9FF;
                      padding: 21px 0 0 27px;
  
                      span {
                          font-size: 16px;
                          font-weight: 400;
                          letter-spacing: 0px;
                          line-height: 14px;
                          color: rgba(144, 147, 153, 1);
                          text-align: left;
                          vertical-align: top;
                      }
  
                      div {
                          margin-top: 14px;
                          font-size: 24px;
                          font-weight: 700;
                          line-height: 14px;
                          color: rgba(60, 160, 255, 1);
                          text-align: left;
                      }
                  }
              }
          }
  
          .s_box:nth-child(3) {
              margin-right: 0px;
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
              width: 1656px;
              height: 527px;
  
              .topBox {
                  height: 56px;
                  display: flex;
                  flex-flow: row wrap;
                  justify-content: space-between;
                  padding: 16px 16px 10px 20px;
                  border-bottom: 1px solid rgba(216, 220, 229, 1);
              }
  
              .inChartBox {
                  width: 1700px;
                  height: 400px;
                  margin-left: -50px;
              }
          }
  
  
      }
  
      .tableBox {
          width: 1656px;
          height: 535px;
      }
  }
  </style>