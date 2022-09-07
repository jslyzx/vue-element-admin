<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd">新增业务员</el-button>

    <el-table :data="salesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="220">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" width="220">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getSales" />

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑业务员':'新增业务员'">
      <el-form :model="sale" label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="sale.name" placeholder="名称" />
        </el-form-item>
        <el-form-item label="gender">
          <el-input v-model="sale.gender" placeholder="性别" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="sale.phone" placeholder="电话" />
        </el-form-item>
        <el-form-item label="所属大区">
          <el-select v-model="sale.regionId" filterable placeholder="请选择" @change="onSelectRegion">
            <el-option
              v-for="item in regionList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属片区">
          <el-select v-model="sale.sectionId" filterable placeholder="请选择" @change="onSelectSection">
            <el-option
              v-for="item in sectionList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属省份">
          <el-select v-model="sale.provinceId" filterable placeholder="请选择">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSale">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchSaleList, fetchAreaSubList, saveSale, deleteSale } from '@/api/system'
import Pagination from '@/components/Pagination'

const defaultSale = {
  id: '',
  name: '',
  gender: '',
  phone: '',
  regionId: '',
  sectionId: '',
  provinceId: ''
}

export default {
  components: { Pagination },
  data() {
    return {
      sale: Object.assign({}, defaultSale),
      salesList: [],
      dialogVisible: false,
      dialogType: 'new',
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      regionList: [],
      sectionList: [],
      provinceList: []
    }
  },
  created() {
    this.getSales()
    this.getRegionList()
  },
  methods: {
    async getSales() {
      const res = await fetchSaleList(this.listQuery)
      this.salesList = res.data.data
    },
    async getRegionList() {
      const res = await fetchAreaSubList({pId: 1})
      this.regionList = res.data
    },
    async getSectionList(pId) {
      const res = await fetchAreaSubList({pId: pId})
      this.sectionList = res.data
    },
    async getProvinceList(pId) {
      const res = await fetchAreaSubList({pId: pId})
      this.provinceList = res.data
    },
    handleAdd() {
      this.sale = Object.assign({}, defaultSale)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.sale = scope.row
      this.dialogType = 'edit'
      if(scope.row.regionId){
        this.getSectionList(scope.row.regionId)
      }
      if(scope.row.sectionId){
        this.getProvinceList(scope.row.sectionId)
      }
      this.dialogVisible = true
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          deleteSale({id: row.id})
          .then(() => {
            this.$notify({
              title: '成功',
              message: '删除业务员成功',
              type: 'success',
              duration: 5000
            })
            this.getSales()
          })
          .catch(() => {
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmSale() {
      saveSale(this.sale)
      .then(() => {
        this.$notify({
          title: '成功',
          message: '维护业务员信息成功',
          type: 'success',
          duration: 5000
        })
        this.dialogVisible = false
        this.getSales()
      })
      .catch(() => {
      })
    },
    onSelectRegion(){
      this.getSectionList(this.sale.regionId)
    },
    onSelectSection(){
      this.getProvinceList(this.sale.sectionId)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
}
</style>
