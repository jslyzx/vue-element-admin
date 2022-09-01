<template>
  <div class="body">
    <div class="formCard">
      <sale-form :rule-form="ruleForm" :utilsShow="utilsShow" />
    </div>
    <div class="container">
      <div class="chartBox">
        <div class="chartTitle">按DOT分布</div>
        <div class="mapBox">
          <div id="chartBox1" style="height: 288px" />
        </div>
      </div>
      <div class="chartContent1">
        <div class="smallChartTitle">按省区分布</div>
        <div id="smallChartBox1" style="height: 220px; width: 100%" />
      </div>
      <div class="chartContent2">
        <div class="smallChartTitle">按年龄分布</div>
        <div id="smallChartBox2" style="height: 220px; width: 100%" />
      </div>
    </div>
    <div class="container">
      <div class="chartBox">
        <div class="chartTitle">按适应症分布</div>
        <div class="mapBox syzBox">
          <div id="chartBox2" style="height: 288px; width: 300px" />
          <div class="percentageBox">
            <div class="syzTitle">不可切除或转移性黑色素瘤</div>
            <el-progress :percentage="30" :color="'#2EC7C9'"></el-progress>
            <div class="syzTitle">复发/转移性鼻咽癌</div>
            <el-progress :percentage="20" :color="'#B6A2DE'"></el-progress>
            <div class="syzTitle">晚期或转移性尿路上皮癌</div>
            <el-progress :percentage="40" :color="'#5AB1EF'"></el-progress>
            <div class="syzTitle">可切除或转移性黑色素瘤</div>
            <el-progress :percentage="10" :color="'#FFB980'"></el-progress>
          </div>
        </div>
      </div>
      <div class="chartContent1">
        <div class="smallChartTitle">按性别分布</div>
        <div id="smallChartBox3" style="height: 220px; width: 100%" />
      </div>
      <div class="chartContent2">
        <div class="smallChartTitle">按BMI分布</div>
        <div id="smallChartBox4" style="height: 220px; width: 100%" />
      </div>
    </div>
  </div>
</template>
    
    <script>
