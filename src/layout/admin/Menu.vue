<script lang="ts" setup>

</script>


<template>
  <el-menu class="h-full" default-active="1">
    <el-menu-item @click="$router.push('/admin/bookinfo')">
      <el-icon><Notebook /></el-icon>
      <span>图书信息管理</span>
    </el-menu-item>
    <el-menu-item @click="$router.push('/admin/classification')">
      <el-icon><DocumentCopy /></el-icon>
      <span>分类管理</span>
    </el-menu-item>
    <el-menu-item @click="$router.push('/admin/orderManage')">
      <el-icon><Operation /></el-icon>
      <span>订单管理</span>
    </el-menu-item>
    <el-menu-item @click="$router.push('/admin/userManage')">
      <el-icon><User /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item @click="$router.push('/admin/announcementManage')">
      <el-icon><Message /></el-icon>
      <span>系统公告管理</span>
    </el-menu-item>
  </el-menu>
</template>
