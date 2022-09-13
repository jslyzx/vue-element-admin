<template>
  <div class="body">
    <div class="formCard">
      <sale-form :rule-form="ruleForm" @changeForm="changeForm" @queryProvinceSalePrice="changeTime" />
    </div>
    <div class="chartBox">
        <div class="display">
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>门店信息完善度</span>
                </div>
              </div>
              <div class="bottomBox">
                <div id="chartBox1" ref="chartBox1" style="width: 100%; height: 200px; padding: 10px" />
              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>门店回访率</span>
                </div>
              </div>
              <div class="bottomBox">
                <div id="chartBox2" ref="chartBox2" style="width: 100%; height: 200px; padding: 10px" />
              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>平均配送时效(h)</span>
                </div>
              </div>
              <div class="bottomBox lineBox">
                <div id="chartBox3" ref="chartBox3" style="width: 100%; height: 220px; padding: 10px" />
              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>平均患教次数</span>
                </div>
              </div>
              <div class="bottomBox lineBox">
                <div id="chartBox4" ref="chartBox4" style="width: 100%; height: 220px; padding: 10px" />
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
              <div class="tableBox">
                <el-table :data="serviceList" style="width: 100%" max-height="290" :header-cell-style="{ background: 'rgba(245, 247, 250, 1)' }">
                  <el-table-column prop="sectionName" label="片区"></el-table-column>
                  <el-table-column label="门店名称">
                    <template slot-scope="{row}">
                      <router-link :to="'/patient/shop/detail/' + row.id" class="link-type">
                        <span>{{ row.name }}</span>
                      </router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="customerNum" label="患者总数(人)"></el-table-column>
                  <el-table-column prop="newCustomerRate" label="新患者占比"> </el-table-column>
                  <el-table-column prop="infoRate" label="信息完善度"> </el-table-column>
                  <el-table-column prop="returnRatio" label="回访率"> </el-table-column>
                  <el-table-column prop="timeDiffAvg" label="配送时效(h)"> </el-table-column>
                  <el-table-column prop="eduTimesAvg" label="平均患教次数(次)"> </el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="ruleForm.page" :limit.sync="ruleForm.pageSize" @pagination="getServiceList" />
              </div>
            </div>
          </el-card>
        </div>
      </div>
  </div>
</template>
<script>
import { shopServiceList, shopServiceCharts } from '@/api/user'
import saleForm from "@/components/saleForm"
import Pagination from '@/components/Pagination'
import echarts from "echarts"
import _ from 'lodash'
require("echarts/theme/macarons")

