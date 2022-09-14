<template>
  <div class="body">
    <div class="formCard">
      <saleForm
        :rule-form="ruleForm"
        @changeForm="changeForm"
        @queryProvinceSalePrice="changeTime"
      />
    </div>
    <div class="chartBox">
        <el-table
          :data="saleList.slice((page - 1) * pageSize, page * pageSize)"
          style="width: 100%"
          max-height="650"
          :header-cell-style="{ background: 'rgba(245, 247, 250, 1)' }"
          border
        >
          <el-table-column label="门店名称" width="370">
            <template slot-scope="{ row }">
              <router-link
                :to="'/patient/shop/detail/' + row.id"
                class="link-type"
              >
                <span>{{ row.name }}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="provinceName" label="省区"></el-table-column>
          <el-table-column prop="sectionName" label="片区"> </el-table-column>
          <el-table-column prop="regionName" label="大区"> </el-table-column>
          <el-table-column prop="num" label="销售数量(盒)"> </el-table-column>
          <el-table-column prop="total" label="销售金额(元)"> </el-table-column>
          <el-table-column prop="mom" label="环比"> </el-table-column>
          <el-table-column prop="yoy" label="同比"> </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="page" :limit.sync="pageSize" @pagination="getList" />
      </div>
  </div>
</template>
<script>
import { queryShopSaleAnalysis } from "@/api/system"
import saleForm from "@/components/saleForm"
import Pagination from '@/components/Pagination'
export default {
  name: "ShopSale",
  components: {
    saleForm,
    Pagination
  },
  data() {
    return {
      ruleForm: {
        queryType: 1,
        year: "2022",
        startMonth: "",
        endMonth: "",
        goods: "",
        bigArea: "",
        middleArea: "",
        provienceArea: "",
        shop: "",
      },
      saleList: [],
      total: 0,
      page: 1,
      pageSize: 10
    };
  },
  created() {
    this.changeForm(this.ruleForm);
  },
  methods: {
    changeForm(form) {
      this.queryShopSaleAnalysis(form)
    },
    changeTime(form) {
      this.queryShopSaleAnalysis(form)
    },
    async queryShopSaleAnalysis(form) {
      const res = await queryShopSaleAnalysis(form)
      this.total = res.data.length
      this.saleList = res.data
    },
    getList(form) {
      console.log(form)
    }
  },
};
</script>
<style lang="scss" scoped>
.chartBox {
  margin-top: 16px;
  background-color: #fff;
  padding: 20px;
  height: calc(100% - 130px);
}
</style>
