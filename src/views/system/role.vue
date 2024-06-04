<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd">新增角色</el-button>
    <el-table
      v-loading="listLoading"
      :data="roleList"
      border
      fit
      highlight-current-row
      style="width: 100%; margin-top: 30px"
    >
      <el-table-column label="角色编码" prop="code" align="center" width="300">
        <template slot-scope="{ row }">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名" prop="name" align="center" width="360">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        align="center"
        width="220"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="250"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="primary" size="mini" @click="RolePermission(row)">
            分配权限
          </el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <!-- 表单弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        :inline="true"
        label-width="100px"
        style="margin-left: 50px"
      >
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="temp.code" placeholder="请填写角色编码" />
        </el-form-item>
        <el-form-item label="角色名" prop="name">
          <el-input v-model="temp.name" placeholder="请填写角色名" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="saveRole"> 确认 </el-button>
      </div>
    </el-dialog>
    <!-- 权限弹窗 -->
    <el-dialog title="分配权限" width="800px" :visible.sync="userMenuVisible">
      <el-tree
        ref="tree"
        :props="defaultProps"
        :data="roleMenuList"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedList"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userMenuVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="saveUserMenu"> 确认 </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryRoles,
  saveRole,
  queryUserMenu,
  saveUserMenu,
} from "@/api/system";
import Pagination from "@/components/Pagination";
import _ from "lodash";
const defaultRole = {
  name: "",
  code: "",
};
export default {
  components: { Pagination },
  data() {
    return {
      role: {},
      roleList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 10,
        regionId: "",
        sectionId: "",
        provinceId: "",
      },
      temp: {
        id: undefined,
        name: "",
        code: "",
      },
      dialogFormVisible: false,
      userMenuVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加",
      },
      defaultProps: {
        children: "children",
        label: "name",
      },
      rules: {
        code: [{ required: true, message: "必填", trigger: "change" }],
        name: [{ required: true, message: "必填", trigger: "change" }],
      },
      roleMenuList: [],
      checkedList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await queryRoles(this.listQuery);
      this.roleList = res.data.data;
      this.total = res.data.total;
      this.listLoading = false;
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: "",
        address: "",
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleAdd() {
      this.role = Object.assign({}, defaultRole);
      this.dialogStatus = "new";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleEdit(row) {
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    saveRole() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          console.log(this.temp);
          saveRole(this.temp).then(() => {
            this.$notify({
              title: "成功",
              message: "维护角色信息成功",
              type: "success",
              duration: 5000,
            });
            this.getList();
          });
        }
      });
    },
    // 分配权限
    extractCheckedItems(arr) {
      let data = [];
      for (let item of arr) {
        if (item.checked) {
          data.push(item.id);
        }
        if (item.children && item.children.length > 0) {
          this.extractCheckedItems(item.children); // 递归调用
        }
      }
      return data;
    },
    saveUserMenu() {
      const checkedNodes = this.$refs.tree.getCheckedKeys();
      saveUserMenu({
        roleId: this.roleId,
        menuIds: checkedNodes,
      }).then((res) => {
        if (res.code === 0) {
          this.userMenuVisible = false;
          this.$notify({
            title: "成功",
            message: "维护角色信息成功",
            type: "success",
            duration: 5000,
          });
          this.getList();
        } else {
          this.$notify({
            title: "失败",
            message: res.msg,
            type: "warning",
            duration: 5000,
          });
        }
      });
    },
    RolePermission(row) {
      this.roleId = row.id;
      queryUserMenu({ roleId: row.id }).then((res) => {
        this.roleMenuList = res.data;
        this.checkedList = this.extractCheckedItems(res.data);
        this.userMenuVisible = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  .filter-item {
    margin-right: 20px;
  }

  .roles-table {
    margin-top: 30px;
  }
  .el-input {
    width: 280px;
  }
}
</style>
