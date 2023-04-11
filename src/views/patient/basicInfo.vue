<template>
  <div class="body">
    <div class="formCard">
      <saleForm :rule-form="ruleForm" :region-show="false" @changeForm="changeForm" :quick-show="false" />
      <div class="chartBox">
        <div class="display">
          <el-card class="s_box">
            <div>
              <div class="bottomBox">
                <img src="@/assets/shop_images/shop.jpg" />
                <div style="margin-left: 30px;" :style="shopInfo.isDtp ? 'margin-top: -15px;' : ''">
                  <div>
                    <span class="title">{{shopInfo.name}}</span>
                    <img v-if="shopInfo.isDtp" src="@/assets/shop_images/dtp.png" style="width: 100px;position: relative;top: 14px;">
                    <el-tag color="#F0933C" style="border-radius: 20px; margin-right: 10px; color: #fff;">{{shopInfo.regionName}}</el-tag>
                  </div>
                  <div class="content">
                    <el-descriptions :column="2" :colon="false">
                      <el-descriptions-item>
                        <span><img style="position: relative; top: 7px; height: 25px; width: 25px;" src="@/assets/shop_images/dh.png" /></span><span style="margin-left:5px;">{{shopInfo.phone}}</span>
                      </el-descriptions-item>
                      <el-descriptions-item label="医保资质：">
                        <el-tag color="#EDFDF9" style="border-radius: 20px; margin-right: 10px; color: #56B9AF;" size="small" v-if="shopInfo.isStd" effect="plain">双通道定点</el-tag>
                        <el-tag color="#EDF5FD" style="border-radius: 20px; margin-right: 10px; color: #599BF5;" size="small" v-if="shopInfo.isMm" effect="plain">门慢</el-tag>
                        <el-tag color="#5497F4" style="border-radius: 20px; margin-right: 10px; color: #fff;" size="small" v-if="shopInfo.isMt" effect="plain">门特</el-tag>
                      </el-descriptions-item>
                      <el-descriptions-item style="visibility: hidden;"></el-descriptions-item>
                      <el-descriptions-item label="创新支付："><img style="position: relative;top: -3px;" src="@/assets/shop_images/yb.png"><img style="position: relative;top: -4px;" src="@/assets/shop_images/zf.png"></el-descriptions-item>
                      <el-descriptions-item label="开办时间："><span>{{shopInfo.createTime | parseTime('{y}-{m}-{d}')}}</span></el-descriptions-item>
                      <el-descriptions-item label="授权药品：">拓益</el-descriptions-item>
                      <el-descriptions-item label="药房地址：">{{shopInfo.address}}</el-descriptions-item>
                      <el-descriptions-item label="慈善定点：">拓益</el-descriptions-item>
                      <!-- <el-descriptions-item label="所属">
                        江苏省德轩堂（集团）有限公司
                      </el-descriptions-item> -->
                    </el-descriptions>
                  </div>
                </div>
                <div style="margin:-10px 20px 0 0">
                  <!-- <img v-if="shopInfo.infoRate > 90" src="@/assets/shop_images/levelS.png" />
                  <img v-if="shopInfo.infoRate > 90" src="@/assets/shop_images/levelA.png" />
                  <img v-if="shopInfo.infoRate > 90" src="@/assets/shop_images/levelB.png" />
                  <img v-if="shopInfo.infoRate > 90" src="@/assets/shop_images/levelC.png" />
                  <img v-if="shopInfo.infoRate > 90" src="@/assets/shop_images/levelD.png" /> -->
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="s_box" style="margin-top:29px">
            <div>
              <div class="topBox">
                <div>动态运营分析</div>
              </div>
              <div class="bottomBox2">
                <div class="m_box">
                  <div><img src="@/assets/patient_images/分组 2.png" /></div>
                  <div>
                    <div>{{shopInfo.infoRate}}</div>
                    <div>信息采集完善度</div>
                  </div>
                </div>
                <div class="m_box">
                  <div><img src="@/assets/patient_images/分组 3.png" /></div>
                  <div>
                    <div>{{shopInfo.returnRatio}}</div>
                    <div>回访及时率</div>
                  </div>
                </div>
                <div class="m_box">
                  <div><img src="@/assets/patient_images/分组 4.png" /></div>
                  <div>
                    <div>{{shopInfo.timeDiffAvg}}h</div>
                    <div>平均配送时效</div>
                  </div>
                </div>
                <div class="m_box">
                  <div><img src="@/assets/patient_images/分组 6.png" /></div>
                  <div>
                    <div>{{shopInfo.satisfaction}}</div>
                    <div>服务满意度</div>
                  </div>
                </div>
                <div class="m_box">
                  <div><img src="@/assets/patient_images/分组 7.png" /></div>
                  <div>
                    <div>{{shopInfo.usageNumAvg}}盒</div>
                    <div>患者平均用药量</div>
                  </div>
                </div>
                <div class="m_box">
                  <div><img src="@/assets/patient_images/分组 8.png" /></div>
                  <div>
                    <div>{{shopInfo.eduTimesAvg}}次</div>
                    <div>患教服务次数</div>
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
                <h3 style="margin-top:1px">静态标准</h3>
              </div>
              <div>
                <!-- <div id="chartBox" ref="chartBox" class="inChartBox" /> -->
                <ul>
                  <li style="width: 30%;"><span>经营面积：</span>300mi</li>
                  <li style="width: 30%;"><span>商业位置：</span>院内店</li>
                  <li style="width: 40%;"><span>信息系统：</span> 患者服务系统、DDI直连系统、冷链监控系统、GSP系统</li>
                  <li style="width: 60%;"><span>储存设备：</span>冷链箱(5个),冷藏柜(容积4.5m)阴凉柜(容积4.5m)</li>
                  <li style="width: 40%;"><span>岗位人员：</span>初级药师2人、中级药师2人、执业药师4人</li>
                  <li style="width: 100%;"><span>功能区域：</span>药事咨询区(面积120m)、患教活动区(面积120日)、药品调配区(面积120m)、慈普赠药区(面积120m)</li>
                  <li style="width: 100%;"><span>经营范围：</span>普药、生物制品、肿瘤药品、中药饮片、中成药、化学药制剂、抗生素、生化药品、生物制品(除疫苗)等</li>
                </ul>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { queryShopInfo } from '@/api/system'
