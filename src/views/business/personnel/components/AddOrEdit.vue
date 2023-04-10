<template>
  <div>
    <el-dialog
      width="800px"
      :title="!formData.id ? '新增' : '编辑'"
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
        <el-form-item label="大区/片区/省" prop="address">
          <el-cascader
            ref="addressCascader"
            :key="formData.id"
            v-model="formData.address"
            clearable
            placeholder="请选择大区/片区/省"
            :props="addressProps"
          />
        </el-form-item>
        <el-row>
          <el-col :span="12" class="grid-cell">
            <el-form-item label="姓名" prop="name" class="required">
              <el-input v-model="formData.name" type="text" class="full-width-input" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12" class="grid-cell">
            <el-form-item label="手机号" prop="phone" class="required">
              <el-input v-model="formData.phone" class="full-width-input" type="text" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="grid-cell">
            <el-form-item label="性别" prop="gender" class="required">
              <el-radio-group v-model="formData.gender">
                <el-radio
                  v-for="(item, index) in genderOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  style="display: inline"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="授权门店" prop="shopIds">
          <el-select v-model="formData.shopIds" class="full-width-input" clearable filterable multiple remote>
            <el-option
              v-for="(item, index) in shopIdsOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
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
import { fetchAreaSubList, fetchShopList } from '@/api/system'
import { save, find } from '@/api/salesman'
export default {
  name: 'AddOrEdit',
  data() {
    return {
      visible: false,
      formData: {
        name: '',
        phone: '',
        gender: 2
      },

      addressOptions: [],
      addressProps: {
        expandTrigger: 'hover',
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      rules: {
        regionId: [{
          required: true,
          message: '字段值不可为空'
        }],
        sectionId: [{
          required: true,
          message: '字段值不可为空'
        }],
        provinceId: [{
          required: true,
          message: '字段值不可为空'
        }],
        name: [{
          required: true,
          message: '字段值不可为空'
        }],
        phone: [{
          required: true,
          message: '字段值不可为空'
        }, {
          pattern: /^[1][3-9][0-9]{9}$/,
          trigger: ['blur', 'change'],
          message: '手机号不正确'
        }],
        gender: [{
          required: true,
          message: '字段值不可为空'
        }]
      },
      genderOptions: [{
        'label': '男',
        'value': '男'
      }, {
        'label': '女',
        'value': '女'
      }],
      shopIdsOptions: []
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    // this.getRegionList
  },
  methods: {
    showEdit(row) {
      if (row) {
        console.log(row)
        this.detail(row.id)
      }
      this.getShopList()
      this.visible = true
    },
    lazyLoad(node, resolve) {
      const level = node.level
      let pId
      if (level === 0) {
        pId = '91498336854474752'
      } else {
        pId = node.value
      }
      fetchAreaSubList({ pId: pId }).then(res => {
        const list = res.data.map(v => {
          return {
            value: v.id,
            label: v.name,
            leaf: level >= 2
          }
        })
        resolve(list)
      })
    },
    async getShopList(pId) {
      const res = await fetchShopList({ page: 1, pageSize: 1000 })
      this.shopIdsOptions = res.data.data.map(v => {
        return {
          value: v.id,
          label: v.name
        }
      })
    },
    async detail(id) {
      const res = await find({ id })
      const { name, gender, phone, shopIds, regionId, sectionId, provinceId } = res.data
      const address = [regionId, sectionId, provinceId]
      this.formData = Object.assign({}, { name, gender, shopIds, phone, address, id })
      this.visible = true
    },
    cancel() {
      this.visible = false
    },
    submitData() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) return
        const { name, gender, phone, address, shopIds, id } = this.formData
        const submitData = {
          name, gender, phone, id,
          regionId: address[0],
          sectionId: address[1],
          provinceId: address[2],
          shopIds: shopIds
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
