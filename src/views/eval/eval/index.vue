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
        <el-input v-model="keyword" placeholder="评估方案" clearable @keyup.enter.native="queryData" />
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
      <el-table-column prop="name" label="评估方案" width="220" min-width="10" />
      <el-table-column prop="createTime" label="创建时间" width="180" min-width="10" />
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
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
    <add-or-edit ref="add" @tableCall="queryData" />
    <add-or-edit ref="edit" @tableCall="queryData" />
  </div>
</template>

<script>
import AddOrEdit from './components/AddOrEdit'
import { grid, enable, disable } from '@/api/eval'

export default {
  name: 'Eval',
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
        ...{ name: keyword },
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
      this.$refs['add'].showEdit()
    },
    edit(row) {
      this.$refs['edit'].showEdit(row)
    },
    changeSwitch(row) {
      if (row.inUse === 1) {
        enable(row).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.queryReset()
        })
      } else {
        disable(row).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.queryReset()
        }).catch({

        })
      }
    }
  }
}
</script>

<style  lang="scss" scoped>
@import '@/styles/switch.scss'
</style>
