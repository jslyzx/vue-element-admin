<template>
    <div>
        <el-table :data="tableData" style="width: 100%"
            :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
            <el-table-column v-for="(item, index) in headerData" :key="item.id" :prop="item.prop" :label="item.label"
                width="180">
            </el-table-column>
        </el-table>
        <div style="display:flex;flex-flow:row-reverse wrap;margin: 10px 0 0 0;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
export default {
    name: "sTable",
    props: {
        tableData: {
            type: Array,
            default: () => [],
        },
        headerData: {
            type: Array,
            default: () => [],
        },
        currentPage: {
            type: Number,
            default: 1,
        },
        pageSizes: {
            type: Array,
            default: () => [],
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        total: {
            type: Number,
            default: 100,
        },
    },
    methods: {
        handleCurrentChange() {

        },
        handleSizeChange() {

        }
    }
}
</script>

<style lang="scss" scoped>
</style>