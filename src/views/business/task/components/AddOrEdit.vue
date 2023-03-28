<template>
  <div>
    <el-dialog
      width="800px"
      :title="!formData.id ? '新增' : '編輯'"
      :visible.sync="visible"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        ref="vForm"
        :key="formData.id"
        :model="formData"
        :rules="rules"
        label-position="left"
        label-width="100px"
        size="medium"
        @submit.native.prevent
      >
        <el-form-item label="任务名称" prop="name" class="required">
          <el-input v-model="formData.name" type="text" clearable />
        </el-form-item>
        <el-form-item label="任务描述" prop="description">
          <el-input v-model="formData.description" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="商务" prop="salesmanId">
          <el-select v-model="formData.salesmanId" class="full-width-input" clearable filterable @change="changeSalesman">
            <el-option
              v-for="(item, index) in salesmanIdOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="药房" prop="shopId">
          <el-select v-model="formData.shopId" class="full-width-input" clearable filterable @change="changeShop">
            <el-option
              v-for="(item, index) in shopIdsOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="药房定位" prop="shopAxis">
          <el-input v-model="formData.shopAxis" type="text" clearable readonly="" />
        </el-form-item>
        <el-form-item label="合规检查" prop="checkData">
          <el-select v-model="formData.checkData" class="full-width-input" clearable filterable multiple>
            <el-option
              v-for="(item, index) in checkDataOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任务时间" prop="dateTime" class="required">
          <el-date-picker
            v-model="formData.dateTime"
            type="daterange"
            is-range
            class="full-width-input"
            format="yyyy-MM-dd"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始时间"
            end-placeholder="截至日期"
            clearable
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { save, find } from '@/api/task'
import * as salesman from '@/api/salesman'
import * as taskCheck from '@/api/taskCheck'
export default {
  name: 'AddOrEdit',
  data() {
    return {
      visible: false,
      formData: {
        name: '',
        description: '',
        shopAxis: '',
        dateTime: null,
        salesmanId: '',
        shopId: '',
        checkData: [],
        cycle: 0,
        cycleDay: ''
      },
      params: {
        page: 1,
        pageSize: 10000
      },
      rules: {
        dateTime: [{
          required: true,
          message: '字段值不可为空'
        }],
        name: [{
          required: true,
          message: '字段值不可为空'
        }]
      },
      salesmanIdOptions: [],
      shopIdsOptions: [],
      checkDataOptions: []
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
  },
  methods: {
    showEdit(row) {
      if (row) {
        this.detail(row.id)
      } else {
        this.formData = this.$options.data().formData
      }
      this.init()
      this.visible = true
    },
    cancel() {
      this.visible = false
    },
    init() {
      this.salesmanIdOptions = []
      this.shopIdsOptions = []
      this.checkDataOptions = []
      this.getSalesmanList()
      this.getTaskCheckList()
    },
    async detail(id) {
      const res = await find({ id })
      const { checkIds, description, name, salesmanId, shopId, startDate, endDate, shopAxis } = res.data
      // checkData =
      // console.log(checkData)
      this.formData = Object.assign({}, {
        name,
        description,
        shopAxis,
        salesmanId,
        shopId,
        checkData: checkIds,
        id,
        dateTime: [startDate, endDate]
      })
      this.getShopList(salesmanId)
    },
    changeSalesman(id) {
      this.formData.shopId = ''
      this.getShopList(id)
    },
    changeShop(id) {
      const selectedShop = this.shopIdsOptions.filter(v => v.value == id)
      this.formData.shopAxis = selectedShop[0].axis
    },
    async getShopList(salesmanId) {
      const res = await salesman.authorized({ salesmanId })
      this.shopIdsOptions = res.data.map(v => {
        return {
          value: v.id,
          axis: v.axis,
          label: v.name
        }
      })
    },
    async getSalesmanList() {
      const res = await salesman.grid(this.params)
      this.salesmanIdOptions = res.data.data.map(v => {
        return {
          value: v.id,
          label: v.name
        }
      })
    },
    async getTaskCheckList() {
      const res = await taskCheck.grid(this.params)
      console.log(res)
      this.checkDataOptions = res.data.data.filter(v => v.inUse).map(v => {
        return {
          value: v.id,
          label: v.name
        }
      })
      console.log(this.checkDataOptions)
    },
    submitData() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) return
        const { checkData, dateTime } = this.formData
        const checkDataList = this.checkDataOptions.filter(v => { return checkData.includes(v.value) }).map(v => {
          return {
            'checkId': v.value,
            'checkName': v.label
          }
        })

        const submitData = {
          ...this.formData,
          checks: checkDataList,
          startDate: dateTime[0],
          endDate: dateTime[1]
        }
        console.log(submitData)
        save(submitData).then(res => {
          if (res.code === 0) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.visible = false
            this.$emit('tableCall')
          }
        })
      })
    }
  }
}
</script>

<style  scoped>
.el-select {
  width: 100%;
}
.full-width-input {
    width: 100% !important;
  }

.el-form-item--medium .el-form-item__content {
  margin-right: 20px !important
}

.el-form-item {
  margin-right: 20px !important
}

.el-cascader--medium {
  width: 100%;
}
</style>
