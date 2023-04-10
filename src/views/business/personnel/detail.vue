<template>
  <el-container class="bcF4F6F9 p20">
    <el-header class="detail-header">
      <el-image style="width: 100px; height: 100px;vertical-align: top;" class="inlineBlock" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
      <div class="inlineBlock header-main">
        <el-row>
          <span class="f24 fw c4497F6 mr20 va-b"> 张三</span>
          <el-tag effect="dark" class="mr10">
            <svg-icon icon-class="nan" class-name="pr5 f16 va-28" />男</el-tag>
          <el-tag effect="dark" class="mr10" type="success">标签二</el-tag>
          <el-tag effect="dark" class="mr10" type="info">标签三</el-tag>
        </el-row>
        <el-row class="mt20">
          <svg-icon icon-class="dianhua" class-name="pr5 f25 va-28 c4497F6" />180923823333
          <svg-icon icon-class="geren" class-name="pr5 f25 va-28 c4497F6 ml20" />区域：江苏省南京市
        </el-row>
      </div>
    </el-header>
    <el-container>
      <el-aside class="mr20 bcFFFFFF left-p" width="500px">
        <h4>所辖药房</h4>
        <p class="lep1" v-for="v in list">
          <svg-icon icon-class="yaofang" class-name="pr5 f25 va-28 c4497F6" style="color: rgb(44, 62, 80);" />江苏省南京市区域江苏省南京市
        </p>
      </el-aside>
      <el-main class="bcFFFFFF">
        <div class="head clearfix">
          <div class="title fl">
            <img class="hospitalImg" src="../../../assets/index_img/hospitalIcon.png" />指标
          </div>
          <div class="switch fr">
            <el-radio-group v-model="period" size="small">
              <el-radio-button :label="1">当年</el-radio-button>
              <el-radio-button :label="2">当季</el-radio-button>
              <el-radio-button :label="3">当月</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="sum">
          <el-row>
            <el-col :span="8" class="border">
              <p class="name">拜访药房数量</p>
              <p class="num">12</p>
            </el-col>
            <el-col :span="8" class="border">
              <p class="name">拜访药房次数</p>
              <p class="num">21</p>
            </el-col>
            <el-col :span="8">
              <p class="name">药房覆盖率</p>
              <p class="num">50%</p>
            </el-col>
          </el-row>
        </div>
        <div class="rate">
          <el-card shadow="always">
            <div class="clearfix">
              <div class="fl">
                <div class="title">指标完成率</div>
                <div class="name">完成率</div>
                <div class="num">80%</div>
              </div>
              <div class="fr">
                <div id="chartBox" ref="chartBox" class="chartBox" />
              </div>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { find } from '@/api/salesman'
export default {
  name: 'BusinessPersonnel',
  data() {
    return {
      // 遮罩层
      loading: true,
      detail: {},
      list: [1, 2, 3, 4],
      period: 1,
      chartsData: [],
      charts: null
    }
  },
  async created() {
    // this.id = this.$route.params.id
    // this.getDetail(id)
  },
  methods: {
    async getDetail(id) {
      const res = await find({ id })
      this.detail = res.data
    },
    initCharts() {
      const that = this
      this.charts = echarts.init(this.$refs['chartBox'], "macarons")
      this.charts.setOption({
        series: [{
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
          data: this.chartsData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]

      })
    }
  },
  watch: {
    chartsData() {
      this.initCharts()
    }
  }
}

</script>
<style lang="scss" scoped>
.header-main {
  padding: 10px 0px 0 20px
}

.detail-header {
  background-color: #fff;
  border-top: 5px solid #4497F6;
  margin-bottom: 20px;
  height: auto !important;
  padding: 20px;
}

.left-p {
  width: 500px;
  height: calc(100vh - 290px);
  margin-bottom: 0;
}

.el-main {
  .head {
    .title {
      img {
        width: 22.74px;
        height: 17.48px;
        position: relative;
        top: 4px;
        margin-right: 5px;
      }
    }
  }

  .sum {
    .el-col {
      text-align: center;
      margin-top: 50px;

      &.border {
        border-right: 1px solid #ccc;
      }

      p {
        margin: 0;
      }

      .name {
        margin-bottom: 10px;
        color: #333;
      }

      .num {
        color: #1890ff;
        font-size: 20px;
      }
    }
  }

  .rate {
    padding: 40px 20px 0;

    .title {
      font-size: 18px;
      font-weight: bold;
    }

    .name {
      color: #666;
      font-size: 14px;
      margin-top: 30px;
      margin-bottom: 10px;
    }

    .num {
      color: #1890ff;
      font-size: 24px;
      font-weight: bold;
    }
  }
}

</style>
