<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd">新增业务员</el-button>

    <el-table :data="salesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" width="220">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getSales" />

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑业务员':'新增业务员'">
      <el-form :model="sale" label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="sale.name" placeholder="名称" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="sale.phone" placeholder="电话" />
        </el-form-item>
        <el-form-item label="所属大区">
          <el-input v-model="sale.name" placeholder="名称" />
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
import { fetchSaleList } from '@/api/system'
import Pagination from '@/components/Pagination'

const defaultSale = {
  id: '',
  name: '',
  phone: ''
}

export default {
  components: { Pagination },
  data() {
    return {
      sale: Object.assign({}, defaultSale),
      salesList: [],
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
    this.getSales()
  },
  methods: {
    async getSales() {
      const res = await fetchSaleList(this.listQuery)
      this.salesList = res.data.data
    },
    handleAdd() {
      this.sale = Object.assign({}, defaultSale)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.sale = scope.row
      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          this.$message({
            type: 'success',
            message: 'Delete succed!'
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
