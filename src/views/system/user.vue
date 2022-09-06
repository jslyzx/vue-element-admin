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
      <el-form :model="user" label-width="80px" label-position="left">
        <el-form-item label="用户编码">
          <el-input v-model="user.username" placeholder="用户编码" />
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="user.nickname" placeholder="用户名称" />
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
import { getUsers, deleteUser } from '@/api/user'
import Pagination from '@/components/Pagination'

const defaultUser = {
  username: '',
  nickname: '',
  roles: []
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
      }
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const res = await getUsers(this.listQuery)
      this.usersList = res.data.data
    },
    handleAdd() {
      this.user = Object.assign({}, defaultUser)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.user = scope.row
      this.dialogType = 'edit'
      this.dialogVisible = true
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
    async confirmUser() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {

      } else {

      }

      const { username, nickname } = this.user
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>username: ${username}</div>
            <div>nickname: ${nickname}</div>
          `,
        type: 'success'
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
