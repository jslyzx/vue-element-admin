<template>
  <div>
    <el-dialog width="800px" :title="!formData.id ? '新增' : '编辑'" :visible.sync="visible" :before-close="cancel" :close-on-click-modal="false">
      <el-form ref="vForm" :model="formData" :rules="rules" label-position="left" label-width="100px" size="medium" @submit.native.prevent>
        <el-form-item label="检查项名称" prop="name" class="required">
          <el-input v-model="formData.name" type="text" clearable />
        </el-form-item>
        <el-card class="box-card" v-for="(item, i) in formData.details">
          <!-- <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div> -->
          <i class="el-icon-circle-close" @click="removeItem(i)"></i>
          <el-form-item label="标题" :prop="'details.' + i + '.title'" class="required" :rules="{ required: true, message: '标题不能为空', trigger: 'blur' }">
            <el-input v-model="item.title" type="text" clearable />
          </el-form-item>
          <el-form-item label="类型" :prop="'details.' + i + '.type'" class="required" :rules="{ required: true, message: '类型不能为空', trigger: 'blur' }">
            <el-select v-model="item.type" class="full-width-input" clearable>
              <el-option
                v-for="(type, index) in typeOptions"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
          </el-form-item>
          <div v-if="needMore.indexOf(item.type) > -1">
            <el-divider content-position="left">选择项</el-divider>
            <el-form-item v-for="( v, t ) in item.options" :label="'选择项' + (t + 1)">
              <el-col :span="10">
                <el-input v-model="v.label" placeholder="选项名" type="text" clearable :prop="'details.' + i + '.options.' + t + '.label'" />
              </el-col>
              <el-col class="line" :span="2" style="text-align: center;">-</el-col>
              <el-col :span="10">
                <el-input v-model="v.value" placeholder="选项值" type="text" clearable :prop="'details.' + i + '.options.' + t + '.value'" />
              </el-col>
              <el-col :span="2" style="text-align: center;" v-if="t === 0">
                <i class="el-icon-circle-plus-outline" @click="addOption(i)"></i>
              </el-col>
              <el-col :span="2" style="text-align: center;" v-else>
                <i class="el-icon-remove-outline" @click="removeOption(i, t)"></i>
              </el-col>
            </el-form-item>
          </div>
          <el-form-item label="描述" :prop="'details.' + i + '.description'">
            <el-input v-model="item.description" type="textarea" rows="3" />
          </el-form-item>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addItem">新增问题</el-button>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { save, find } from '@/api/taskCheck'
import _ from 'lodash'
export default {
  name: 'AddOrEdit',
  data() {
    return {
      visible: false,
      formData: {
        name: '',
        inUse: 1,
        details: []
      },
      rules: {
        name: [{
          required: true,
          message: '字段值不可为空'
        }]
      },
      typeOptions: [{
        'label': 'input框',
        'value': 'input'
      }, {
        'label': 'textarea框',
        'value': 'textarea'
      }, {
        'label': '单选框',
        'value': 'radio'
      }, {
        'label': '多选框',
        'value': 'checkbox'
      }, {
        'label': '下拉框',
        'value': 'select'
      }, {
        'label': '上传文件',
        'value': 'file'
      }],
      tempVo: {
        id: '',
        description: '',
        options: [],
        title: '',
        type: '' //类型，值为input、textarea、radio、checkbox、select、file
      },
      needMore: ['radio', 'checkbox', 'select']
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.getRegionList
  },
  methods: {
    showEdit(row) {
      if (row) {
        this.detail(row.id)
      } else {
        this.formData = this.$options.data().formData
        this.formData.details.push(this.tempVo)
      }
      this.visible = true
    },
    cancel() {
      this.visible = false
    },
    submitData() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) return
        save(this.formData).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.visible = false
            this.$emit('tableCall')
          }
        })
      })
    },
    addItem() {
      this.formData.details.push(this.tempVo)
    },
    removeItem(i) {
      if(this.formData.details.length === 1){
        this.$message({
          message: '至少保留一个问题',
          type: 'error'
        })
        return false
      }
      this.formData.details.splice(i, 1)
    },
    async detail(id) {
      const res = await find({ id })
      const { details } = res.data
      _.each(details, function(v) {
        if(v.options){
          v.options = JSON.parse(v.options)
        }
      })
      this.formData = res.data
    },
    addOption(i) {
      this.formData.details[i].options.push({
        label: '',
        value: ''
      })
    },
    removeOption(i, t) {
      if(this.formData.details[i].options.length === 1){
        this.$message({
          message: '至少保留一个选项',
          type: 'error'
        })
        return false
      }
      this.formData.details[i].options.splice(t, 1)
    }
  }
}

</script>
<style scoped>
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

.el-card {
  margin: 20px 20px 20px 0;
  position: relative;
  overflow: visible;
}

.el-card .el-icon-circle-close {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 20px;
  color: red;
  font-weight: bold;
}

.el-form-item__error {
  position: relative;
}
</style>
