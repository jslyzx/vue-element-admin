<template>
  <div>
    <el-dialog
      width="1000px"
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
        label-width="140px"
        size="medium"
        @submit.native.prevent
      >
        <el-form-item label="大区/片区/省/市" prop="range">
          <el-cascader
            ref="range"
            :key="formData.id"
            v-model="formData.range"
            clearable
            placeholder="请选择大区/片区/省/市"
            :props="addressProps"
          />
        </el-form-item>
        <el-row>
          <el-col :span="12" class="grid-cell">
            <el-form-item label="门店名称" prop="name" class="required">
              <el-input v-model="formData.name" type="text" clearable />
            </el-form-item>
            <el-form-item label="门店店长" prop="manager">
              <el-input v-model="formData.manager" type="text" clearable />
            </el-form-item>
            <el-form-item label="执业药师人数" prop="lpNum">
              <el-input v-model="formData.lpNum" type="text" clearable />
            </el-form-item>
            <el-form-item label="商业位置" prop="commerceAddress">
              <el-input v-model="formData.commerceAddress" type="text" clearable />
            </el-form-item>
            <el-form-item label="功能区域" prop="functionalArea">
              <el-input v-model="formData.functionalArea" type="text" clearable />
            </el-form-item>
            <el-form-item label="经营面积（m2）" prop="operatingArea">
              <el-input v-model="formData.operatingArea" type="text" clearable />
            </el-form-item>
            <el-form-item label="城市坐标" prop="cityAxis">
              <el-input v-model="formData.cityAxis" type="text" clearable />
            </el-form-item>
            <el-form-item label="是否DTP药房" prop="isDtp">
              <el-radio-group v-model="formData.isDtp">
                <el-radio
                  v-for="(item, index) in isDtpOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  style="{display: inline}"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否门特药房" prop="isMt">
              <el-radio-group v-model="formData.isMt">
                <el-radio
                  v-for="(item, index) in isMtOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  style="{display: inline}"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="grid-cell">
            <el-form-item label="门店地址" prop="address">
              <el-input v-model="formData.address" type="text" clearable />
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="formData.phone" type="text" clearable />
            </el-form-item>
            <el-form-item label="在岗人员数" prop="employeeNum">
              <el-input v-model="formData.employeeNum" type="text" clearable />
            </el-form-item>
            <el-form-item label="附近三甲医院数量" prop="hospitalNumNearby">
              <el-input v-model="formData.hospitalNumNearby" type="text" clearable />
            </el-form-item>
            <el-form-item label="冷链设备数" prop="coldChainNum">
              <el-input v-model="formData.coldChainNum" type="text" clearable />
            </el-form-item>
            <el-form-item label="经验范围" prop="businessScope">
              <el-input v-model="formData.businessScope" type="text" clearable />
            </el-form-item>
            <el-form-item label="门店坐标" prop="axis">
              <el-input v-model="formData.axis" type="text" clearable />
            </el-form-item>
            <el-form-item label="是否门慢药房" prop="isMm">
              <el-radio-group v-model="formData.isMm">
                <el-radio
                  v-for="(item, index) in isMmOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  style="{display: inline}"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否双通道药房" prop="isStd">
              <el-radio-group v-model="formData.isStd">
                <el-radio
                  v-for="(item, index) in isStdOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  style="{display: inline}"
                >{{ item.label }}</el-radio>
              </el-radio-group>
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
import { save, find } from '@/api/shop'
import { fetchAreaSubList, fetchCityList } from '@/api/system'
export default {
  name: 'AddOrEdit',
  data() {
    return {
      visible: false,
      addressOptions: [],
      addressProps: {
        expandTrigger: 'hover',
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      formData: {
        range: '',
        name: '',
        manager: '',
        lpNum: '',
        commerceAddress: '',
        functionalArea: '',
        operatingArea: '',
        cityAxis: '',
        isDtp: '',
        isMt: '',
        address: '',
        phone: '',
        employeeNum: '',
        hospitalNumNearby: '',
        coldChainNum: '',
        businessScope: '',
        axis: '',
        isMm: '',
        isStd: ''
      },
      rules: {
        name: [{
          required: true,
          message: '字段值不可为空'
        }],
        lpNum: [{
          pattern: /^\d+(\.\d+)?$/,
          trigger: ['blur', 'change'],
          message: '请填写数字'
        }],
        operatingArea: [{
          pattern: /^\d+(\.\d+)?$/,
          trigger: ['blur', 'change'],
          message: '请填写数字'
        }],
        employeeNum: [{
          pattern: /^\d+(\.\d+)?$/,
          trigger: ['blur', 'change'],
          message: '请填写数字'
        }],
        coldChainNum: [{
          pattern: /^\d+(\.\d+)?$/,
          trigger: ['blur', 'change'],
          message: '请填写数字'
        }],
        hospitalNumNearby: [{
          pattern: /^\d+(\.\d+)?$/,
          trigger: ['blur', 'change'],
          message: '请填写数字'
        }]
      },
      isDtpOptions: [{
        'value': 0,
        'label': '否'
      }, {
        'value': 1,
        'label': '是'
      }],
      isMtOptions: [{
        'value': 0,
        'label': '否'
      }, {
        'value': 1,
        'label': '是'
      }],
      isMmOptions: [{
        'value': 0,
        'label': '否'
      }, {
        'value': 1,
        'label': '是'
      }],
      isStdOptions: [{
        'value': 0,
        'label': '否'
      }, {
        'value': 1,
        'label': '是'
      }]
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    // this.getRegionList
  },
  methods: {
    lazyLoad(node, resolve) {
      const level = node.level
      console.log(level)
      let pId
      if (level === 0) {
        pId = '91498336854474752'
      } else {
        pId = node.value
      }
      if (level === 3) {
        fetchCityList({ pId: pId }).then(res => {
          const list = res.data.map(v => {
            return {
              value: v.id,
              label: v.name,
              leaf: true
            }
          })
          resolve(list)
        })
      } else {
        fetchAreaSubList({ pId: pId }).then(res => {
          const list = res.data.map(v => {
            return {
              value: level === 2 ? v.divisionId : v.id,
              label: v.name,
              leaf: level >= 3
            }
          })
          resolve(list)
        })
      }
    },
    showEdit(row) {
      if (row) {
        this.detail(row.id)
      } else {
        this.formData = this.$options.data().formData
      }
      this.visible = true
    },
    async detail(id) {
      const res = await find({ id })
      const { regionId, sectionId, provinceId, cityId, provinceCode } = res.data
      const range = [regionId, sectionId, provinceCode || provinceId, cityId]
      this.formData = Object.assign({}, { ...res.data, range })
    },
    cancel() {
      this.visible = false
    },
    submitData() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) return
        const { range, id } = this.formData
        const submitData = {
          ...this.formData,
          id,
          regionId: range[0],
          sectionId: range[1],
          provinceId: range[2],
          cityId: range[3]
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
