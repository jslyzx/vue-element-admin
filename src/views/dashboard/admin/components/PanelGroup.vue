<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="indexRow">
          <img class="indexMg" src="../../../../assets/index_img/year1.png">
          <div>
            <span>{{ data1.name }} </span>
            <i class="el-icon-warning" />
          </div>
          <div class="tabSta">
            <el-tabs v-model="activeName1" @tab-click="handleClick">
              <el-tab-pane label="全部" name="first1" />
              <el-tab-pane label="规格一" name="second1" />
              <el-tab-pane label="规格二" name="third1" />
            </el-tabs>
          </div>
        </div>
        <div class="card-panel-description">
          <count-to
            :start-val="0"
            :end-val="data1.num"
            :duration="2600"
            :color="data1.color"
            class="card-panel-num"
          />
        </div>
        <div class="ratioRow">
          <div>
            同比：<span class="yearOnYear">{{ data1.yearOnYear }}</span>
            <i v-if="data1.yearOnYearType == 2" style="color: rgba(160, 250, 197, 1);" class="el-icon-caret-bottom" />
            <i v-if="data1.yearOnYearType == 1" style="color: red;" class="el-icon-caret-top" />
          </div>
          <div>
            环比：<span class="ringRatio">{{ data1.ringRatio }}</span>
            <i v-if="data1.ringRatioType == 2" style="color: rgba(160, 250, 197, 1);" class="el-icon-caret-bottom" />
            <i v-if="data1.ringRatioType == 1" style="color: red;" class="el-icon-caret-top" />
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="indexRow">
          <img class="indexMg" src="../../../../assets/index_img/year2.png">
          <div>
            <span>{{ data2.name }} </span>
            <i class="el-icon-warning" />
          </div>
          <div class="tabSta">
            <el-tabs v-model="activeName2" @tab-click="handleClick">
              <el-tab-pane label="全部" name="first2" />
              <el-tab-pane label="规格一" name="second2" />
              <el-tab-pane label="规格二" name="third2" />
            </el-tabs>
          </div>
        </div>
        <div class="card-panel-description">
          <count-to
            :start-val="0"
            :end-val="data2.num"
            :duration="2600"
            :color="data2.color"
            class="card-panel-num"
          />
        </div>
        <div class="ratioRow">
          <div>
            同比：<span class="yearOnYear">{{ data2.yearOnYear }}</span>
            <i v-if="data2.yearOnYearType == 2" style="color: rgba(160, 250, 197, 1);" class="el-icon-caret-bottom" />
            <i v-if="data2.yearOnYearType == 1" style="color: red;" class="el-icon-caret-top" />
          </div>
          <div>
            环比：<span class="ringRatio">{{ data2.ringRatio }}</span>
            <i v-if="data2.ringRatioType == 2" style="color: rgba(160, 250, 197, 1);" class="el-icon-caret-bottom" />
            <i v-if="data2.ringRatioType == 1" style="color: red;" class="el-icon-caret-top" />
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="indexRow">
          <img class="indexMg" src="../../../../assets/index_img/year3.png">
          <div>
            <span>{{ data3.name }} </span>
            <i class="el-icon-warning" />
          </div>
          <div class="tabSta">
            <el-tabs v-model="activeName3" @tab-click="handleClick">
              <el-tab-pane label="全部" name="first3" />
              <el-tab-pane label="规格一" name="second3" />
              <el-tab-pane label="规格二" name="third3" />
            </el-tabs>
          </div>
        </div>
        <div class="card-panel-description">
          <count-to
            :start-val="0"
            :end-val="data3.num"
            :duration="2600"
            :color="data3.color"
            class="card-panel-num"
          />
        </div>
        <div class="ratioRow">
          <div>
            同比：<span class="yearOnYear">{{ data3.yearOnYear }}</span>
            <i v-if="data3.yearOnYearType == 2" style="color: rgba(160, 250, 197, 1);" class="el-icon-caret-bottom" />
            <i v-if="data3.yearOnYearType == 1" style="color: red;" class="el-icon-caret-top" />
          </div>
          <div>
            环比：<span class="ringRatio">{{ data3.ringRatio }}</span>
            <i v-if="data3.ringRatioType == 2" style="color: rgba(160, 250, 197, 1);" class="el-icon-caret-bottom" />
            <i v-if="data3.ringRatioType == 1" style="color: red;" class="el-icon-caret-top" />
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="indexRow">
          <img class="indexMg" src="../../../../assets/index_img/year4.png">
          <div>
            <span>{{ data4.name }} </span>
            <i class="el-icon-warning" />
          </div>
          <div class="tabSta">
            <el-tabs v-model="activeName4" @tab-click="handleClick">
              <el-tab-pane label="全部" name="first4" />
              <el-tab-pane label="规格一" name="second4" />
              <el-tab-pane label="规格二" name="third4" />
            </el-tabs>
          </div>
        </div>
        <div class="card-panel-description">
          <count-to
            :start-val="0"
            :end-val="data4.num"
            :duration="2600"
            :color="data4.color"
            class="card-panel-num"
          />
        </div>
        <div class="ratioRow">
          <div>
            同比：<span class="yearOnYear">{{ data4.yearOnYear }}</span>
            <i v-if="data4.yearOnYearType == 2" style="color: rgba(160, 250, 197, 1);" class="el-icon-caret-bottom" />
            <i v-if="data4.yearOnYearType == 1" style="color: red;" class="el-icon-caret-top" />
          </div>
          <div>
            环比：<span class="ringRatio">{{ data4.ringRatio }}</span>
            <i v-if="data4.ringRatioType == 2" style="color: rgba(160, 250, 197, 1);" class="el-icon-caret-bottom" />
            <i v-if="data4.ringRatioType == 1" style="color: red;" class="el-icon-caret-top" />
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      activeName1: 'first1',
      activeName2: 'first2',
      activeName3: 'first3',
      activeName4: 'first4',
      data1: {
        name: '本年销售额',
        yearOnYear: '67.66%',
        ringRatio: '-15.89%',
        yearOnYearType: 2,
        ringRatioType: 1,
        num: 1438900,
        img: '../../../../assets/index_img/year1.png',
        color: 'rgba(255, 141, 26, 1)'
      },
      data2: {
        name: '本年销量',
        yearOnYear: '67.66%',
        ringRatio: '-15.89%',
        yearOnYearType: 1,
        ringRatioType: 2,
        num: 998,
        img: '../../../../assets/index_img/year2.png',
        color: 'rgba(42, 130, 228, 1)'
      },
      data3: {
        name: '年度DOT',
        yearOnYear: '67.66%',
        ringRatio: '-15.89%',
        yearOnYearType: 2,
        ringRatioType: 1,
        num: 62754,
        img: '../../../../assets/index_img/year3.png',
        color: 'rgba(0, 186, 173, 1)'
      },
      data4: {
        name: '本年患者数',
        yearOnYear: '67.66%',
        ringRatio: '-15.89%',
        yearOnYearType: 1,
        ringRatioType: 2,
        num: 138,
        img: '../../../../assets/index_img/year4.png',
        color: 'rgba(240, 96, 96, 1)'
      },
      relituData: [
        {
          customerNum: 241,
          monthDate: '1',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 1,
          monthDate: '1',
          provinceId: 340000,
          provinceName: '安徽省'
        },
        {
          customerNum: 19,
          monthDate: '2',
          provinceId: 340000,
          provinceName: '安徽省'
        },
        {
          customerNum: 196,
          monthDate: '2',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 257,
          monthDate: '3',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 3,
          monthDate: '3',
          provinceId: 340000,
          provinceName: '安徽省'
        },
        {
          customerNum: 288,
          monthDate: '4',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 3,
          monthDate: '4',
          provinceId: 340000,
          provinceName: '安徽省'
        },
        {
          customerNum: 3,
          monthDate: '5',
          provinceId: 340000,
          provinceName: '安徽省'
        },
        {
          customerNum: 308,
          monthDate: '5',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 305,
          monthDate: '6',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 4,
          monthDate: '6',
          provinceId: 340000,
          provinceName: '安徽省'
        },
        {
          customerNum: 291,
          monthDate: '7',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 2,
          monthDate: '7',
          provinceId: 340000,
          provinceName: '安徽省'
        },
        {
          customerNum: 1,
          monthDate: '8',
          provinceId: 340000,
          provinceName: '安徽省'
        },
        {
          customerNum: 272,
          monthDate: '8',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 291,
          monthDate: '9',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 217,
          monthDate: '10',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 238,
          monthDate: '11',
          provinceId: 320000,
          provinceName: '江苏省'
        },
        {
          customerNum: 197,
          monthDate: '12',
          provinceId: 320000,
          provinceName: '江苏省'
        }
      ]
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .indexMg {
    height: 25px;
    margin-right: 10px;
    position: relative;
    top: -1px;
  }
  .indexRow {
    display: flex;
    padding: 10px 10px 0px 10px;
    line-height: 20px;
    font-size: 15px;
    border-bottom: 1px solid rgba(216, 220, 229, 1);
  }
  .ratioRow {
    display: flex;
    justify-content: space-between;
    padding: 0 13px;
    color: rgba(166, 166, 166, 1);
    font-size: 14px;
    .yearOnYear,
    .ringRatio {
      font-style: 16px;
      margin: 0 8px;
      color: rgba(89, 89, 89, 1);
    }
  }
  .el-icon-warning {
    font-size: 14px;
    margin-left: 5px;
  }
  .el-icon-warning:hover {
    color: #36a3f7;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      font-weight: bold;
      margin: 10px 13px;
      color: rgba(255, 141, 26, 1);

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 17px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
<style lang="scss">
.tabSta {
  position: absolute;
  right: 5px;
  top: -4px;
  .el-tabs__item {
    padding: 0 10px;
    font-size: 12px;
  }
  .el-tabs__nav-wrap.is-scrollable {
    padding: 0 2px;
  }
}
</style>
