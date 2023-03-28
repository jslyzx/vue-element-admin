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
        :model="formData"
        :rules="rules"
        label-position="left"
        label-width="100px"
        size="medium"
        @submit.native.prevent
      >
        <el-form-item label="计划名称" prop="name" class="required">
          <el-input v-model="formData.name" type="text" clearable />
        </el-form-item>
        <el-form-item label="计划描述" prop="description">
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
        <el-form-item label="药房" prop="shopIds">
          <el-select v-model="formData.shopIds" class="full-width-input" clearable filterable multiple>
            <el-option
              v-for="(item, index) in shopIdsOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
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
        <el-row>
          <el-col :span="12" class="grid-cell">
            <el-form-item label="计划周期" prop="cycle">
              <el-select v-model="formData.cycle" class="full-width-input" clearable @change="formData.cycleDay=''">
                <el-option
                  v-for="(item, index) in cycleOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="grid-cell">
            <el-form-item v-if="formData.cycle==0" label="周期日" prop="cycleDay">
              <el-date-picker
                v-model="formData.cycleDay"
                value-format="yyyy-MM-dd"
                align="right"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" class="grid-cell">
            <el-form-item v-if="formData.cycle==1" label="周期日" prop="cycleDay">
              <el-select v-model="formData.cycleDay" class="full-width-input" clearable>
                <el-option
                  v-for="(item, index) in monthOptions"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="grid-cell">
            <el-form-item v-if="formData.cycle==2" label="周期日" prop="cycleDay">
              <el-select v-model="formData.cycleDay" class="full-width-input" clearable>
                <el-option
                  v-for="(item, index) in weekOptions"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { save, find } from '@/api/taskPlan'
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
        salesmanId: '',
        shopIds: [],
        checkData: [],
        cycle: 0,
        cycleDay: ''
      },
      params: {
        page: 1,
        pageSize: 10000
      },
      rules: {
        name: [{
          required: true,
          message: '字段值不可为空'
        }]
      },
      salesmanIdOptions: [],
      shopIdsOptions: [],
      checkDataOptions: [],
      monthOptions: [],
      weekOptions: ['一', '二', '三', '四', '五', '六', '日'],
      cycleOptions: [{
        'label': '每月',
        'value': 1
      }, {
        'label': '每周',
        'value': 2
      }, {
        'label': '每天',
        'value': 3
      }, {
        'value': 0,
        'label': '每年'
      }]
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    // this.getRegionList
    for (let i = 1; i < 29; i++) {
      this.monthOptions.push(i)
    }
    this.monthOptions.push('最后一天')
  },
  methods: {
    showEdit(row) {
      if (row) {
        // this.formData = Object.assign({}, row)
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
      this.salesmanIdOptions = [],
      this.shopIdsOptions = [],
      this.checkDataOptions = [],
      this.getSalesmanList()
      this.getTaskCheckList()
    },
    async detail(id) {
      const res = await find({ id })
      const { cycle, cycleDay, description, name, salesmanId } = res.data
      let { checkData, shopIds } = res.data
      shopIds = shopIds.split(',')
      checkData = JSON.parse(checkData).map(v => String(v.checkId))
      console.log(checkData)
      this.formData = Object.assign({}, {
        name,
        description,
        salesmanId,
        shopIds,
        checkData,
        cycle,
        cycleDay,
        id
      })
      this.getShopList(salesmanId)
    },
    changeSalesman(id) {
      this.formData.shopIds = []
      this.getShopList(id)
    },
    async getShopList(salesmanId) {
      const res = await salesman.authorized({ salesmanId })
      this.shopIdsOptions = res.data.map(v => {
        return {
          value: v.id,
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
        const { checkData } = this.formData
        console.log(checkData)
        const checkDataList = this.checkDataOptions.filter(v => { return checkData.includes(v.value) }).map(v => {
          return {
            'checkId': v.value,
            'checkName': v.label
          }
        })
        console.log(checkData)
        const submitData = {
          ...this.formData,
          checkData: checkDataList
        }
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
