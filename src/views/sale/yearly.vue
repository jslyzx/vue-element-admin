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
                  <span>销售额</span>
                  <span style="margin-left:9px"><i class="el-icon-warning-outline" /></span>
                </div>
                <div>
                  <el-tabs v-model="tabIndex" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="total" />
                    <el-tab-pane label="规格一" name="first" />
                    <el-tab-pane label="规格二" name="second" />
                  </el-tabs>
                </div>

              </div>
              <div class="bottomBox">
                <div v-show="tabIndex == 'total'">
                  <div class="price">
                    1,438,900
                  </div>
                  <div class="compare">
                    <div><span>同比</span><span style="margin-left: 19px;">67.66%</span><span
                        style="margin-left: 16px;"><img src="@/assets/sale_images/路径 16.png"></span></div>
                    <div style="margin-left:37px"><span>环比</span><span style="margin-left: 19px;">-15.89%</span><span
                        style="margin-left: 16px;"><img src="@/assets/sale_images/Info Icon.png"></span></div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>销量</span>
                  <span style="margin-left:9px"><i class="el-icon-warning-outline" /></span>
                </div>
                <div>
                  <el-tabs v-model="tabIndex2" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="total" />
                    <el-tab-pane label="规格一" name="first" />
                    <el-tab-pane label="规格二" name="second" />
                  </el-tabs>
                </div>

              </div>
              <div class="bottomBox">
                <div v-show="tabIndex2 == 'total'">
                  <div class="price">
                    1,438,900
                  </div>
                  <div class="compare">
                    <div><span>同比</span><span style="margin-left: 19px;">67.66%</span><span
                        style="margin-left: 16px;"><img src="@/assets/sale_images/路径 16.png"></span></div>
                    <div style="margin-left:37px"><span>环比</span><span style="margin-left: 19px;">-15.89%</span><span
                        style="margin-left: 16px;"><img src="@/assets/sale_images/Info Icon.png"></span></div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>老患者销量</span>
                  <span style="margin-left:9px"><i class="el-icon-warning-outline" /></span>
                </div>
                <div>
                  <el-tabs v-model="tabIndex3" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="total" />
                    <el-tab-pane label="规格一" name="first" />
                    <el-tab-pane label="规格二" name="second" />
                  </el-tabs>
                </div>

              </div>
              <div class="bottomBox">
                <div v-show="tabIndex3 == 'total'">
                  <div class="price">
                    1,438,900
                  </div>
                  <div class="compare">
                    <div><span>同比</span><span style="margin-left: 19px;">67.66%</span><span
                        style="margin-left: 16px;"><img src="@/assets/sale_images/路径 16.png"></span></div>
                    <div style="margin-left:37px"><span>环比</span><span style="margin-left: 19px;">-15.89%</span><span
                        style="margin-left: 16px;"><img src="@/assets/sale_images/Info Icon.png"></span></div>
                  </div>
                </div>

              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>新患者销量</span>
                  <span style="margin-left:9px"><i class="el-icon-warning-outline" /></span>
                </div>
                <div>
                  <el-tabs v-model="tabIndex4" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="total" />
                    <el-tab-pane label="规格一" name="first" />
                    <el-tab-pane label="规格二" name="second" />
                  </el-tabs>
                </div>

              </div>
              <div class="bottomBox">
                <div v-show="tabIndex4 == 'total'">
                  <div class="price">
                    1,438,900
                  </div>
                  <div class="compare">
                    <div><span>同比</span><span style="margin-left: 19px;">67.66%</span><span
                        style="margin-left: 16px;"><img src="@/assets/sale_images/路径 16.png"></span></div>
                    <div style="margin-left:37px"><span>环比</span><span style="margin-left: 19px;">-15.89%</span><span
                        style="margin-left: 16px;"><img src="@/assets/sale_images/Info Icon.png"></span></div>
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
                <h3 style="margin-top:1px">销售统计</h3>
                <div style="margin-top:-5px">
                  <el-radio-group v-model="tabIndex2" size="small">
                    <el-radio-button label="数量" />
                    <el-radio-button label="金额" />
                  </el-radio-group>
                </div>
              </div>
              <div>
                <div id="chartBox" ref="chartBox" class="inChartBox" />
              </div>
            </div>
          </el-card>

          <el-card style="margin-left:20px">
            <div class="inBox2">
              <h2>各省区销售占比</h2>
              <div id="chartBox2" ref="chartBox2" class="inChartBox2" />
            </div>
          </el-card>
          <div class="rightBox" style="margin-left:10px">
            <div>
              <el-card>
                <div style="box-sizing:border-box;padding:17px 16px;width:383px;height:274px">
                  <h3>各大区销售占比</h3>
                  <div id="chartBox3" ref="chartBox3" class="inChartBox3" />
                </div>
              </el-card>
            </div>
            <div>
              <el-card>
                <div style="box-sizing:border-box;padding:17px 16px;width:383px;height:274px">
                  <h3>各片区销售占比</h3>
                  <div id="chartBox4" ref="chartBox4" class="inChartBox4" />
                </div>
              </el-card>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import saleForm from '@/components/saleForm'