export default {
  name: "ShopService",
  components: {
    saleForm,
    Pagination
  },
  data() {
    return {
      ruleForm: {
        queryType: 1,
        year: "",
        startMonth: "",
        endMonth: "",
        goods: "",
        bigArea: "",
        middleArea: "",
        provienceArea: "",
        shop: "",
        page: 1,
        pageSize: 5
      },
      total: 0,
      serviceList: [], //月度统计数据
      returnRatio: [], //回访率
      infoRate: [], //信息完善度
      timeDiffAvg: [], //平均配送时效
      eduTimesAvg: [] //平均患教次数
    }
  },
  created() {
    this.changeForm(this.ruleForm)
  },
  methods: {
    async getServiceList(form) {
      this.ruleForm.pageSize = 5
      Object.assign(form, this.ruleForm)
      const res = await shopServiceList(form)
      this.serviceList = res.data.data
      this.total = res.data.total
    },
    async getServiceChart(form) {
      this.ruleForm.pageSize = 5
      const res = await shopServiceCharts(form)
      this.returnRatio = res.data.returnRatio
      this.infoRate = res.data.infoRate
      this.eduTimesAvg = res.data.eduTimesAvg
      this.timeDiffAvg = res.data.timeDiffAvg
    },
    initCharts1() {
      const that = this;
      const charts1 = echarts.init(document.getElementById("chartBox1"), "macarons")
      const option = {
        tooltip: {
          trigger: "item",
          formatter: '{b} : {c}%'
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          formatter: function(name) {
            var str = option.series[0].data.filter((item) => {
              return item.name == name
            })
            return `${name}：${str[0].value}%`
          },
          right: 0,
          top: 'middle'
        },
        series: [{
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true
            }
          },
          // name: "按DOT分布",
          type: "pie",
          radius: ["30%", "90%"],
          center: ["30%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8
          },
          data: this.infoRate
        }]
      }
      charts1.setOption(option)
    },
    initCharts2() {
      var BorderWidth = "6"
      //反方向剩下部分的样式
      var placeHolderStyle = {
        normal: {
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          color: "transparent",
          borderColor: "transparent",
          borderWidth: 0
        },
        emphasis: {
          color: "transparent",
          borderColor: "transparent",
          borderWidth: 0
        }
      }
      var commonAttrs = {
        type: "pie",
        clockWise: true, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        center: ["30%", "50%"],
        label: {
          show: false,
          position: "center"
        }
      }
      var series = _.map(this.returnRatio, function(v, i) {
        return {
          ...commonAttrs,
          name: v.name,
          radius: [(10 + i * 20) + '%', (10 + i * 20 + 5) + '%'],
          data: [{
              value: v.value,
              name: v.name
            },
            {
              value: 100 - v.value,
              name: "",
              itemStyle: placeHolderStyle
            }
          ]
        }
      })
      const option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return `${params.name}：${params.value} %`
          }
        },
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: "outside"
            },
            labelLine: {
              show: false,
              length: 100,
              smooth: 0.5
            },
            borderWidth: BorderWidth,
            shadowBlur: 40,
            borderColor: "#3AA0FF",
            backgroundColor: "#fff",
            shadowColor: "rgba(0, 0, 0, 0)" //边框阴影
          }
        },
        legend: [{
          icon: "bar",
          formatter: function(name) {
            for (let i = 0, l = option.series.length; i < l; i++) {
              if (name == option.series[i].data[0].name) {
                return name + "：" + option.series[i].data[0].value + "%"
              }
            }
          },
          data: _.map(this.returnRatio, function(v) { return v.name }),
          type: "scroll",
          orient: "vertical",
          right: 0,
          top: 'middle'
        }],
        series: series
      }
      const charts2 = echarts.init(document.getElementById("chartBox2"), "macarons")
      charts2.setOption(option)
    },
    initCharts3() {
      const that = this
      const charts3 = echarts.init(document.getElementById("chartBox3"), "macarons")
      const option = {
        tooltip: {
          trigger: "item"
        },
        xAxis: {
          type: "category",
          data: _.map(this.timeDiffAvg,function(v){return v.name}),
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          type: "value"
        },
        series: [{
          data: _.map(this.timeDiffAvg,function(v){return v.value}),
          type: "line"
        }]
      }
      charts3.setOption(option)
    },
    initCharts4() {
      const that = this;
      const charts4 = echarts.init(document.getElementById("chartBox4"), "macarons")
      const option = {
        tooltip: {
          trigger: "item"
        },
        xAxis: {
          type: "category",
          data: _.map(this.eduTimesAvg,function(v){return v.name}),
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          type: "value"
        },
        series: [{
          data: _.map(this.eduTimesAvg,function(v){return v.value}),
          type: "bar"
        }]
      }
      charts4.setOption(option)
    },
    changeForm(form) {
      this.getServiceList(form)
      this.getServiceChart(form)
    },
    changeTime(form) {
      this.getServiceList(form)
      this.getServiceChart(form)
    },
  },
  watch: {
    infoRate() {
      this.initCharts1()
    },
    returnRatio() {
      this.initCharts2()
    },
    timeDiffAvg() {
      this.initCharts3()
    },
    eduTimesAvg() {
      this.initCharts4()
    }
  }
}

</script>
<style lang="scss" scoped>

.chartBox {
  margin-top: 16px;

  .display {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    .s_box {
      width: 383px;
      height: 258px;

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
        padding: 5px 0 0 5px;

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

      .lineBox {
        padding: 0;
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

    .tableBox {
      padding: 10px;
      .pagination-container{
        padding: 0;
        margin-top: 10px;
      }
    }
  }
}

</style>
