<template>
  <div class="body">
    <div class="formCard">
      <sale-form
        :rule-form="ruleForm"
        :utilsShow="utilsShow"
        @changeForm="changeForm"
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
                :data="
                  hospitalSales.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                  )
                "
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
                  label="销售数量"
                >
                </el-table-column>
                <el-table-column
                  width="130"
                  prop="currSalePrice"
                  label="销售金额"
                >
                </el-table-column>
                <el-table-column
                  width="100"
                  prop="monthGrowthRate"
                  label="环比"
                >
                  <template scope="scope">
                    {{ scope.row.monthGrowthRate }}%
                  </template>
                </el-table-column>
                <el-table-column width="100" prop="yearGrowthRate" label="同比">
                  <template scope="scope">
                    {{ scope.row.yearGrowthRate }}%
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                align="right"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next"
                :total="hospitalSales.length"
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
              <div>江苏省人民医院流向数据</div>
            </div>
            <div>
              <el-table
                :data="hospitalOfficeSales"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <el-table-column prop="officeName" label="科室名称">
                </el-table-column>
                <el-table-column prop="currSaleNum" label="销售数量">
                </el-table-column>
                <el-table-column prop="currSalePrice" label="销售金额">
                </el-table-column>
                <el-table-column prop="monthGrowthRate" label="环比">
                </el-table-column>
                <el-table-column prop="yearGrowthRate" label="同比">
                </el-table-column>
              </el-table>
              <!-- <el-pagination
                align="right"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next"
                :total="hospitalOfficeSales.length"
                style="margin-top: 12px"
              >
              </el-pagination> -->
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
        queryType: 1
      },
      utilsShow: 1,
      options: [],
      hospitalOfficeSales: [
        {
          num: "2",
          name: "德益康",
          price: "12345",
        },
        {
          num: "4",
          name: "德益康",
          price: "12345",
        },
        {
          num: "1",
          name: "德益康",
          price: "12345",
        },
        {
          num: "3",
          name: "德益康",
          price: "12345",
        },
        {
          num: "3",
          name: "德益康",
          price: "12345",
        },
        {
          num: "3",
          name: "德益康",
          price: "12345",
        },
        {
          num: "3",
          name: "德益康",
          price: "12345",
        },
        {
          num: "3",
          name: "德益康",
          price: "12345",
        },
      ],
      dateActive: 1,
      hospitalSales: [],
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 5, // 每页的数据条数
    };
  },
  created() {
    this.getHearMap();
    this.queryHospitalSales();
  },
  methods: {
    changeForm(form) {
      this.queryHospitalSales(form);
    },
    // 热力图
    getHearMap() {
      queryCustomerHotInfo({
        queryType: this.dateActive,
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
          this.hospitalSales = res.data.data;
        }
      });
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

.chartBox {
  margin: 0px 24px 25px -10px;
  width: 1656px;
  height: 317px;
  padding-bottom: 20px;
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
    margin-top: 32px;
    display: flex;
    flex-flow: row wrap;
    ::v-deep .el-card__body {
      padding: 0px !important;
    }
    margin-bottom: 10px;
    .inBox {
      width: 816px;
      height: 341px;
      padding: 16px;
      overflow-y: scroll;
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
.formCard {
  .cardBody {
    height: 196px;
  }
}

.el-table .white-row {
  background: #fff;
}
.el-table .gray-row {
  background: rgba(245, 247, 250, 1);
}
</style>