import saleForm from '@/components/saleForm'
import * as echarts from 'echarts'
import { parseTime } from '@/filters'
import _ from 'lodash'
require("echarts/theme/macarons")
export default {
  name: 'ShopDetail',
  components: {
    saleForm
  },
  data() {
    return {
      ruleForm: {
        year: '2022',
        startMonth: '',
        endMonth: '',
        shopId: this.$route.params.id
      },
      monthSales: [],
      shopInfo: {}
    }
  },
  created() {
    this.changeForm(this.ruleForm)
  },
  methods: {
    async queryShopInfo(form) {
      const res = await queryShopInfo(form)
      this.monthSales = res.data.monthSales
      this.shopInfo = res.data
    },
    changeForm(form) {
        this.queryShopInfo(form)
    },
    initCharts() {
      const charts1 = echarts.init(this.$refs['chartBox'])
      charts1.setOption({
        color: ['#6382e7'],
        grid: {
          left: 80,
        },
        xAxis: {
          type: 'category',
          data: _.map(this.monthSales, function(v){return v.name}),
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#f2f2f2',
            }
          },
          axisLabel: {
            show: true,
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let str = '';
            params.forEach((item, index) => {
              str +=
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + item.name + "销售额" + " : " + item.data + '万元' + "<br />";
            });
            return str;
          },
        },
        yAxis: {
          type: 'value',
          value: '万元',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#f2f2f2',
            }
          },
          axisLabel: {
            show: true,
            color: '#000'
          },
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          }
        },
        series: [{
          data: _.map(this.monthSales, function(v){return v.value}),
          type: 'line',
          smooth: true,
          itemStyle: {
            opacity: 0
          }
        }]
      })
    }
  },
  watch: {
    monthSales() {
      this.initCharts()
    }
  }
}

</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  height: 120vh;
  background: rgba(235, 238, 242, 1);
  padding: 29px;
}

.formCard {
  margin: 0px 24px 25px -10px;
  width: 1655px;
  height: 143px;
}

.chartBox {
  margin: 27px 24px 25px -1px;
  width: 1655px;
  height: 80vh;

  .display {
    .s_box:nth-child(1) {
      width: 1657px;

      ::v-deep .el-card__body {
        padding: 0px !important;
      }

      .topBox {
        width: 100%;
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid rgba(216, 220, 229, 1);
        padding: 0px 26px 0 16px;

        div {
          font-size: 16px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.85);
          text-align: left;
        }
      }

      .bottomBox {
        width: 100%;
        padding: 17px 0px 10px 26px;
        display: flex;
        flex-flow: row wrap;
        justify-content: start;
        >img {
          width: 190px;
          height: 134px;
          margin-top: 20px;
        }
        .title {

          font-size: 17px;
          font-weight: 700;
          color: rgba(58, 160, 255, 1);
          margin-right: 10px;
        }

        .content {
          margin-top: 10px;
          width: 900px;
        }
      }
    }

    .s_box:nth-child(2) {
      width: 1657px;
      height: 226px;

      ::v-deep .el-card__body {
        padding: 0px !important;
      }

      .topBox {
        width: 100%;
        height: 51px;
        line-height: 51px;
        border-bottom: 1px solid rgba(216, 220, 229, 1);
        padding: 0px 26px 0 16px;

        div {
          font-size: 16px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.85);
          text-align: left;
        }
      }

      .bottomBox2 {
        width: 100%;
        padding: 28px 0 0 0;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-content: center;

        .m_box {
          width: 248px;
          height: 115px;
          background-color: #f7f7f7;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          padding: 16px 27px 25px 24px;
          border-top: 0px solid #0000;

          >div:nth-child(1) {
            align-items: center;
            margin: 16px 0 0 0;
          }

          div:nth-child(2) {
            text-align: right;

            div:nth-child(1) {
              font-size: 36px;
              font-weight: 700;
              color: rgba(58, 160, 255, 1);
              margin-top: 10px;
            }

            div:nth-child(2) {
              font-size: 16px;
              font-weight: 400;
              color: rgba(89, 89, 89, 1);

            }
          }
        }

        .clearfix ::after {
          content: "";
          display: block;
          clear: both;
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
      width: 1657px;
      height: 407px;
      ul {
        li {
          display: inline-block;
          margin-top: 35px;
          color: #000;
          font-weight: 500;
          span {
            color: #666;
          }
        }
      }
      .topBox {
        height: 52px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 16px 16px 10px 20px;
        border-bottom: 1px solid rgba(216, 220, 229, 1);
      }

      .inChartBox {
        //   margin: 0 auto;
        width: 1800px;
        height: 350px;
      }
    }
  }
}

</style>
