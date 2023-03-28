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
        <el-form-item label="评估方案" prop="name" class="required">
          <el-input v-model="formData.name" type="text" clearable />
        </el-form-item>

        <el-table
          ref="multipleTable"
          :data="evalData"
          style="width: 100%"
          row-key="code"
          border
          lazy
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @select="handleSelection"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="name"
            label="评估指标"
            width="180"
          />
          <el-table-column
            prop="upLimit"
            label="上限"
            width="180"
          >
            <template slot-scope="scope">
              <span v-if="multipleSelection.includes(scope.row)">
                <el-input v-model="scope.row.upLimit" maxlength="300" placeholder="请输入" size="mini" />
              </span>
              <span v-else>{{ scope.row.upLimit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="weight"
            label="权重"
          >
            <template slot-scope="scope">
              <span v-if="multipleSelection.includes(scope.row)">
                <el-input v-model="scope.row.weight" maxlength="300" placeholder="请输入" size="mini" />
              </span>
              <span v-else>{{ scope.row.weight }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="cycle"
            label="周期"
          >
            <template slot-scope="scope">
              <span v-if="multipleSelection.includes(scope.row)&&(scope.row.cycle!=null)">

                <el-select v-model="scope.row.cycle" class="full-width-input" clearable size="mini">
                  <el-option
                    v-for="(item, index) in cycleOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </span>
              <span v-else>{{ scope.row.cycle }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { save, find } from '@/api/eval'
import evalDataJSON from '../eval.json'
export default {
  name: 'AddOrEdit',
  data() {
    return {
      evalData: [],
      visible: false,
      cycleOptions: [{
        label: '年',
        value: 'year'
      }, {
        label: '月',
        value: 'month'
      }],
      multipleSelection: [],
      formData: {
        id: '',
        name: ''
      },
      rules: {
        name: [{
          required: true,
          message: '字段值不可为空'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    // this.getRegionList
  },
  methods: {
    handleSelection(selection, row) {
      this.multipleSelection = selection
      row.enable = true
    },
    showEdit(row) {
      if (row) {
        this.detail(row.id)
      } else {
        this.formData = this.$options.data().formData
        this.evalData = JSON.parse(JSON.stringify(evalDataJSON))
      }
      this.visible = true
    },
    async detail(id) {
      const that = this
      const res = await find({ id })
      const { name, scheme } = res.data
      this.formData = { name, id }
      this.evalData = JSON.parse(scheme)
      this.multipleSelection = this.develop(this.evalData).filter(v => v.enable)
      console.log(this.evalData)
      this.$nextTick(() => {
        this.multipleSelection.forEach(v => {
          console.log(v)
          that.$refs.multipleTable.toggleRowSelection(v, true)
        })
      })
    },
    develop(arr) {
      const that = this
      return arr.reduce((t, v) => {
        t.push(v)
        if (v?.children?.length) t.push(...that.develop(v.children))
        return t
      }, [])
    },
    cancel() {
      this.visible = false
    },
    submitData() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) return
        const { name, id } = this.formData
        const submitData = {
          name, id,
          scheme: this.evalData
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
