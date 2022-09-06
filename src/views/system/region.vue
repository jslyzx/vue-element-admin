<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all :tree-props="{ children: 'children' }">
      <el-table-column prop="name" label="区域名称" width="180" />
      <el-table-column prop="name" label="区域类型" width="180">
        <template slot-scope="{row}">
          <span>{{ row.category | transCat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260">
        <template slot-scope="scope">
          <el-button v-loading="loading" type="primary" size="small" @click="addNode(scope)" v-if="scope.row.category !== 3">新建子节点</el-button>
          <el-button v-loading="loading" type="primary" size="small" @click="editNode(scope)">编辑</el-button>
          <el-button v-loading="loading" type="danger" size="small" v-if="scope.row.category !== 0" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑节点':'新建子节点'">
      <el-form ref="nodeForm" :model="nodeForm" label-width="80px" label-position="left" :rules="rules1" v-if="isProvince">
        <el-form-item label="选择省份" prop="prov">
          <el-select v-model="nodeForm.divisionId" placeholder="请选择" required @change="handleSelectChange">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form ref="nodeForm" :model="nodeForm" label-width="80px" label-position="left" :rules="rules2" v-else>
        <el-form-item label="节点名称" prop="name">
          <el-input v-model="nodeForm.name" placeholder="节点名称" required />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmNode">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchAreaList, saveRegion, fetchProvList, deleteRegion } from '@/api/system'
import _ from 'lodash'

const defaultForm = {
  name: '',
  id: undefined,
  pId: undefined,
  createBy: '',
  divisionId: ''
}

export default {
  data() {
    return {
      loading: false,
      nodeForm: Object.assign({}, defaultForm),
      tableData: [],
      dialogType: 'new',
      dialogVisible: false,
      rules1: {
        name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }]
      },
      rules2: {
        prov: [{ required: true, message: '请选择省份', trigger: 'change' }]
      },
      isProvince: false,
      options: []
    }
  },
  filters: {
    transCat(value) {
      let realVal = "";
      if (value === 0) {
        realVal = '国区'
      } else if (value === 1) {
        realVal = '大区'
      } else if (value === 2) {
        realVal = '片区'
      } else {
        realVal = '省区'
      }
      return realVal
    }
  },
  created() {
    this.fetchAreaList()
    this.fetchProvList()
  },
  methods: {
    async fetchProvList() {
      const res = await fetchProvList()
      this.options = res.data
    },
    async fetchAreaList() {
      const res = await fetchAreaList()
      this.tableData = res.data
    },
    confirmNode() {
      var that = this
      console.log(this.nodeForm)
      this.$refs.nodeForm.validate(valid => {
        if (valid) {
          this.loading = true
          if(this.isProvince){
            var selected = _.filter(this.options,function(v){return v.id == that.nodeForm.divisionId})
            this.nodeForm.name = selected[0].name
          }
          saveRegion(this.nodeForm)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '编辑节点成功',
                type: 'success',
                duration: 5000
              })
              this.loading = false
              this.dialogVisible = false
              this.fetchAreaList()
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          deleteRegion({id: row.id})
          .then(() => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 5000
            })
            this.fetchAreaList()
          })
          .catch(() => {
          })
        })
        .catch(err => { console.error(err) })
    },
    addNode(node) {
      this.isProvince = node.row.category === 2
      this.nodeForm = Object.assign({}, defaultForm, { pId: node.row.id })
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    editNode(node) {
      this.nodeForm = {
        name: node.row.name,
        id: node.row.id,
        createBy: node.row.createBy,
        category: node.row.category
      }
      
      this.isProvince = node.row.category === 3
      if(this.isProvince){
        var selected = _.filter(this.options,function(v){return v.name == node.row.name})
        this.nodeForm.divisionId = selected[0].id
      }
      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    handleSelectChange(){
      this.$forceUpdate()
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