import * as echarts from 'echarts'
require("echarts/theme/macarons"); // echarts theme
export default {
  name: 'Yearly',
  components: {
    saleForm
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
      tabIndex: 'total',
      tabIndex2: 'total',
      tabIndex3: 'total',
      tabIndex4: 'total',
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
      chartsData2: [
        { value: 10, name: '大区一' },
        { value: 10, name: '大区二' },
        { value: 10, name: '大区三' },
        { value: 10, name: '大区四' },
        { value: 10, name: '大区五' }
      ],
      chartsData3: [
        { value: 10, name: '片区一' },
        { value: 10, name: '片区二' },
        { value: 10, name: '片区三' },
        { value: 10, name: '片区四' },
        { value: 10, name: '片区五' }
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
    this.initCharts2()
    this.initCharts3()
    this.initCharts4()
  },
  methods: {
    handleClick() {

    },
    initCharts() {
      const charts1 = echarts.init(this.$refs['chartBox'])
      charts1.setOption({
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
        },
        yAxis: {
          type: 'value',
          name: '销售额（百万元）',
          show: true,
          axisLine: {
            show: true
          },
          min: 0,
          max: 10
        },
        legend: {
          data: ['规格一', '规格二'],
          top: 30,
          right: 110,
          icon: 'roundRect'
        },
        series: [
          {
            data: [8, 9, 7, 6, 7, 1, 3],
            type: 'bar',
            name: '规格一',
            barWidth: '17',
            itemStyle: {
              color: '#3AA0FFFF'
            }
          },
          {
            data: [2, 4, 5, 8, 7, 7, 3],
            type: 'bar',
            name: '规格二',
            barWidth: '17',
            itemStyle: {
              color: '#00BAADFF'
            }
          }
        ],
        tooltip: {

        }

      })
    },
    initCharts2() {
      const that = this
      const charts2 = echarts.init(this.$refs['chartBox2'], "macarons")
      charts2.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '销售金额{c}万<br />销售占比{d}'
        },
        // color: ['#2A58C7FF', '#3AA0FFFF', '#FF8D1AFF', '#D43030FF', '#00BAADFF', '#FFC300FF', '#A5D63FFF', '#AC33C1FF'],
        legend: [{
          bottom: '50px',
          left: '35px',
          formatter: function (name) {
            if (name == '浙江省') {
              return `${name}   ${(that.chartsData1[0].value / that.countSum) * 100}%`
            } else if (name == '海南省') {
              return `${name}   ${(that.chartsData1[2].value / that.countSum) * 100}%`
            } else if (name == '云南省') {
              return `${name}   ${(that.chartsData1[4].value / that.countSum) * 100}%`
            } else if (name == '四川省') {
              return `${name}   ${(that.chartsData1[6].value / that.countSum) * 100}%`
            }
          },
          orient: 'vertical',
          padding: [20, 30],
          textStyle: {
            fontSize: '20px'
          },
          x: 'left',
          itemHeight: 12,
          itemWidth: 12,
          data: [
            {
              name: '浙江省',
              icon: 'rect'
            },
            {
              name: '海南省',
              icon: 'rect'
            },
            {
              name: '云南省',
              icon: 'rect'
            },
            {
              name: '四川省',
              icon: 'rect'
            }
          ]
        }, {
          bottom: '50px',
          formatter: function (name) {
            if (name == '江苏省') {
              return `${name}   ${(that.chartsData1[1].value / that.countSum) * 100}%`
            } else if (name == '安徽省') {
              return `${name}   ${(that.chartsData1[3].value / that.countSum) * 100}%`
            } else if (name == '河南省') {
              return `${name}   ${(that.chartsData1[5].value / that.countSum) * 100}%`
            } else if (name == '贵州省') {
              return `${name}   ${(that.chartsData1[7].value / that.countSum) * 100}%`
            }
          },
          left: '175px',
          orient: 'vertical',
          itemHeight: 12,
          padding: [20, 30],
          textStyle: {
            fontSize: '20px'
          },
          itemWidth: 12,
          data: [
            {
              name: '江苏省',
              icon: 'rect'
            },
            {
              name: '安徽省',
              icon: 'rect'
            },
            {
              name: '河南省',
              icon: 'rect'
            },
            {
              name: '贵州省',
              icon: 'rect'
            }

          ]
        }],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['65%', '25%'],
            center: ['50%', '30%'],
            // hoverAnimation:true, //鼠标悬浮是否有区域弹出动画，false:无  true:有
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inner',
              // color: '#fff',
              fontSize: 14,
              formatter: '{b}\n{d}%'
            },
            data: this.chartsData1,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
            }
          }
        ]

      })
    },
    initCharts3() {
      const that = this
      const charts3 = echarts.init(this.$refs['chartBox3'], "macarons")
      charts3.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '销售金额{c}万<br />销售占比{d}'
        },
        // color: ['#2A58C7FF', '#FF8D1AFF', '#00BAADFF', '#A5D63FFF', '#EE6666FF'],
        legend: {
          formatter: function (name) {
            if (name == '大区一') {
              return `${name}   ${(that.chartsData2[0].value / that.countSum2) * 100}%`
            } else if (name == '大区二') {
              return `${name}   ${(that.chartsData2[1].value / that.countSum2) * 100}%`
            } else if (name == '大区三') {
              return `${name}   ${(that.chartsData2[2].value / that.countSum2) * 100}%`
            } else if (name == '大区四') {
              return `${name}   ${(that.chartsData2[3].value / that.countSum2) * 100}%`
            } else if (name == '大区五') {
              return `${name}   ${(that.chartsData2[4].value / that.countSum2) * 100}%`
            }
          },
          left: '3px',
          orient: 'vertical',
          itemHeight: 10,
          padding: [20, 30],
          textStyle: {
            fontSize: '20px'
          },
          itemWidth: 10,
          data: [
            {
              name: '大区一',
              icon: 'rect',
              color: '#2A58C7FF',
            },
            {
              name: '大区二',
              icon: 'rect'
            },
            {
              name: '大区三',
              icon: 'rect'
            },
            {
              name: '大区四',
              icon: 'rect'
            },
            {
              name: '大区五',
              icon: 'rect'
            }
          ]
        },
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            radius: ['35%', '20%'],
            center: ['50%', '16%'],
            avoidLabelOverlap: false,
            emphasis: {
              scale: true,
              scaleSize: 20
            },
            labelLine: {
              show: false
            },
            label: {
              show: false
            },
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                  length: 100,
                  smooth: 0.5,
                },
                // borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: "#59CFFF",
                shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
            },
            data: this.chartsData2
          }
        ]

      })
    },
    initCharts4() {
      const that = this
      const charts4 = echarts.init(this.$refs['chartBox4'], "macarons")
      charts4.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '销售金额{c}万<br />销售占比{d}'
        },
        color: ['#2A58C7', '#FF8D1A', '#00BAAD', '#A5D63F', '#EE6666'],
        legend: {
          formatter: function (name) {
            if (name == '片区一') {
              return `${name}   ${(that.chartsData3[0].value / that.countSum3) * 100}%`
            } else if (name == '片区二') {
              return `${name}   ${(that.chartsData3[1].value / that.countSum3) * 100}%`
            } else if (name == '片区三') {
              return `${name}   ${(that.chartsData3[2].value / that.countSum3) * 100}%`
            } else if (name == '片区四') {
              return `${name}   ${(that.chartsData3[3].value / that.countSum3) * 100}%`
            } else if (name == '片区五') {
              return `${name}   ${(that.chartsData3[4].value / that.countSum3) * 100}%`
            }
          },
          left: '3px',
          orient: 'vertical',
          itemHeight: 10,
          padding: [20, 30],
          textStyle: {
            fontSize: '20px'
          },
          itemWidth: 10,
          data: [
            {
              name: '片区一',
              icon: 'rect'
            },
            {
              name: '片区二',
              icon: 'rect'
            },
            {
              name: '片区三',
              icon: 'rect'
            },
            {
              name: '片区四',
              icon: 'rect'
            },
            {
              name: '片区五',
              icon: 'rect'
            }
          ]
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['35%', '20%'],
            center: ['50%', '16%'],
            avoidLabelOverlap: false,
            emphasis: {
              scale: true,
              scaleSize: 20
            },
            labelLine: {
              show: false
            },
            label: {
              show: false
            },
            data: this.chartsData3,
            itemStyle:{
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
            }
          }
        ]

      })
    }
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
  margin: 25px 24px 25px -1px;
  width: 1655px;
  height: 80vh;
  background-color: #fff;
  padding: 39px 36px 34px 27px;

  .display {
    display: flex;
    flex-flow: row nowrap;

    .s_box {
      width: 383px;
      height: 140px;
      margin: 0 21px 0 0;

      ::v-deep .el-card__body {
        padding: 0px !important;
      }

      .topBox {
        width: 100%;
        height: 41px;
        border-bottom: 1px solid rgba(216, 220, 229, 1);
        display: flex;
        justify-content: space-between;
        padding: 16px 26px 0 16px;

        ::v-deep .el-tabs__header {
          margin: -15px 0 15px
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
    display: flex;
    flex-flow: row wrap;

    ::v-deep .el-card__body {
      padding: 0px !important;
    }

    .inBox {
      width: 787px;
      height: 566px;

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
        width: 800px;
        height: 500px;
      }
    }

    .inBox2 {
      width: 383px;
      height: 566px;
      padding: 21px 0 0 18px;

      ::v-deep .el-card__body {
        padding: 0px !important;
      }

      .inChartBox2 {
        width: 350px;
        height: 450px;
      }
    }

    .inChartBox3 {
      width: 450px;
      height: 550px;
    }

    .inChartBox4 {
      width: 450px;
      height: 550px;
    }
  }
}
</style>
