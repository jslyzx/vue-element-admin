<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.regionId" placeholder="大区" clearable style="width: 200px" class="filter-item" @change="onSelectRegion">
        <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.sectionId" placeholder="片区" clearable style="width: 200px" class="filter-item" @change="onSelectSection">
        <el-option v-for="item in sectionList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.provinceId" placeholder="省份" clearable style="width: 300px" class="filter-item">
        <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加门店
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="shopList" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="门店名称" prop="name" align="center" width="300">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门店地址" prop="address" align="center" width="360">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" prop="phone" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店长" prop="manager" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.manager }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" :inline="true" label-width="100px" style=" margin-left:50px;">
        <el-form-item label="大区" prop="regionId">
          <el-select v-model="temp.regionId" prop="regionId" placeholder="大区" clearable style="width: 280px" @change="_onSelectRegion">
            <el-option v-for="item in formRegionList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="片区" prop="sectionId">
          <el-select v-model="temp.sectionId" placeholder="片区" clearable style="width: 280px" @change="_onSelectSection">
            <el-option v-for="item in formSectionList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="provinceId">
          <el-select v-model="temp.provinceId" placeholder="省份" clearable style="width: 280px" @change="_onSelectProvince">
            <el-option v-for="item in formProvinceList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="cityId">
          <el-select v-model="temp.cityId" placeholder="城市" clearable style="width: 280px">
            <el-option v-for="item in formCityList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="门店名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="门店地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="门店店长" prop="manager">
          <el-input v-model="temp.manager" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="temp.longitude" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="temp.latitude" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="saveShop">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchShopList, fetchAreaSubList, fetchProvList, fetchCityList, saveShop } from '@/api/system'
import Pagination from '@/components/Pagination'
import _ from 'lodash'

export default {
  components: { Pagination },
  data() {
    return {
      shopList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 10,
        regionId: '',
        sectionId: '',
        provinceId: ''
      },
      temp: {
        id: undefined,
        name: '',
        address: '',
        phone: '',
        manager: '',
        regionId: '', //大区
        sectionId: '', //片区
        provinceId: '', //省份
        cityId: '', //城市
        longitude: '', //经度
        latitude: '' //纬度
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {
        regionId: [{ required: true, message: '必填', trigger: 'change' }],
        sectionId: [{ required: true, message: '必填', trigger: 'change' }],
        provinceId: [{ required: true, message: '必填', trigger: 'change' }],
        cityId: [{ required: true, message: '必填', trigger: 'change' }],
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        address: [{ required: true, message: '必填', trigger: 'blur' }],
        manager: [{ required: true, message: '必填', trigger: 'blur' }],
        phone: [{ required: true, message: '必填', trigger: 'blur' }],
        longitude: [{ required: true, message: '必填', trigger: 'blur' }],
        latitude: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      regionList: [],
      sectionList: [],
      provinceList: [],
      formRegionList: [],
      formSectionList: [],
      formProvinceList: [],
      formCityList: []
    }
  },
  created() {
    this.getList()
    this.getRegionList()
  },
  methods: {
    onSelectRegion() {
      this.getSectionList(this.listQuery.regionId, 'sectionList')
    },
    onSelectSection() {
      this.getProvinceList(this.listQuery.sectionId, 'provinceList')
    },
    _onSelectRegion() {
      this.getSectionList(this.temp.regionId, 'formSectionList')
    },
    _onSelectSection() {
      this.getProvinceList(this.temp.sectionId, 'formProvinceList')
    },
    _onSelectProvince() {
      const that = this
      var list = _.filter(this.formProvinceList, function(v) {
        return v.id === that.temp.provinceId
      })
      this.getCityList(list[0].divisionId, 'formCityList')
    },
    async getList() {
      const res = await fetchShopList(this.listQuery)
      this.shopList = res.data.data
      this.listLoading = false
    },
    async getRegionList() {
      const res = await fetchAreaSubList({ pId: 1 })
      this.regionList = res.data
      this.formRegionList = res.data
    },
    async getSectionList(pId, name) {
      const res = await fetchAreaSubList({ pId: pId })
      this[name] = res.data
    },
    async getProvinceList(pId, name) {
      const res = await fetchAreaSubList({ pId: pId })
      this[name] = res.data
    },
    async getCityList(pId, name) {
      const res = await fetchCityList({ pId: pId })
      this[name] = res.data
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        address: '',
        phone: '',
        manager: '',
        regionId: '', //大区
        sectionId: '', //片区
        provinceId: '', //省份
        cityId: '', //城市
        longitude: '', //经度
        latitude: '' //纬度
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleEdit(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          deleteSale({ id: row.id })
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除门店成功',
                type: 'success',
                duration: 5000
              })
              this.getList()
            })
            .catch(() => {})
        })
        .catch(err => { console.error(err) })
    },
    saveShop() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveShop(this.temp).then(() => {
            this.$notify({
                title: '成功',
                message: '维护门店信息成功',
                type: 'success',
                duration: 5000
              })
              this.getList()
          })
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.app-container {
  .filter-item {
    margin-right: 20px;
  }

  .roles-table {
    margin-top: 30px;
  }
  .el-input{
    width: 280px;
  }
}

</style>
