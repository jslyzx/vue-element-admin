<template>
  <div class="body">
    <div class="formCard">
      <saleForm @queryProvinceSalePrice="queryProvinceSalePrice" :ruleForm="ruleForm" @changeForm="changeForm" />
    </div>
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
                  <el-tab-pane label="全部" name="" />
                  <el-tab-pane label="20mg" name="160" />
                  <el-tab-pane label="80mg" name="357" />
                </el-tabs>
              </div>
            </div>
            <div class="bottomBox">
              <div class="price">
                <!-- {{topData}} -->
                {{topData.salesPrice?topData.salesPrice[0].currSalePrice:'0'}} 万元
              </div>
              <div class="compare">
                <div><span>同比</span><span
                    style="margin-left: 19px;">{{topData.salesPrice?topData.salesPrice[0].yearGrowthRate:'0%'}}</span><span
                    style="margin-left: 16px;"><img v-if="topData.salesPrice?(parseFloat(topData.salesPrice[0].yearGrowthRate) >= 0?true:false):''" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span></div>
                <div style="margin-left:37px"><span>环比</span><span
                    style="margin-left: 19px;">{{topData.salesPrice?topData.salesPrice[0].monthGrowthRate:'0%'}}</span><span
                    style="margin-left: 16px;"><img v-if="topData.salesPrice?(parseFloat(topData.salesPrice[0].monthGrowthRate) >= 0?true:false):''" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span></div>
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
                <el-tabs v-model="tabIndex2" @tab-click="handleClick2">
                  <el-tab-pane label="全部" name="" />
                  <el-tab-pane label="20mg" name="160" />
                  <el-tab-pane label="80mg" name="357" />
                </el-tabs>
              </div>
            </div>
            <div class="bottomBox">
              <div class="price">
                {{topData.salesNum?topData.salesNum[0].currSaleNum?topData.salesNum[0].currSaleNum:'0':'0'}} 盒
              </div>
              <div class="compare">
                <div><span>同比</span><span
                    style="margin-left: 19px;">{{topData.salesNum?topData.salesNum[0].yearGrowthRate:'0%'}}</span><span
                    style="margin-left: 16px;"><img v-if="topData.salesNum?(parseFloat(topData.salesNum[0].yearGrowthRate) >= 0?true:false):''" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span></div>
                <div style="margin-left:37px"><span>环比</span><span
                    style="margin-left: 19px;">{{topData.salesNum?topData.salesNum[0].monthGrowthRate:'0%'}}</span><span
                    style="margin-left: 16px;"><img v-if="topData.salesNum?(parseFloat(topData.salesNum[0].monthGrowthRate) >= 0?true:false):''" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span></div>
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
                <el-tabs v-model="tabIndex3" @tab-click="handleClick3">
                  <el-tab-pane label="全部" name="" />
                  <el-tab-pane label="20mg" name="160" />
                  <el-tab-pane label="80mg" name="357" />
                </el-tabs>
              </div>
            </div>
            <div class="bottomBox">
              <div class="price">
                {{topData.oldCustomerSalesNum?topData.oldCustomerSalesNum[0].currSaleNum?topData.oldCustomerSalesNum[0].currSaleNum:'0':'0'}}
                盒
              </div>
              <div class="compare">
                <div><span>同比</span><span
                    style="margin-left: 19px;">{{topData.oldCustomerSalesNum?topData.oldCustomerSalesNum[0].yearGrowthRate:'0%'}}</span><span
                    style="margin-left: 16px;"><img v-if="topData.oldCustomerSalesNum?(parseFloat(topData.oldCustomerSalesNum[0].yearGrowthRate) >= 0?true:false):''" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span></div>
                <div style="margin-left:37px"><span>环比</span><span
                    style="margin-left: 19px;">{{topData.oldCustomerSalesNum?topData.oldCustomerSalesNum[0].monthGrowthRate:'0%'}}</span>
                  <span style="margin-left: 16px;"> <img v-if="topData.oldCustomerSalesNum?(parseFloat(topData.oldCustomerSalesNum[0].monthGrowthRate) >= 0?true:false):''" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span>
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
                <el-tabs v-model="tabIndex4" @tab-click="handleClick4">
                  <el-tab-pane label="全部" name="" />
                  <el-tab-pane label="20mg" name="160" />
                  <el-tab-pane label="80mg" name="357" />
                </el-tabs>
              </div>
            </div>
            <div class="bottomBox">
              <div class="price">
                {{topData.customerSalesNum?topData.customerSalesNum[0].currSaleNum?topData.customerSalesNum[0].currSaleNum:'0':'0'}}
                盒
              </div>
              <div class="compare">
                <div><span>同比</span><span
                    style="margin-left: 19px;">{{topData.customerSalesNum?topData.customerSalesNum[0].yearGrowthRate:'0%'}}</span><span
                    style="margin-left: 16px;"><img v-if="topData.customerSalesNum?(parseFloat(topData.customerSalesNum[0].yearGrowthRate) >= 0?true:false):''" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span></div>
                <div style="margin-left:37px"><span>环比</span><span
                    style="margin-left: 19px;">{{topData.customerSalesNum?topData.customerSalesNum[0].monthGrowthRate:'0%'}}</span><span
                    style="margin-left: 16px;"><img v-if="topData.customerSalesNum?(parseFloat(topData.customerSalesNum[0].monthGrowthRate) >= 0?true:false):''" src="@/assets/sale_images/路径 16.png" /><img v-else src="@/assets/sale_images/Info Icon.png" /></span></div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="chartDisplay">
        <el-card style="flex-basis: calc(50% - 10px);">
          <div class="inBox">
            <div class="topBox">
              <h3 style="margin-top:1px">销售统计</h3>
              <div style="margin-top:-5px">
                <div style="display:flex;line-height: 24px;width: 80px;border: 1px solid #ccc;text-align: center;">
                  <div style="width:50%;font-size: 12px;border-right: 1px solid #ccc;cursor: pointer;" @click="changeType(2)" :class="tabIndex5==2?'active':''">数量</div>
                  <div style="width:50%;font-size: 12px;cursor: pointer;" :class="tabIndex5==1?'active':''" @click="changeType(1)">金额</div>
                </div>
              </div>
            </div>
            <div>
              <div id="chartBox5" ref="chartBox5" class="inChartBox5" />
            </div>
          </div>
        </el-card>
        <el-card style="margin-left: 20px;flex: 1;">
          <div class="inBox2">
            <div style="border-bottom:1px solid #ccc;padding:15px 0 15px 18px;font-size: 18px;font-weight: 700;">各省区销售占比
            </div>
            <div id="chartBox2" ref="chartBox2" class="inChartBox2" />
          </div>
        </el-card>
        <div class="rightBox" style="margin-left: 20px;flex: 1;">
          <div>
            <el-card>
              <div style="box-sizing:border-box;width:100%;height:274px">
                <div style="border-bottom:1px solid #ccc;padding:15px 0 15px 18px;font-size: 18px;font-weight: 700;">
                  各大区销售占比</div>
                <div id="chartBox3" ref="chartBox3" class="inChartBox3" />
              </div>
            </el-card>
          </div>
          <div style="margin-top: 20px;">
            <el-card>
              <div style="box-sizing:border-box;width:100%;height:274px">
                <div style="border-bottom:1px solid #ccc;padding:15px 0 15px 18px;font-size: 18px;font-weight: 700;">
                  各片区销售占比</div>
                <div id="chartBox4" ref="chartBox4" class="inChartBox4" />
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import saleForm from '@/components/saleForm'
import { queryProvinceSalePriceRate, submitTop, queryShopSale, queryRegionSale, querySectionSale } from "@/api/sales"
import { queryMonthSalesPrice } from "@/api/home"
import * as echarts from 'echarts'
import { type } from 'os';
require("echarts/theme/macarons"); // echarts theme
export default {
  name: 'SaleYearly',
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
        regionId: '',
        sectionId: '',
        provinceId: '',
        shopId: ''
      },
      tabIndex: '',
      tabIndex2: '',
      tabIndex3: '',
      tabIndex4: '',
      tabIndex5: "1",
      chartsData1: [
      ],
      chartsData2: [
      ],
      chartsData3: [
      ],
      topData: {},
      medicine1Data: [],
      medicine2Data: [],
      medicine3Data: [],
      medicine4Data: [],
      id1: '',
      chart:null,
      charts1: null,
      charts2: null,
      charts3: null,
      charts4: null
    }
  },
  computed: {

  },
  created() {
    this.submitTop1({ queryType: this.ruleForm.queryType, medicineId: '' });

    this.query1({
      queryType: this.ruleForm.queryType * 1,
    })
    this.query2({
      queryType: this.ruleForm.queryType * 1,
    })
  },
  mounted() {
    this.initCharts2()
    this.$nextTick(function () {
      this.initCharts3()
    })
    this.initCharts4()
    this.queryProvinceSalePrice1({
      queryType: this.ruleForm.queryType * 1,
    });
    this.queryMonthSalesPrice({
      queryType: this.ruleForm.queryType,
      type: this.tabIndex5
    });
    window.addEventListener("resize", () => {
      this.chart.resize();
      // this.charts1.resize();
      this.charts2.resize();
      this.charts3.resize();
      this.charts4.resize();
    })
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.chart.resize();
      // this.charts1.resize();
      this.charts2.resize();
      this.charts3.resize();
      this.charts4.resize();
    });
  },
  methods: {
    changeType(label) {
      this.tabIndex5=label;
      this.queryMonthSalesPrice({
        queryType: this.ruleForm.queryType,
        type: this.tabIndex5
      })
    },
    queryMonthSalesPrice(data) {
      queryMonthSalesPrice(data).then((res) => {
        if (res.code == 0) {
          let arr1 = [];
          let arr2 = [];
          if (res.data.monthSalesNum160) {
            res.data.monthSalesNum160.forEach((item) => {
              arr1.push(item.salesNum);
            });
            res.data.monthSalesNum357.forEach((item) => {
              arr2.push(item.salesNum);
            });
            this.medicine1Data = arr1;
            this.medicine2Data = arr2;
            // console.log(this.medicine1Data,this.medicine2Data);
          } else {
            res.data.monthSalesPrice160.forEach((item) => {
              arr1.push(item.salesPrice);
            });
            res.data.monthSalesPrice357.forEach((item) => {
              arr2.push(item.salesPrice);
            });
            this.medicine3Data = arr1;
            this.medicine4Data = arr2;
            // console.log(this.medicine3Data,this.medicine4Data);
          }
        }
      });
    },
    async query2(data) {
      let res = await querySectionSale(data);

      this.chartsData3 = res.data.provinceSalePriceRate.map((item, index) => {
        return { name: item.sectionName, value: item.salesPrice, rate: item.salePriceRate }
      });
    },
    async query1(data) {
      let res = await queryRegionSale(data);
      this.chartsData2 = res.data.provinceSalePriceRate.map((item, index) => {
        return { name: item.regionMame, value: item.salesPrice, rate: item.salePriceRate }
      });
    },
    async changeForm(form) {
      this.queryProvinceSalePrice1(form);
      this.query2(form);
      this.query1(form);
      this.submitTop1({ ...form, medicineId: this.id1 });
      this.queryMonthSalesPrice({
        ...form,
        type: this.tabIndex5
      });
    },
    async submitTop1(data, id, type) {
      if (id == 0) {
        id = ''
      } if (data.medicineId == 0) {
        delete data.medicineId
      }
      let res = await submitTop(data);
      if (res.code == 0) {
        if (!type) {
          this.topData = res.data;
          this.id1 = id;
        } else {
          this.topData[type] = res.data[type];
          this.id1 = id;
        }

      }
    },
    async handleClick(tab) {
      this.submitTop1({ queryType: this.ruleForm.queryType, medicineId: this.tabIndex }, this.tabIndex, 'salesPrice');
    },
    handleClick2(tab) {
      this.submitTop1({ queryType: this.ruleForm.queryType, medicineId: this.tabIndex2 }, this.tabIndex2, 'salesNum');
    },
    handleClick3(tab) {
      this.submitTop1({ queryType: this.ruleForm.queryType, medicineId: this.tabIndex3 }, this.tabIndex3, 'oldCustomerSalesNum');

    },
    handleClick4(tab) {
      this.submitTop1({ queryType: this.ruleForm.queryType, medicineId: this.tabIndex4 }, this.tabIndex4, 'customerSalesNum');
    },
    initCharts2() {
      const that = this
      this.charts2 = echarts.init(this.$refs['chartBox2'], "macarons")
      this.charts2.setOption(
        {
          tooltip: {
            trigger: 'item',
            formatter: '销售金额: {c}万<br />销售占比: {d}'
          },
          // color: ['#2A58C7', '#3AA0FF', '#FF8D1A', '#D43030', '#00BAAD', '#FFC300', '#A5D63FFF', '#AC33C1FF'],
          legend: [{
            bottom: '0%',
            left: 'center',
            formatter: function (name) {
              for (let index in that.chartsData1) {
                if (name == that.chartsData1[index].name) {
                  return `${name}   ${that.chartsData1[index].rate ? that.chartsData1[index].rate : '0%'}`
                }
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
          },
          ],
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['60%', '25%'],
              center: ['50%', '30%'],
              // hoverAnimation:true, //鼠标悬浮是否有区域弹出动画，false:无  true:有
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'inside',
                // color: '#fff',
                fontSize: 14,
                formatter: '{b}\n{d}%'
              },
              labelLine: {
                show: true,
              },
              minAngle: 5,
              minShowLabelAngle: 10,
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
      this.charts3 = echarts.init(this.$refs['chartBox3'], "macarons")
      this.charts3.setOption(
        {
          tooltip: {
            trigger: 'item',
            formatter: '销售金额: {c}万<br />销售占比: {d}'
          },
          color: ['#A5D63F'],
          legend: {
            formatter: function (name) {
              console.log(that.chartsData2);
              for (let index in that.chartsData2) {
                if (name == that.chartsData2[index].name) {
                  return `${name}   ${that.chartsData2[index].rate ? that.chartsData2[index].rate : '0%'}`
                }
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
          },
          series: [
            {
              // name: 'Access From',
              type: 'pie',
              radius: ['30%', '20%'],
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
         
              minAngle: 5,
              minShowLabelAngle: 10,
              data: this.chartsData2
            }
          ],
          grid: {
            x: 50,
            y: 60,
            x2: 10,
            y2: 35
          }
        })
    },
    initCharts4() {
      const that = this
      this.charts4 = echarts.init(this.$refs['chartBox4'], "macarons")
      this.charts4.setOption(
        {
          tooltip: {
            trigger: 'item',
            formatter: '销售金额: {c}万<br />销售占比: {d}'
          },
          color: ['#2A58C7', '#FF8D1A', '#00BAAD', '#A5D63F', '#EE6666'],
          legend: {
            formatter: function (name) {
              for (let index in that.chartsData3) {
                if (name == that.chartsData3[index].name) {
                  return `${name}  ${that.chartsData3[index].rate ? that.chartsData3[index].rate : '0%'}`
                }
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
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['30%', '20%'],
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
              // minAngle: 5,
              // minShowLabelAngle: 10,
              data: this.chartsData3,
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
    initChart5() {
      this.chart = echarts.init(this.$refs['chartBox5'], "macarons");
      if(this.tabIndex5==2){
        this.chart.clear();
        this.chart.setOption({
        title: {
          text: "销量（盒）",
          textStyle: {
            color: "rgba(166, 166, 166, 1)",
          },
          left:"15px"
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["20mg", "80mg"],
        },
        calculable: true,
        xAxis: [{
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
        },],
        yAxis: [{
          type: "value",
        },],
        grid: {
            x: 50,
            y: 60,
            x2: 10,
            y2: 35
          },
        series: [{
          name: "20mg",
          type: "bar",
          data: this.medicine1Data,
          itemStyle: {
            color: "rgba(58, 160, 255, 1)",
          },
        },
        {
          name: "80mg",
          type: "bar",
          data: this.medicine2Data,
          itemStyle: {
            color: "rgba(0, 186, 173, 1)",
          },
        },
        ],
      });
      }else{
        this.chart.clear();
        this.chart.setOption({
        title: {
          text: "销售额（万元）",
          textStyle: {
            color: "rgba(166, 166, 166, 1)",
          },
          left:"15px"
        },
        grid: {
            x: 50,
            y: 60,
            x2: 10,
            y2: 35
          },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["20mg", "80mg"],
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
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "20mg",
            type: "bar",
            data: this.medicine3Data,
            itemStyle: {
              color: "rgba(58, 160, 255, 1)",
            },
          },
          {
            name: "80mg",
            type: "bar",
            data: this.medicine4Data,
            itemStyle: {
              color: "rgba(0, 186, 173, 1)",
            },
          },
        ],
        });
      }
    },
    queryProvinceSalePrice(query) {
      this.query2(query);
      this.query1(query);
      this.submitTop1({ queryType: this.ruleForm.queryType, medicineId: this.id1 });
      this.queryMonthSalesPrice({
        ...query,
        type: this.tabIndex5
      });
      this.queryProvinceSalePrice1(query);
    },
    async queryProvinceSalePrice1(query) {
      let res = await queryProvinceSalePriceRate(query);
      if (res.code == 0) {
        this.chartsData1 = res.data.provinceSalePriceRate.map((item, index) => {
          return { name: item.provinceName, value: item.salesPrice, rate: item.salePriceRate }
        });
      };
    }
  },
  watch: {
    chartsData1() {
      this.initCharts2();
    },
    chartsData2() {
      this.initCharts3();
    },
    chartsData3() {
      this.initCharts4();
    },
    medicine1Data() {
      this.initChart5();
    },
    medicine3Data() {
      this.initChart5();
    }
  }
}

</script>
<style lang="scss" scoped>
.active{
  color:#fff;
  background-color: #409eff;
}
.chartBox {
  margin-top: 20px;

  .display {
    display: flex;
    flex-flow: row nowrap;
    margin: -10px;

    .s_box {
      flex: 1;
      height: 140px;
      margin: 10px;

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
    margin-top: 20px;
    display: flex;
    flex-flow: row wrap;

    ::v-deep .el-card__body {
      padding: 0px !important;
    }

    .inBox {
      width: 100%;
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
        margin: 30px auto;
        width: 100%;
        height: 500px;
      }


      .inChartBox5 {
        margin: 30px auto;
        width: 100%;
        height: 500px;
      }
    }

    .inBox2 {
      width: 100%;
      height: 566px;
      padding: 0px 0 0 0px;

      ::v-deep .el-card__body {
        padding: 0px !important;
      }

      .inChartBox2 {
        margin: 30px auto;
        width: 100%;
        height: 450px;
      }
    }

    .inChartBox3 {
      margin: 30px auto;
      width: 100%;
      height: 550px;
    }

    .inChartBox4 {
      margin: 30px auto;
      width: 100%;
      height: 550px;
    }
  }
}
</style>
