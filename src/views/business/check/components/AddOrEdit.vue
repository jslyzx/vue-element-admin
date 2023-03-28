<template>
  <div>
    <el-dialog width="800px" :title="!formData.id ? '新增' : '編輯'" :visible.sync="visible" :before-close="cancel"
      :close-on-click-modal="false">
      <el-form ref="vForm" :model="formData" :rules="rules" label-position="left" label-width="100px" size="medium"
        @submit.native.prevent>
        <el-form-item label="检查项名称" prop="name" class="required">
          <el-input v-model="formData.name" type="text" clearable />
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
import { save, find } from '@/api/taskCheck'
export default {
  name: 'AddOrEdit',
  data() {
    return {
      visible: false,
      formData: {
        name: '',
        inUse: 1
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
    showEdit(row) {
      if (row) {
        this.formData = Object.assign({}, row)
      } else {
        this.formData = this.$options.data().formData
      }
      this.visible = true
    },
    cancel() {
      this.visible = false
    },
    submitData() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) return
        const { name, id } = this.formData
        const submitData = {
          name, id
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
