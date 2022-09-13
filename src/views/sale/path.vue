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
    <div class="chartBox">
      <div style="height: 100%">
        <div class="chartTitle">患者分布热点图</div>
        <div class="mapBox">
          <div id="mapChart" class="chart-part" style="height: 100%" />
        </div>
      </div>
      <div class="chartDisplay">
        <el-card>
          <div class="inBox">
            <div>
              <el-table
                :data="hospitalSales"
                style="width: 100%"
                :header-cell-style="{ background: 'rgba(245, 247, 250, 1)' }"
              >
                <el-table-column
                  prop="hosptailName"
                  show-overflow-tooltip
                  label="医院名称"
                >
                  <template slot-scope="scope">
                    <a
                      @click="queryOfficeSales(scope.row)"
                      style="color: blue; cursor: pointer"
                      >{{ scope.row.hosptailName }}</a
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  width="130"
                  prop="currSaleNum"
                  label="销售数量(盒)"
                >
                </el-table-column>
                <el-table-column
                  width="130"
                  prop="currSalePrice"
                  label="销售金额(元)"
                >
                </el-table-column>
                <el-table-column
                  width="100"
                  prop="monthGrowthRate"
                  label="环比"
                >
                  <template scope="scope">
                    {{ scope.row.monthGrowthRate }}
                  </template>
                </el-table-column>
                <el-table-column width="100" prop="yearGrowthRate" label="同比">
                  <template scope="scope">
                    {{ scope.row.yearGrowthRate }}
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                align="right"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="ruleForm.page"
                :page-size="ruleForm.pageNum"
                layout="total, sizes, prev, pager, next"
                :total="total"
                :page-sizes="pageSizes"
                style="margin-top: 12px"
              >
              </el-pagination>
            </div>
          </div>
        </el-card>
        <el-card class="mr20">
          <div class="inBox">
            <div class="topBox">
              <img
                class="hospitalImg"
                src="../../assets/index_img/hospitalIcon.png"
              />
              <div>{{ officeSalesName }}流向数据</div>
            </div>
            <div>
              <el-table
                :data="hospitalOfficeSales"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <el-table-column prop="officeName" label="科室名称">
                </el-table-column>
                <el-table-column prop="currSaleNum" label="销售数量(盒)">
                </el-table-column>
                <el-table-column prop="currSalePrice" label="销售金额(元)">
                </el-table-column>
                <el-table-column prop="monthGrowthRate" label="环比">
                </el-table-column>
                <el-table-column prop="yearGrowthRate" label="同比">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
  
  <script>
import {
  queryCustomerHotInfo,
  queryHospitalSales,
  queryHospitalOfficeSales,
} from "@/api/salesFlow";
import echarts from "echarts";
import saleForm from "@/components/saleForm";
import _ from "lodash";
let BMap = {};
let map = {};
let heatmapOverlay = {};
export default {
  name: "SalePath",
  components: {
    saleForm,
  },
  data() {
    return {
      ruleForm: {
        queryType: 1,
        page: 1,
        pageNum: 5
      },
      pageSizes: [5,10,15],
      utilsShow: 1,
      options: [],
      hospitalOfficeSales: [],
      officeSalesName: "",
      hospitalSales: [],
      total: 0,
      flag: true,
    };
  },
  created() {
    this.getHearMap();
    this.queryHospitalSales(this.ruleForm);
  },
  methods: {
    changeForm(form) {
      this.getHearMap();
      this.queryHospitalSales(form);
    },
    changeTime(form) {
      this.getHearMap();
      this.queryHospitalSales(form);
    },
    // 热力图
    getHearMap() {
      queryCustomerHotInfo({
        queryType: this.ruleForm.queryType,
      }).then((res) => {
        if (res.code == 0) {
          res.data.forEach((item) => {
            item.count = item.customerNum;
          });
          this.options = res.data;
          this.dealHearMap();
        }
      });
    },
    dealHearMap() {
      BMap = window.BMap;
      map = new BMap.Map("mapChart");
      heatmapOverlay = new BMapLib.HeatmapOverlay({
        radius: 20,
        minOpacity: 0.2,
      });
      var point = new BMap.Point(119.208435, 32.02404);
      map.centerAndZoom(point, 8); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(); // 允许滚轮缩放
      map.setMapStyle({
        styleJson: [
          {
            featureType: "road",
            elementType: "all",
            stylers: {
              color: "#ffffff",
              visibility: "off",
            },
          },
        ],
      });
      heatmapOverlay = new BMapLib.HeatmapOverlay({
        radius: 20,
        minOpacity: 0.2,
      });
      map.addOverlay(heatmapOverlay);
      var maxNum = _.max(
        this.options.map(function (v) {
          return v.customerNum;
        })
      );
      heatmapOverlay.setDataSet({ data: this.options, max: maxNum });
    },
    // 点击查科室
    queryOfficeSales(row) {
      this.officeSalesName = row.hosptailName;
      queryHospitalOfficeSales({
        queryType: 1,
        hospitalId: row.hospitalId,
      }).then((res) => {
        if (res.code == 0) {
          this.hospitalOfficeSales = res.data.hospitalOfficeSales;
        }
      });
    },
    // 医院流向数据
    queryHospitalSales(form) {
      queryHospitalSales(form).then((res) => {
        if (res.code == 0) {
          this.total = res.data.count;
          this.hospitalSales = res.data.data;
          if (this.flag) {
            this.queryOfficeSales(res.data.data[0]);
            this.officeSalesName = res.data.data[0].hosptailName;
            this.flag = false;
          }
        }
      });
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.ruleForm.pageNum = val;
      this.queryHospitalSales(this.ruleForm);
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.ruleForm.page = val;
      this.queryHospitalSales(this.ruleForm);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return "white-row";
      } else {
        return "gray-row";
      }
    },
  },
};
</script>
  
  <style lang="scss" scoped>

.chartBox {
  margin-top: 16px;
  height: 317px;
  background-color: #fff;
  .chartTitle {
    background: #fff;
    line-height: 40px;
    font-size: 16px;
    vertical-align: top;
    font-weight: 700;
    padding-left: 16px;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }
  .mapBox {
    padding: 10px;
    height: calc(100% - 40px);
    background: #fff;
  }

  .chartDisplay {
    margin-top: 16px;
    display: flex;
    flex-flow: row wrap;
    ::v-deep .el-card__body {
      padding: 0px !important;
    }
    margin-bottom: 10px;
    .inBox {
      width: 832px;
      height: 330px;
      padding: 16px;
      .topBox {
        display: flex;
        line-height: 28px;
        color: rgba(0, 0, 0, 1);
      }
      .hospitalImg {
        width: 22.74px;
        height: 17.48px;
        position: relative;
        top: 5px;
        margin-right: 12px;
      }
    }
    .mr20 {
      margin-left: 20px;
    }
  }
}
</style>
<style lang="scss">
.el-table .white-row {
  background: #fff;
}
.el-table .gray-row {
  background: rgba(245, 247, 250, 1);
}
</style>