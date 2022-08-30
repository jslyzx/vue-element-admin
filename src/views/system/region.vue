<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column
        prop="name"
        label="区域名称"
        width="180"
      />
      <el-table-column
        label="操作"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small">新建子节点</el-button>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchAreaList } from '@/api/system'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchAreaList()
  },
  methods: {
    async fetchAreaList() {
      const res = await fetchAreaList()
      this.tableData = res.data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
