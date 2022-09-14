<template>
  <div class="body">
    <div class="formCard">
      <sale-form
        :rule-form="ruleForm"
        :utilsShow="utilsShow"
        @changeForm="changeForm"
        @queryProvinceSalePrice="changeTime"
      />
    </div>
    <div class="container">
      <div class="chartBox">
        <div class="chartTitle">按DOT分布(人)</div>
        <div class="mapBox">
          <div id="chartBox1" style="height: 288px" />
        </div>
      </div>
      <div class="chartContent1">
        <div class="smallChartTitle">按省区分布(人)</div>
        <div id="smallChartBox1" style="height: 100%; width: 100%; padding: 10px;" />
      </div>
      <div class="chartContent2">
        <div class="smallChartTitle">按年龄分布(人)</div>
        <div id="smallChartBox2" style="height: 100%; width: 100%; padding: 10px;" />
      </div>
    </div>
    <div class="container">
      <div class="chartBox">
        <div class="chartTitle">按适应症分布(人)</div>
        <div class="mapBox syzBox">
          <div id="chartBox2" style="height: 288px; width: 100%; padding: 10px;" />
        </div>
      </div>
      <div class="chartContent1">
        <div class="smallChartTitle">按性别分布(人)</div>
        <div id="smallChartBox3" style="height: 100%; width: 100%; padding: 10px;" />
      </div>
      <div class="chartContent2">
        <div class="smallChartTitle">按BMI分布(人)</div>
        <div id="smallChartBox4" style="height: 100%; width: 100%; padding: 10px;" />
      </div>
    </div>
  </div>
</template>
<script>
import { getPatientStructure } from "@/api/system";
import saleForm from "@/components/saleForm";
import echarts from "echarts";
import _ from "lodash";
require("echarts/theme/macarons");

