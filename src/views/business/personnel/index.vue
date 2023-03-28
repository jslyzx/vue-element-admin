<!-- title:人员管理 -->
<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true">
      <div style="float: right">
        <el-form-item>
          <el-button v-repeat type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-input v-model="keyword" placeholder="姓名" clearable @keyup.enter.native="queryData" />
        <!-- clearable：是否可清空    @keyup.enter.native 回车触发 -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="queryReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- tbale主体 -->
    <el-table
      v-loading="loading"
      :data="pageList"
      :height="HEiGHT"
      :border="true"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- selection-change	当选择项发生变化时会触发该事件 -->
      <el-table-column type="selection" min-width="5" align="center" />
      <el-table-column prop="name" label="姓名" width="120" min-width="10">
        <template slot-scope="scope">
          <span class="detail" @click="goDetail(scope.row)">{{ scope.row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180" min-width="10" />
      <el-table-column prop="gender" label="性别" width="180" min-width="10" />
      <el-table-column prop="createTime" label="创建时间" width="180" min-width="10" />
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="hdelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination
      v-show="pagination.total > 0"
      :total="pagination.total"
      :page.sync="pagination.page"
      :limit.sync="pagination.pageSize"
      @pagination="changePagination"
    />
    <add-or-edit ref="edit" @tableCall="queryData" />
  </div>
</template>

<script>
// import MoreSearch from './components/MoreSearch'
import AddOrEdit from './components/AddOrEdit'
import { grid, cancel } from '@/api/salesman'
// import { list } from '@/api/test' // 引入请求

export default {
  name: 'BusinessPersonnel',
  components: { AddOrEdit },
  data() {
    return {
      // 遮罩层
      loading: true,
      keyword: '',
      // 分页
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0
      },
      moreParams: {},
      // table主数据
      pageList: []
    }
  },
  async created() {
    this.queryData()
  },
  methods: {
    queryReset() {
      this.keyword = ''
      this.moreParams = this.$options.data().moreParams
      this.queryData()
    },
    changePagination(value) {
      const { page, limit } = value
      this.pagination.page = page
      this.pagination.pageSize = limit
      this.queryData()
    },
    queryData() {
      this.loading = true
      const {
        keyword,
        pagination: { page, pageSize }
      } = this
      grid({
        page,
        pageSize,
        keyword,
        ...this.moreParams
      }).then(response => {
        const obj = response.data
        const { data, total } = obj
        this.pageList = data
        this.pagination.total = total
        this.loading = false
      })
    },
    add() {
      this.$refs['edit'].showEdit()
    },
    edit(row) {
      this.$refs['edit'].showEdit(row)
    },
    hdelete(row) {
      console.log(row)
      this.$confirm('确定删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          cancel({ id: row.id }).then(res => {
            this.$message.success('删除成功！')
            this.queryReset()
          })
        })
        .catch(() => {

        })
    },
    goDetail(row) {
      this.$router.push({
        name: 'BusinessPersonnelDetail',
        params: {
          id: row.id
        }
      })
    }
  }
}
</script>

<style scoped>
.detail{
  color: aquamarine;
}
.detail:hover{
  cursor: pointer;
}
</style>
