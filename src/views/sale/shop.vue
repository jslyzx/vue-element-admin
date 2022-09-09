<template>
  <div class="body">
    <div class="formCard">
      <saleForm :rule-form="ruleForm" @change="changeForm" />
      <div class="chartBox">
        <el-table :data="saleList" style="width: 100%" :header-cell-style="{ background: 'rgba(245, 247, 250, 1)' }">
          <el-table-column label="门店名称">
            <template slot-scope="{row}">
              <router-link :to="'/patient/shop/detail/' + row.id" class="link-type">
                <span>{{ row.name }}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="provinceName" label="省区"></el-table-column>
          <el-table-column prop="sectionName" label="片区"> </el-table-column>
          <el-table-column prop="regionName" label="大区"> </el-table-column>
          <el-table-column prop="num" label="销售数量"> </el-table-column>
          <el-table-column prop="total" label="销售金额"> </el-table-column>
          <el-table-column prop="mom" label="环比"> </el-table-column>
          <el-table-column prop="yoy" label="同比"> </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="ruleForm.page" :limit.sync="ruleForm.pageSize" @pagination="queryShopSaleAnalysis" />
      </div>
    </div>
  </div>
</template>
<script>
import { queryShopSaleAnalysis } from '@/api/system'
import saleForm from '@/components/saleForm'
import Pagination from '@/components/Pagination'
export default {
  name: 'ShopSale',
  components: {
    saleForm,
    Pagination
  },
  data() {
    return {
      ruleForm: {
        time: 'year',
        year: '2022',
        startMonth: '',
        endMonth: '',
        goods: '',
        bigArea: '',
        middleArea: '',
        provienceArea: '',
        shop: '',
        page: 1,
        pageSize: 10
      },
      saleList: [],
      total: 0
    }
  },
  created(){
    this.changeForm()
  },
  methods: {
    changeForm() {
        this.queryShopSaleAnalysis()
    },
    async queryShopSaleAnalysis() {
      const res = await queryShopSaleAnalysis(this.ruleForm)
      this.total = res.data.length
      this.saleList = res.data
    }
  }
}

</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100vh;
  background: rgba(235, 238, 242, 1);
  padding: 29px;
}

.formCard {
  margin: 0px 24px 25px -10px;
  width: 1655px;
  height: 143px;
}

.chartBox {
  margin: 25px 24px 25px -1px;
  width: 1655px;
  height: 811px;
  background-color: #fff;
  padding: 39px 36px 34px 27px;
}

</style>
