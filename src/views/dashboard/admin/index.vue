<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col
        :span="12"
      ><div class="grid-content bg-purple">首页数据统计</div></el-col>
      <el-col :span="12">
        <el-radio-group v-model="dateActive" style="float: right">
          <el-radio-button label="year" name="year">当年</el-radio-button>
          <el-radio-button label="quarter" name="quarter">当季</el-radio-button>
          <el-radio-button label="month" name="month">当月</el-radio-button>
          <el-radio-button label="day" name="day">当天</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row :gutter="40" style="height: 305px">
      <el-col :xs="18" :sm="18" style="height: 100%">
        <div class="chartTitle">患者分布热力图</div>
        <div
          class="chart-part"
          style="height: calc(100% - 40px); background: #fff"
        />
      </el-col>
      <el-col :xs="6" :sm="6" style="height: 100%">
        <div class="xsyg">
          <div class="xsTitleBox">
            <div>销售预估完成率</div>
            <div class="completionRate">完成率</div>
            <div class="completionRateNum">80%</div>
          </div>
          <div>
            <div class="chart-wrapper">
              <pie-chart />
            </div>
          </div>
        </div>
        <div class="xsnd">
          <div class="xsTitleBox">
            <div>销售年度完成率</div>
            <div class="completionRate">完成率</div>
            <div class="completionRateNum">60%</div>
          </div>
          <div>
            <div class="chart-wrapper">
              <pie-chart />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40" class="allChartBox">
      <el-col :xs="18" :sm="18" style="height: 100%">
        <div class="chartTitle">销售统计</div>
        <div class="barChartBox">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" style="height: 100%">
        <div class="phBox">
          <div class="phTitle">
            <div>门店销售排行榜（TOP10）</div>
            <span>查看全部</span>
          </div>
          <ul>
            <li class="pbBox">
              <div class="firstPb">排行</div>
              <div class="secondPb">药房</div>
              <div class="thirdPb">本月销售额</div>
            </li>
            <li
              v-for="(item, index) in shopList"
              :key="index"
              class="pbBox bgfff"
            >
              <div class="firstPb">
                <img
                  v-if="index == 0"
                  src="../../../assets/index_img/gold.png"
                >
                <img
                  v-if="index == 1"
                  src="../../../assets/index_img/silver.png"
                >
                <img
                  v-if="index == 2"
                  src="../../../assets/index_img/bronze.png"
                >
                <div v-if="index > 2">{{ index + 1 }}</div>
              </div>
              <div class="secondPb">
                {{ item.name }}
              </div>
              <div class="thirdPb">
                {{ item.money }}
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import echarts from 'echarts'
import _ from 'lodash'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    PieChart,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      dateActive: 'year',
      options: [
        {
          count: 134
        },
        {
          lng: '117.1735760356',
          count: 32,
          lat: '34.2597049057'
        },
        {
          lng: '120.6338846979',
          count: 1,
          lat: '31.2746197161'
        },
        {
          lng: '120.3328896266',
          count: 9,
          lat: '31.6086091302'
        },
        {
          lng: '118.7512007783',
          count: 5,
          lat: '32.0867914530'
        },
        {
          lng: '119.9505910586',
          count: 21,
          lat: '31.7856270488'
        },
        {
          lng: '120.8568556227',
          count: 5,
          lat: '32.0244682185'
        },
        {
          lng: '120.8726688908',
          count: 42,
          lat: '32.0101819359'
        },
        {
          lng: '120.8726250780',
          count: 7,
          lat: '32.0261301477'
        },
        {
          lng: '120.8711949627',
          count: 19,
          lat: '32.0151678890'
        },
        {
          lng: '120.7552214006',
          count: 14,
          lat: '32.1084861085'
        },
        {
          lng: '120.8746653502',
          count: 2,
          lat: '32.0607906299'
        },
        {
          lng: '120.6260226246',
          count: 17,
          lat: '31.3069631346'
        },
        {
          lng: '120.6037970054',
          count: 5,
          lat: '31.2747131899'
        },
        {
          lng: '120.7326630430',
          count: 1,
          lat: '31.3344155454'
        },
        {
          lng: '120.3117990093',
          count: 2,
          lat: '31.5746282267'
        },
        {
          lng: '120.2964003072',
          count: 14,
          lat: '31.6028731388'
        },
        {
          lng: '120.2807518255',
          count: 20,
          lat: '31.9154041083'
        },
        {
          lng: '117.2028750974',
          count: 29,
          lat: '34.2790363208'
        },
        {
          lng: '117.1850852688',
          count: 62,
          lat: '34.2690328267'
        },
        {
          lng: '119.4399434703',
          count: 7,
          lat: '32.7875592722'
        },
        {
          lng: '118.8011767341',
          count: 29,
          lat: '32.0403197058'
        },
        {
          lng: '118.7832995975',
          count: 19,
          lat: '32.0773181018'
        },
        {
          lng: '119.9662940842',
          count: 78,
          lat: '31.7802386621'
        },
        {
          lng: '119.9512956886',
          count: 64,
          lat: '31.7565951399'
        },
        {
          lng: '119.9756923410',
          count: 29,
          lat: '31.7981570711'
        },
        {
          lng: '119.9703940842',
          count: 5,
          lat: '31.7794286621'
        },
        {
          lng: '120.1624821421',
          count: 1,
          lat: '32.5127508928'
        },
        {
          lng: '120.6731566048',
          count: 14,
          lat: '31.3968606941'
        },
        {
          lng: '119.3833957620',
          count: 1,
          lat: '32.1769516583'
        },
        {
          lng: '119.5730894162',
          count: 7,
          lat: '32.0007946317'
        },
        {
          lng: '118.7738578240',
          count: 107,
          lat: '32.0538699053'
        },
        {
          lng: '118.7814440148',
          count: 23,
          lat: '32.0480943146'
        },
        {
          lng: '118.7919567436',
          count: 168,
          lat: '32.0742364655'
        },
        {
          lng: '118.8138918411',
          count: 161,
          lat: '32.0467820683'
        },
        {
          lng: '118.7897266259',
          count: 2,
          lat: '32.0611620741'
        },
        {
          lng: '119.9672534443',
          count: 224,
          lat: '31.7854570297'
        },
        {
          lng: '119.0253961294',
          count: 1,
          lat: '33.6314234546'
        },
        {
          lng: '120.5904723397',
          count: 99,
          lat: '31.3022665027'
        },
        {
          lng: '119.9245343735',
          count: 1,
          lat: '32.4901981820'
        },
        {
          lng: '120.2747533704',
          count: 4,
          lat: '31.5735023182'
        },
        {
          lng: '120.6550203648',
          count: 9,
          lat: '31.1654613137'
        },
        {
          lng: '120.1259083620',
          count: 21,
          lat: '33.3893210656'
        },
        {
          lng: '119.4594542549',
          count: 62,
          lat: '32.3999936608'
        },
        {
          lng: '119.4379155733',
          count: 269,
          lat: '32.3911527622'
        },
        {
          lng: '119.4251171965',
          count: 28,
          lat: '32.3999721462'
        },
        {
          lng: '119.8254738628',
          count: 5,
          lat: '31.3667648590'
        },
        {
          lng: '119.4519445024',
          count: 11,
          lat: '32.2119068447'
        },
        {
          lng: '120.3286830789',
          count: 39,
          lat: '31.5458025532'
        },
        {
          lng: '118.7908022371',
          count: 8,
          lat: '32.0240585088'
        },
        {
          lng: '118.7759598782',
          count: 14,
          lat: '32.0944108629'
        },
        {
          lng: '118.8011767341',
          count: 11,
          lat: '32.0403197058'
        },
        {
          lng: '120.6116028870',
          count: 318,
          lat: '31.3503219426'
        },
        {
          lng: '119.4598045024',
          count: 21,
          lat: '32.2182968447'
        },
        {
          lng: '120.4657245136',
          count: 26,
          lat: '32.5482838088'
        },
        {
          lng: '120.7552214006',
          count: 35,
          lat: '32.1084861085'
        },
        {
          lng: '120.3026416422',
          count: 12,
          lat: '31.5975488534'
        },
        {
          lng: '119.7480017385',
          count: 12,
          lat: '32.2221327938'
        },
        {
          lng: '120.9165782769',
          count: 3,
          lat: '31.9444558626'
        },
        {
          lng: '120.1676485296',
          count: 6,
          lat: '33.3462783072'
        },
        {
          lng: '121.6672569389',
          count: 1,
          lat: '31.8188279070'
        },
        {
          lng: '117.2746159238',
          count: 10,
          lat: '31.8518470265'
        },
        {
          lng: '117.2972780938',
          count: 19,
          lat: '31.8635287419'
        },
        {
          lng: '117.2008478286',
          count: 12,
          lat: '34.2466644754'
        },
        {
          lng: '120.4137557858',
          count: 9,
          lat: '31.3544255910'
        },
        {
          lng: '117.2540549441',
          count: 4,
          lat: '31.8584800335'
        },
        {
          lng: '119.9505910586',
          count: 45,
          lat: '31.7856270488'
        },
        {
          lng: '120.6410150449',
          count: 786,
          lat: '31.3085366323'
        },
        {
          count: 33
        },
        {
          count: 1
        },
        {
          count: 9
        },
        {
          count: 2
        },
        {
          count: 4
        },
        {
          count: 3
        },
        {
          count: 2
        },
        {
          count: 5
        }
      ],
      shopList: [
        { id: 1, name: '南京德众堂大药房', money: '134200' },
        { id: 2, name: '南京德众堂大药房', money: '134200' },
        { id: 3, name: '南京德众堂大药房', money: '134200' },
        { id: 4, name: '南京德众堂大药房', money: '134200' },
        { id: 5, name: '南京德众堂大药房', money: '134200' },
        { id: 6, name: '南京德众堂大药房', money: '134200' },
        { id: 7, name: '南京德众堂大药房', money: '134200' },
        { id: 8, name: '南京德众堂大药房', money: '134200' },
        { id: 9, name: '南京德众堂大药房', money: '134200' },
        { id: 10, name: '南京德众堂大药房', money: '134200' }
      ]
    }
  },
  mounted() {
    this.dealHearMap()
    this.initChart1()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    initChart1() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: 'Sales', max: 10000 },
            { name: 'Administration', max: 20000 },
            { name: 'Information Technology', max: 20000 },
            { name: 'Customer Support', max: 20000 },
            { name: 'Development', max: 20000 },
            { name: 'Marketing', max: 20000 }
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
        },
        series: [
          {
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              }
            },
            data: [
              {
                value: [5000, 7000, 12000, 11000, 15000, 14000],
                name: 'Allocated Budget'
              },
              {
                value: [4000, 9000, 15000, 15000, 13000, 11000],
                name: 'Expected Spending'
              },
              {
                value: [5500, 11000, 12000, 15000, 12000, 12000],
                name: 'Actual Spending'
              }
            ],
            animationDuration: animationDuration
          }
        ]
      })
    },
    dealHearMap() {
      var that = this
      var map = new BMap.Map('map', { minZoom: 4 }) // 创建地图实例
      var point = new BMap.Point(119.208435, 32.02404)
      map.centerAndZoom(point, 8) // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom() // 允许滚轮缩放
      map.setMapStyle({
        styleJson: [
          {
            featureType: 'road',
            elementType: 'all',
            stylers: {
              color: '#ffffff',
              visibility: 'off'
            }
          }
        ]
      })
      heatmapOverlay = new BMapLib.HeatmapOverlay({
        radius: 20,
        minOpacity: 0.2
      })
      map.addOverlay(heatmapOverlay)
      var maxNum = _.max(
        _.map(this.options, function(v) {
          return v.count
        })
      )
      heatmapOverlay.setDataSet({ data: this.options, max: maxNum })
      // 定义一个控件类,即function
      function ZoomControl() {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT
        this.defaultOffset = new BMap.Size(10, 10)
      }
      // 通过JavaScript的prototype属性继承于BMap.Control
      ZoomControl.prototype = new BMap.Control()
      // ZoomControl.prototype.initialize = function (map) {
      //   // 创建一个DOM元素
      //   var div = document.createElement("div");
      //   var img = new Image();
      //   img.src = "../saasimages/full-screen.png";
      //   div.append(img);
      //   div.style.cursor = "pointer";
      //   $(div).hover(
      //     function () {
      //       // $(this)
      //       //   .find("img")
      //       //   .attr("src", "../saasimages/full-screen-hover.png");
      //     },
      //     function () {
      //       // $(this).find("img").attr("src", "../saasimages/full-screen.png");
      //     }
      //   );
      //   // $(div).click(function () {
      //   //   parent.window.open(
      //   //     "../group/show_map?type=" +
      //   //       $(".select-dimension .selected").data("type"),
      //   //     "_blank"
      //   //   );
      //   // });
      //   // 添加DOM元素到地图中
      //   map.getContainer().appendChild(div);
      //   // 将DOM元素返回
      //   return div;
      // };
      // 创建控件
      var myZoomCtrl = new ZoomControl()
      // 添加到地图当中
      map.addControl(myZoomCtrl)
      $('.map-wrap .select-dimension span')
        .unbind()
        .click(function() {
          $(this).addClass('selected').siblings().removeClass('selected')
          that.dealHeatMap()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .flexBox {
    display: flex;
    justify-content: space-around;
  }
  .xsyg {
    height: 46%;
    background: #fff;
    display: flex;
  }
  .xsnd {
    height: 46%;
    background: #fff;
    margin-top: 6%;
    display: flex;
  }
  .xsTitleBox {
    width: 60%;
    font-size: 16px;
    padding: 16px 20px;
    .completionRate {
      color: rgba(0, 0, 0, 0.45);
      margin-top: 16px;
      font-size: 14px;
    }
    .completionRateNum {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      color: rgba(42, 130, 228, 1);
      margin-top: 10px;
    }
  }
  .phTitle {
    display: flex;
    justify-content: space-between;
    line-height: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(216, 220, 229, 1);
    margin-bottom: 16px;
    div {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(24, 144, 255, 1);
      cursor: pointer;
    }
  }
  .allChartBox {
    height: 459px;
    margin-bottom: 32px;
    .phBox {
      background: #fff;
      height: 100%;
      padding: 16px;
      box-sizing: border-box;
      ul {
        height: 370px;
        overflow-y: scroll;
      }
      .pbBox {
        display: flex;
        background: rgba(245, 247, 250, 1);
        padding: 9px;
        color: rgba(127, 143, 164, 1);
        font-size: 14px;
        .firstPb {
          width: 25%;
        }
        .secondPb {
          width: 45%;
        }
        .thirdPb {
          width: 30%;
          text-align: right;
          padding-right: 12px;
        }
      }
      .bgfff {
        background-color: #fff;
        border-bottom: 1px solid rgba(216, 220, 229, 1);
        line-height: 30px;
        box-sizing: border-box;
        height: 42px;
      }
    }
  }
  .barChartBox {
    background-color: #fff;
    padding: 16px;
    box-sizing: border-box;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .chartTitle {
    background: #fff;
    line-height: 40px;
    font-size: 16px;
    vertical-align: top;
    padding-left: 16px;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
    height: 100%;
  }
}
</style>
<style>
.el-row {
  margin-bottom: 20px !important;
}
</style>
