<template>
  <div class="body">
    <div class="formCard">
      <sale-form :rule-form="ruleForm" @changeForm="changeForm" />
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
                <div id="chartBox1" ref="chartBox1" style="width: 100%; height: 180px; padding: 10px" />
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
                <div id="chartBox2" ref="chartBox2" style="width: 100%; height: 180px; padding: 10px" />
              </div>
            </div>
          </el-card>
          <el-card class="s_box">
            <div>
              <div class="topBox">
                <div>
                  <span>平均配送时效</span>
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
                <el-table :data="serviceList" style="width: 100%" :header-cell-style="{ background: 'rgba(245, 247, 250, 1)' }">
                  <el-table-column prop="sectionName" label="片区"></el-table-column>
                  <el-table-column prop="name" label="门店名称"></el-table-column>
                  <el-table-column prop="customerNum" label="会员总数"></el-table-column>
                  <el-table-column prop="newCustomerRate" label="新会员占比"> </el-table-column>
                  <el-table-column prop="infoRate" label="信息完善度"> </el-table-column>
                  <el-table-column prop="returnRatio" label="回访率"> </el-table-column>
                  <el-table-column prop="timeDiffAvg" label="配送时效"> </el-table-column>
                  <el-table-column prop="eduTimesAvg" label="平均患教次数"> </el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="ruleForm.page" :limit.sync="ruleForm.pageSize" @pagination="getServiceList" />
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { shopServiceList, shopServiceCharts } from '@/api/user'
import saleForm from "@/components/saleForm"
import Pagination from '@/components/Pagination'
import echarts from "echarts"
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
        time: "year",
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
      serviceList: [],
      returnRatio: [],
      infoRate: [],
      eduTimesAvg: [],
      timeDiffAvg: []
    }
  },
  computed: {},
  created() {
    this.changeForm()
  },
  mounted() {
    this.initCharts1();
    this.initCharts2();
    this.initCharts3();
    this.initCharts4();
  },
  methods: {
    async getServiceList() {
      const res = await shopServiceList(this.ruleForm)
      this.serviceList = res.data.data
      this.total = res.data.total
    },
    async getServiceChart() {
      const res = await shopServiceCharts(this.ruleForm)
      this.returnRatio = res.data.returnRatio
      this.infoRate = res.data.infoRate
      this.eduTimesAvg = res.data.eduTimesAvg
      this.timeDiffAvg = res.data.timeDiffAvg
    },
    initCharts1() {
      const that = this;
      const charts1 = echarts.init(
        document.getElementById("chartBox1"),
        "macarons"
      );
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          formatter: function(name) {
            var str = option.series[0].data.filter((item) => {
              return item.name == name;
            });
            return `${name}：${str[0].value}%`;
          },
          right: 20,
          top: 20,
          bottom: 20,
        },
        series: [{
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          name: "按DOT分布",
          type: "pie",
          radius: ["30%", "90%"],
          center: ["30%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 80, name: "门店1" },
            { value: 48, name: "门店2" },
            { value: 32, name: "门店3" },
            { value: 60, name: "其他" },
          ],
        }, ],
      };
      charts1.setOption(option);
    },
    initCharts2() {
      var BorderWidth = "6";
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
          color: "#3A4154",
          borderColor: "#fff",
          borderWidth: 6,
        },
        emphasis: {
          color: "#dedede",
          borderColor: "#dedede",
          borderWidth: 0,
        },
      };
      const option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return `${params.name}：${params.value} %`;
          },
        },
        legend: [{
            icon: "bar",
            formatter: function(name) {
              for (let i = 0, l = option.series.length; i < l; i++) {
                if (name == option.series[i].data[0].name) {
                  return name + "：" + option.series[i].data[0].value + "%";
                }
              }
            },
            data: ["门店1", "门店2", "门店3", "门店4"],
            type: "scroll",
            orient: "vertical",
            right: 20,
            top: 20,
            bottom: 20,
          },
          {
            icon: "bar",
            data: ["门店1"],
            itemGap: 60,
            itemWidth: 14,
            y: "260",
            x: "100",
          },
        ],
        series: [{
            name: "门店1",
            type: "pie",
            clockWise: true, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["30%", "50%"],
            radius: ["80%", "85%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: "outside",
                },
                labelLine: {
                  show: false,
                  length: 100,
                  smooth: 0.5,
                },
                borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: "#3AA0FF",
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
              },
            },
            data: [{
                value: 70,
                name: "门店1",
              },
              {
                value: 100 - 70,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "门店2",
            type: "pie",
            clockWise: true,
            hoverAnimation: false,
            center: ["30%", "50%"],
            radius: ["60%", "65%"],
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
                borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: "#07BAAD",
                shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
              },
            },
            data: [{
                value: 46,
                name: "门店2",
              },
              {
                value: 100 - 56,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "门店3",
            type: "pie",
            clockWise: true,
            hoverAnimation: false,
            center: ["30%", "50%"],
            radius: ["40%", "45%"],
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
                borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: "#FF5733",
                shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
              },
            },
            data: [{
                value: 54,
                name: "门店3",
              },
              {
                value: 100 - 54,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "门店4",
            type: "pie",
            clockWise: true,
            hoverAnimation: false,
            center: ["30%", "50%"],
            radius: ["20%", "25%"],
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
                borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: ["#FFC403"],
                shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
              },
            },
            data: [{
                value: 75,
                name: "门店4",
              },
              {
                value: 100 - 75,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
        ],
      };
      const that = this;
      const charts2 = echarts.init(
        document.getElementById("chartBox2"),
        "macarons"
      );
      charts2.setOption(option);
    },
    initCharts3() {
      const that = this;
      const charts3 = echarts.init(
        document.getElementById("chartBox3"),
        "macarons"
      );
      const option = {
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "category",
          data: ["门店1", "门店2", "门店3", "门店4", "门店5", "门店6", "其他"],
        },
        yAxis: {
          type: "value",
        },
        series: [{
          data: [20, 24, 26, 32, 34, 46, 57],
          type: "line",
        }, ],
      };
      charts3.setOption(option);
    },
    initCharts4() {
      const that = this;
      const charts4 = echarts.init(
        document.getElementById("chartBox4"),
        "macarons"
      );
      const option = {
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "category",
          data: ["门店1", "门店2", "门店3", "门店4", "门店5", "门店6", "其他"],
        },
        yAxis: {
          type: "value",
        },
        series: [{
          data: [20, 24, 26, 32, 34, 46, 57],
          type: "bar",
        }, ],
      };
      charts4.setOption(option);
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return "white-row";
      } else {
        return "gray-row";
      }
    },
    changeForm() {
      this.getServiceList()
      this.getServiceChart()
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  background: rgba(235, 238, 242, 1);
  padding: 29px;
}

.formCard {
  margin: 0px 24px 25px -10px;
  width: 1655px;
}

.chartBox {
  margin: 25px 24px 25px -1px;
  width: 1655px;
  background-color: #fff;
  padding: 39px 36px 34px 27px;

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

      .lineBox {
        padding: 0;
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

    .tableBox {
      padding: 16px;
    }
  }
}

</style>
