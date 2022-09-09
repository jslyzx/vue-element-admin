<template>
  <div class="body">
    <div class="formCard">
      <saleForm :rule-form="ruleForm" @changeForm="changeForm" />
      <div class="chartBox">
        <el-table :data="saleList" style="width: 100%" max-height="650" :header-cell-style="{ background: 'rgba(245, 247, 250, 1)' }">
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
      </div>
    </div>
  </div>
</template>
<script>
import { queryShopSaleAnalysis } from '@/api/system'
import saleForm from '@/components/saleForm'
export default {
  name: 'ShopSale',
  components: {
    saleForm
  },
  data() {
    return {
      ruleForm: {
        queryType: 1,
        year: '2022',
        startMonth: '',
        endMonth: '',
        goods: '',
        bigArea: '',
        middleArea: '',
        provienceArea: '',
        shop: ''
      },
      saleList: []
    }
  },
  created(){
    this.changeForm(this.ruleForm)
  },
  methods: {
    changeForm(form) {
        this.queryShopSaleAnalysis(form)
    },
    async queryShopSaleAnalysis(form) {
      const res = await queryShopSaleAnalysis(form)
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
  height: 700px;
  background-color: #fff;
  padding: 39px 36px 34px 27px;
}

</style>
