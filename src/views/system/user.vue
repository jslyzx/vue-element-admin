<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd">新增用户</el-button>

    <el-table :data="usersList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="用户编码" width="220">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getUsers" />

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'新增角色'">
      <el-form :model="user" ref="dataForm" label-width="80px" :rules="rules" label-position="left">
        <el-form-item label="用户编码">
          <el-input v-model="user.username" placeholder="用户编码" />
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="user.nickname" placeholder="用户名称" />
        </el-form-item>
        <el-form-item label="大区" prop="regionId">
          <el-select v-model="user.regionId" placeholder="大区" clearable style="width: 280px" @change="_onSelectRegion">
            <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="片区" prop="sectionId">
          <el-select v-model="user.sectionId" placeholder="片区" clearable style="width: 280px" @change="_onSelectSection">
            <el-option v-for="item in sectionList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="省区" prop="provinceId">
          <el-select v-model="user.provinceId" placeholder="省区" clearable style="width: 280px">
            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmUser">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, deleteUser, saveUser } from '@/api/user'
import { fetchAreaSubList } from '@/api/system'
import Pagination from '@/components/Pagination'

const defaultUser = {
  username: '',
  nickname: '',
  regionId: '',
  sectionId: '',
  provinceId: ''
}

export default {
  components: { Pagination },
  data() {
    return {
      user: Object.assign({}, defaultUser),
      usersList: [],
      dialogVisible: false,
      dialogType: 'new',
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      regionList: [],
      sectionList: [],
      provinceList: [],
      rules: {
        username: [{ required: true, message: '必填', trigger: 'blur' }],
        nickname: [{ required: true, message: '必填', trigger: 'blur' }],
        regionId: [{ required: true, message: '必填', trigger: 'change' }],
        sectionId: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getUsers()
    this.getRegionList()
  },
  methods: {
    async getSectionList(pId) {
      const res = await fetchAreaSubList({ pId: pId })
      this.sectionList= res.data
    },
    _onSelectRegion() {
      this.getSectionList(this.user.regionId + '')
    },
    _onSelectSection() {
      this.getProvinceList(this.user.sectionId + '')
    },
    async getRegionList() {
      const res = await fetchAreaSubList({ pId: '91498336854474752' })
      this.regionList = res.data
    },
    async getUsers() {
      const res = await getUsers(this.listQuery)
      this.usersList = res.data.data
      this.total = res.data.total
    },
    async getProvinceList(pId) {
      const res = await fetchAreaSubList({ pId: pId })
      this.provinceList = res.data
    },
    handleAdd() {
      this.user = Object.assign({}, defaultUser)
      this.dialogType = 'new'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleEdit(scope) {
      this.user = scope.row
      this.user.regionId = this.user.regionId || ''
      this.user.sectionId = this.user.sectionId || ''
      this.user.provinceId = this.user.provinceId || ''
      if(this.user.regionId){
        this.getSectionList(this.user.regionId)
      }
      if(this.user.sectionId){
        this.getProvinceList(this.user.sectionId)
      }
      this.dialogType = 'edit'
      this.dialogVisible = true
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
        .then(async() => {
          deleteUser({id: row.id})
          .then(() => {
            this.$notify({
              title: '成功',
              message: '删除用户成功',
              type: 'success',
              duration: 5000
            })
            this.getUsers()
          })
          .catch(() => {
          })
        })
        .catch(err => { console.error(err) })
    },
    confirmUser() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          saveUser(this.user).then(() => {
            this.$notify({
                title: '成功',
                message: '维护用户信息成功',
                type: 'success',
                duration: 5000
              })
              this.getUsers()
          })
        }
      })
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
