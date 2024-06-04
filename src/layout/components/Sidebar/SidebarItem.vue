<template>
  <div class="sidebar">
    <el-menu :default-active="activeMenu" text-color="rgb(191, 203, 217)" class="el-menu-vertical">
      <template v-for="menu in menuData">
        <template v-if="menu.children && menu.children.length > 0">
          <el-submenu :index="menu.id.toString()">
            <template slot="title">{{ menu.name }}</template>
            <sidebar-item class="nest-menu" :menu-data="menu.children"></sidebar-item>
          </el-submenu>
        </template>
        <template v-else>
          <!-- 使用 router-link 实现路由跳转 -->
          <router-link :to="menu.url">
            <el-menu-item class="submenu-title-noDropdown" :index="menu.url">{{
              menu.name
            }}</el-menu-item>
          </router-link>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    menuData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeMenu: "", // 当前激活的菜单项
    };
  },
  computed: {
    // 当前路由路径
    currentPath() {
      return this.$route.path;
    },
  },
  watch: {
    currentPath(newVal) {
      this.activeMenu = newVal; // 监听当前路径变化，设置激活的菜单项
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100%;
  background: rgb(48, 65, 86);
}

.el-menu-vertical {
  border-right: none;
  background: rgb(48, 65, 86);
}
</style>