import saleForm from "@/components/saleForm";
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
export default {
  name: "Structure",
  components: {
    saleForm,
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
        sex: "",
        age: "",
        indication: "",
      },
      utilsShow: 2,
    };
  },
  computed: {},
  mounted() {
    this.initCharts1();
    this.initSmallChartBox1();
    this.initSmallChartBox2();
    this.initCharts2();
    this.initSmallChartBox3();
    this.initSmallChartBox4();
  },
  created() {},
  methods: {
    initCharts1() {
      const that = this;
      const charts1 = echarts.init(
        document.getElementById("chartBox1"),
        "macarons"
      );
      charts1.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: 20,
          top: 20,
          bottom: 20,
        },
        series: [
          {
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
            radius: [50, 120],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "DOT区间一" },
              { value: 38, name: "DOT区间二" },
              { value: 32, name: "DOT区间三" },
              { value: 30, name: "DOT区间四" },
              { value: 28, name: "DOT区间五" },
              { value: 26, name: "DOT区间六" },
              { value: 22, name: "DOT区间七" },
              { value: 18, name: "DOT区间八" },
            ],
          },
        ],
      });
    },
    initSmallChartBox1() {
      const that = this;
      const charts = echarts.init(
        document.getElementById("smallChartBox1"),
        "macarons"
      );
      charts.setOption({
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "按省区分布",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {},
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "浙江省" },
              { value: 735, name: "江苏省" },
              { value: 580, name: "海南省" },
              { value: 484, name: "安徽省" },
              { value: 300, name: "山东省" },
            ],
          },
        ],
      });
    },
    initSmallChartBox2() {
      const that = this;
      const charts = echarts.init(
        document.getElementById("smallChartBox2"),
        "macarons"
      );
      charts.setOption({
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "按年龄分布",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {},
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "0-20岁" },
              { value: 735, name: "20-30岁" },
              { value: 580, name: "30-45岁" },
              { value: 484, name: "45-56岁" },
              { value: 300, name: "56-80岁" },
            ],
          },
        ],
      });
    },
    initCharts2() {
      const that = this;
      const charts2 = echarts.init(
        document.getElementById("chartBox2"),
        "macarons"
      );
      charts2.setOption({
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "按适应症分布",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 30, name: "不可切除或转移性黑色素瘤" },
              { value: 20, name: "复发/转移性鼻咽癌" },
              { value: 40, name: "晚期或转移性尿路上皮癌" },
              { value: 10, name: "可切除或转移性黑色素瘤" },
            ],
          },
        ],
      });
    },
    initSmallChartBox3() {
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
          borderColor: "#3A4154",
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
          formatter: function (params) {
            return `${params.name}${params.value} <br/> 占比%`;
          },
        },
        color: ["#7B79FF", "#FFB0E2", "#59CFFF"],
        series: [
          {
            name: "入厕人数",
            type: "pie",
            clockWise: true, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: ["70%", "71%"],
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
                borderColor: "#7B79FF",
                shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
              },
            },
            data: [
              {
                value: 7,
                name: "入厕人数",
              },
              {
                value: 3,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "就餐人数",
            type: "pie",
            clockWise: true,
            hoverAnimation: false,
            radius: ["60%", "61%"],
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
                borderColor: "#FFB0E2",
                shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
              },
            },
            data: [
              {
                value: 6,
                name: "就餐人数",
              },
              {
                value: 4,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "购物人数",
            type: "pie",
            clockWise: true,
            hoverAnimation: false,
            radius: ["50%", "51%"],
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
                borderColor: "#59CFFF",
                shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
              },
            },
            data: [
              {
                value: 5,
                name: "购物人数",
              },
              {
                value: 5,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
        ],
      };
      const that = this;
      const charts = echarts.init(
        document.getElementById("smallChartBox3"),
        "macarons"
      );
      charts.setOption(option);
    },
    initSmallChartBox4() {
      const that = this;
      const charts = echarts.init(
        document.getElementById("smallChartBox4"),
        "macarons"
      );
      charts.setOption({
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "按BMI分布",
            type: "pie",
            radius: "70%",
            data: [
              { value: 1048, name: "BMI区间一" },
              { value: 735, name: "BMI区间二" },
              { value: 580, name: "BMI区间三" },
              { value: 484, name: "BMI区间四" },
              { value: 300, name: "BMI区间五" },
            ],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        ],
      });
    },
  },
};
</script>
    
<style lang="scss" scoped>
.body {
  width: 100%;
  min-height: 100vh;
  background: rgba(235, 238, 242, 1);
  padding: 29px;
}

.formCard {
  margin: 0px 24px 25px -10px;
  width: 1655px;
  height: 196px;
}
.container {
  display: flex;
  margin: 0px 24px 25px -10px;
  width: 1655px;
  .chartBox {
    width: 844px;
    height: 360px;
    padding-bottom: 20px;
    background-color: #fff;
    .chartTitle {
      background: #fff;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
      vertical-align: top;
      padding-left: 16px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .mapBox {
      padding: 10px;
      height: calc(100% - 40px);
      background: #fff;
    }
    .syzBox {
      display: flex;
      justify-content: space-between;
      padding: 20px 50px 20px 30px;
      .percentageBox {
        font-size: 14px;
        width: 346px;
        margin-top: 20px;
        .syzTitle {
          margin-top: 20px;
        }
      }
    }
  }
  .chartContent1,
  .chartContent2 {
    width: 383px;
    height: 360px;
    background: #fff;
    margin-left: 20px;
    .smallChartTitle {
      background: #fff;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
      vertical-align: top;
      padding-left: 16px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
  }
}
</style>
<style lang="scss">
.formCard {
  .cardBody {
    height: 196px;
  }
}
</style>