export default {
  name: "PatientStructure",
  components: {
    saleForm,
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
        sex: "",
        age: "",
        indication: "",
      },
      utilsShow: 2,
      dotRange: [],
      locationRange: [],
      ageRange: [],
      diseaseRange: [],
      genderRange: [],
      bmiRange: [],
    };
  },
  created() {
    this.changeForm(this.ruleForm);
  },
  methods: {
    changeForm(form) {
      this.getPatientStructure(form);
    },
    changeTime(form) {
      this.getPatientStructure(form);
    },
    async getPatientStructure(form) {
      const res = await getPatientStructure(form);
      this.dotRange = res.data.dotRange;
      this.locationRange = res.data.locationRange;
      this.ageRange = res.data.ageRange;
      this.diseaseRange = res.data.diseaseRange;
      this.genderRange = res.data.genderRange;
      this.bmiRange = res.data.bmiRange;
    },
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
          bottom: 0,
        },
        series: [
          {
            label: {
              show: true,
              position: "inside",
              formatter: function (arg) {
                return arg.value;
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            name: "按DOT分布",
            type: "pie",
            radius: [50, 100],
            center: ["50%", "50%"],
            top: -45,
            itemStyle: {
              borderRadius: 12,
            },
            data: this.dotRange,
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
        legend: {
          orient: "horizontal",
          icon: "circle",
          data: _.map(this.locationRange, function (v) {
            return v.name;
          }),
          bottom: 60,
          textStyle: {
            color: "#999999",
            fontSize: 12,
            align: "left",
            // 文字块背景色，一定要加上，否则对齐不会生效
            backgroundColor: "transparent",
            rich: {
              b: {
                width: 200,
              },
            },
          },
        },
        series: [
          {
            label: {
              show: true,
              position: "inside",
              formatter: function (arg) {
                return arg.value;
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            type: "pie",
            top: -125,
            radius: ["20%", "40%"],
            avoidLabelOverlap: false,
            data: this.locationRange,
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
        legend: {
          orient: "horizontal",
          icon: "circle",
          data: _.map(this.ageRange, function (v) {
            return v.name;
          }),
          bottom: 60,
          textStyle: {
            color: "#999999",
            fontSize: 12,
            align: "left",
            // 文字块背景色，一定要加上，否则对齐不会生效
            backgroundColor: "transparent",
            rich: {
              b: {
                width: 200,
              },
            },
          },
        },
        series: [
          {
            name: "按年龄分布",
            type: "pie",
            top: -125,
            radius: ["20%", "40%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "inside",
              formatter: function (arg) {
                return arg.value;
              },
            },
            data: this.ageRange,
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
        legend: {
          bottom: 0,
        },
        series: [
          {
            name: "按适应症分布",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "inside",
              formatter: function (arg) {
                return arg.value;
              },
            },
            labelLine: {
              show: false,
            },
            data: this.diseaseRange,
          },
        ],
      });
    },
    initSmallChartBox3() {
      var BorderWidth = "6";
      var total = _.sum(
        _.map(this.genderRange, function (v) {
          return v.value;
        })
      );
      var maleNum = _.filter(this.genderRange, function (v) {
        return v.name === "男";
      })[0].value;
      var femaleNum = _.filter(this.genderRange, function (v) {
        return v.name === "女";
      })[0].value;
      var unknownNum = _.filter(this.genderRange, function (v) {
        return v.name === "未知";
      })[0].value;
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
          borderWidth: 6,
        },
        emphasis: {
          color: "transparent",
          borderColor: "transparent",
          borderWidth: 0,
        },
      };
      const option = {
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            var percent = ((params.value / total) * 100).toFixed(1);
            return `${params.name}${params.value} <br/> 占比${percent}%`;
          },
        },
        color: ["#7B79FF", "#FFB0E2", "#59CFFF"],
        legend: {
          bottom: 50,
          orient: "vertical",
        },
        series: [
          {
            name: "男",
            type: "pie",
            top: -90,
            clockWise: true, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: ["50%", "51%"],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  formatter: function (arg) {
                    return arg.value;
                  },
                },
                borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: "#7B79FF",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
            },
            data: [
              {
                value: maleNum,
                name: "男",
              },
              {
                value: total - maleNum,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "女",
            top: -90,
            type: "pie",
            clockWise: true,
            hoverAnimation: false,
            radius: ["40%", "41%"],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  formatter: function (arg) {
                    return arg.value;
                  },
                },
                borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: "#FFB0E2",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
            },
            data: [
              {
                value: femaleNum,
                name: "女",
              },
              {
                value: total - femaleNum,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "不详",
            type: "pie",
            top: -90,
            clockWise: true,
            hoverAnimation: false,
            radius: ["30%", "31%"],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  formatter: function (arg) {
                    return arg.value;
                  },
                },
                borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: "#59CFFF",
                shadowColor: "rgba(0, 0, 0, 0)",
              },
            },
            data: [
              {
                value: unknownNum,
                name: "不详",
              },
              {
                value: total - unknownNum,
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
        legend: {
          orient: "horizontal",
          icon: "circle",
          data: _.map(this.bmiRange, function (v) {
            return v.name;
          }),
          bottom: 50,
          textStyle: {
            color: "#999999",
            fontSize: 12,
            align: "left",
            // 文字块背景色，一定要加上，否则对齐不会生效
            backgroundColor: "transparent",
            rich: {
              b: {
                width: 200,
              },
            },
          },
        },
        series: [
          {
            name: "按BMI分布",
            type: "pie",
            top: -95,
            radius: "50%",
            data: this.bmiRange,
            label: {
              show: true,
              position: "inside",
              formatter: function (arg) {
                return arg.value;
              },
            },
          },
        ],
      });
    },
  },
  watch: {
    dotRange() {
      this.initCharts1();
    },
    locationRange() {
      this.initSmallChartBox1();
    },
    ageRange() {
      this.initSmallChartBox2();
    },
    diseaseRange() {
      this.initCharts2();
    },
    genderRange() {
      this.initSmallChartBox3();
    },
    bmiRange() {
      this.initSmallChartBox4();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  margin-top: 20px;

  .chartBox {
    flex: 1;
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
    flex: 1;
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