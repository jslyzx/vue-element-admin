<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "270px",
    },
    medicine1Data: {
      type: Array,
      default: [],
    },
    medicine2Data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        title: {
          text: "销售额（万元）",
          textStyle: {
            color: "rgba(166, 166, 166, 1)",
          },
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
        grid: {
          x: 50,
          y: 60,
          x2: 10,
          y2: 35
        }
      });
    },
  },
};
</script>
