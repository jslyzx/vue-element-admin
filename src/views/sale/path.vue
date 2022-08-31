<template>
  <div class="body">
    <div class="formCard">
      <sale-form :rule-form="ruleForm" :utilsShow="utilsShow" />
    </div>
    <div class="chartBox">
      <div style="height: 100%">
        <div class="chartTitle">患者分布热力图</div>
        <div class="mapBox">
          <div id="map" class="chart-part" style="height: 100%" />
        </div>
      </div>
      <div class="chartDisplay">
        <el-card>
          <div class="inBox">
            <div>
              <el-table
                :data="
                  tableData.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                  )
                "
                style="width: 100%"
                :header-cell-style="{ background: 'rgba(245, 247, 250, 1)' }"
              >
                <el-table-column prop="name" label="医院名称">
                </el-table-column>
                <el-table-column prop="num" label="销售数量"> </el-table-column>
                <el-table-column prop="price" label="销售金额">
                </el-table-column>
                <el-table-column prop="price" label="环比"> </el-table-column>
                <el-table-column prop="price" label="同比"> </el-table-column>
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
                :total="tableData.length"
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
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <el-table-column prop="name" label="科室名称">
                </el-table-column>
                <el-table-column prop="num" label="销售数量"> </el-table-column>
                <el-table-column prop="price" label="销售金额">
                </el-table-column>
                <el-table-column prop="price" label="环比"> </el-table-column>
                <el-table-column prop="price" label="同比"> </el-table-column>
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
                :total="tableData.length"
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
import saleForm from "@/components/saleForm";
import _ from "lodash";
let BMap = {};
let map = {};
let heatmapOverlay = {};
export default {
  name: "Path",
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
        hospital: "",
      },
      utilsShow: 1,
      options: [
        {
          count: 134,
        },
        {
          lng: "117.1735760356",
          count: 32,
          lat: "34.2597049057",
        },
        {
          lng: "120.6338846979",
          count: 1,
          lat: "31.2746197161",
        },
        {
          lng: "120.3328896266",
          count: 9,
          lat: "31.6086091302",
        },
        {
          lng: "118.7512007783",
          count: 5,
          lat: "32.0867914530",
        },
        {
          lng: "119.9505910586",
          count: 21,
          lat: "31.7856270488",
        },
        {
          lng: "120.8568556227",
          count: 5,
          lat: "32.0244682185",
        },
        {
          lng: "120.8726688908",
          count: 42,
          lat: "32.0101819359",
        },
        {
          lng: "120.8726250780",
          count: 7,
          lat: "32.0261301477",
        },
        {
          lng: "120.8711949627",
          count: 19,
          lat: "32.0151678890",
        },
        {
          lng: "120.7552214006",
          count: 14,
          lat: "32.1084861085",
        },
        {
          lng: "120.8746653502",
          count: 2,
          lat: "32.0607906299",
        },
        {
          lng: "120.6260226246",
          count: 17,
          lat: "31.3069631346",
        },
        {
          lng: "120.6037970054",
          count: 5,
          lat: "31.2747131899",
        },
        {
          lng: "120.7326630430",
          count: 1,
          lat: "31.3344155454",
        },
        {
          lng: "120.3117990093",
          count: 2,
          lat: "31.5746282267",
        },
        {
          lng: "120.2964003072",
          count: 14,
          lat: "31.6028731388",
        },
        {
          lng: "120.2807518255",
          count: 20,
          lat: "31.9154041083",
        },
        {
          lng: "117.2028750974",
          count: 29,
          lat: "34.2790363208",
        },
        {
          lng: "117.1850852688",
          count: 62,
          lat: "34.2690328267",
        },
        {
          lng: "119.4399434703",
          count: 7,
          lat: "32.7875592722",
        },
        {
          lng: "118.8011767341",
          count: 29,
          lat: "32.0403197058",
        },
        {
          lng: "118.7832995975",
          count: 19,
          lat: "32.0773181018",
        },
        {
          lng: "119.9662940842",
          count: 78,
          lat: "31.7802386621",
        },
        {
          lng: "119.9512956886",
          count: 64,
          lat: "31.7565951399",
        },
        {
          lng: "119.9756923410",
          count: 29,
          lat: "31.7981570711",
        },
        {
          lng: "119.9703940842",
          count: 5,
          lat: "31.7794286621",
        },
        {
          lng: "120.1624821421",
          count: 1,
          lat: "32.5127508928",
        },
        {
          lng: "120.6731566048",
          count: 14,
          lat: "31.3968606941",
        },
        {
          lng: "119.3833957620",
          count: 1,
          lat: "32.1769516583",
        },
        {
          lng: "119.5730894162",
          count: 7,
          lat: "32.0007946317",
        },
        {
          lng: "118.7738578240",
          count: 107,
          lat: "32.0538699053",
        },
        {
          lng: "118.7814440148",
          count: 23,
          lat: "32.0480943146",
        },
        {
          lng: "118.7919567436",
          count: 168,
          lat: "32.0742364655",
        },
        {
          lng: "118.8138918411",
          count: 161,
          lat: "32.0467820683",
        },
        {
          lng: "118.7897266259",
          count: 2,
          lat: "32.0611620741",
        },
        {
          lng: "119.9672534443",
          count: 224,
          lat: "31.7854570297",
        },
        {
          lng: "119.0253961294",
          count: 1,
          lat: "33.6314234546",
        },
        {
          lng: "120.5904723397",
          count: 99,
          lat: "31.3022665027",
        },
        {
          lng: "119.9245343735",
          count: 1,
          lat: "32.4901981820",
        },
        {
          lng: "120.2747533704",
          count: 4,
          lat: "31.5735023182",
        },
        {
          lng: "120.6550203648",
          count: 9,
          lat: "31.1654613137",
        },
        {
          lng: "120.1259083620",
          count: 21,
          lat: "33.3893210656",
        },
        {
          lng: "119.4594542549",
          count: 62,
          lat: "32.3999936608",
        },
        {
          lng: "119.4379155733",
          count: 269,
          lat: "32.3911527622",
        },
        {
          lng: "119.4251171965",
          count: 28,
          lat: "32.3999721462",
        },
        {
          lng: "119.8254738628",
          count: 5,
          lat: "31.3667648590",
        },
        {
          lng: "119.4519445024",
          count: 11,
          lat: "32.2119068447",
        },
        {
          lng: "120.3286830789",
          count: 39,
          lat: "31.5458025532",
        },
        {
          lng: "118.7908022371",
          count: 8,
          lat: "32.0240585088",
        },
        {
          lng: "118.7759598782",
          count: 14,
          lat: "32.0944108629",
        },
        {
          lng: "118.8011767341",
          count: 11,
          lat: "32.0403197058",
        },
        {
          lng: "120.6116028870",
          count: 318,
          lat: "31.3503219426",
        },
        {
          lng: "119.4598045024",
          count: 21,
          lat: "32.2182968447",
        },
        {
          lng: "120.4657245136",
          count: 26,
          lat: "32.5482838088",
        },
        {
          lng: "120.7552214006",
          count: 35,
          lat: "32.1084861085",
        },
        {
          lng: "120.3026416422",
          count: 12,
          lat: "31.5975488534",
        },
        {
          lng: "119.7480017385",
          count: 12,
          lat: "32.2221327938",
        },
        {
          lng: "120.9165782769",
          count: 3,
          lat: "31.9444558626",
        },
        {
          lng: "120.1676485296",
          count: 6,
          lat: "33.3462783072",
        },
        {
          lng: "121.6672569389",
          count: 1,
          lat: "31.8188279070",
        },
        {
          lng: "117.2746159238",
          count: 10,
          lat: "31.8518470265",
        },
        {
          lng: "117.2972780938",
          count: 19,
          lat: "31.8635287419",
        },
        {
          lng: "117.2008478286",
          count: 12,
          lat: "34.2466644754",
        },
        {
          lng: "120.4137557858",
          count: 9,
          lat: "31.3544255910",
        },
        {
          lng: "117.2540549441",
          count: 4,
          lat: "31.8584800335",
        },
        {
          lng: "119.9505910586",
          count: 45,
          lat: "31.7856270488",
        },
        {
          lng: "120.6410150449",
          count: 786,
          lat: "31.3085366323",
        },
        {
          count: 33,
        },
        {
          count: 1,
        },
        {
          count: 9,
        },
        {
          count: 2,
        },
        {
          count: 4,
        },
        {
          count: 3,
        },
        {
          count: 2,
        },
        {
          count: 5,
        },
      ],
      tableData: [
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
      tableData: [
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
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 5, // 每页的数据条数
    };
  },
  mounted() {
    this.dealHearMap();
  },
  created() {},
  methods: {
    // 热力图
    dealHearMap() {
      BMap = window.BMap;
      map = new BMap.Map("map");
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
          return v.count;
        })
      );
      heatmapOverlay.setDataSet({ data: this.options, max: maxNum });
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