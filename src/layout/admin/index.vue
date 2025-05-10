<script lang="ts" setup>
import Menu from './Menu.vue';
</script>

<template>
  <div class="w-100vw h-100vh flex flex-col justify-center items-center">
    <el-container class="w-full">
      <el-header class="bg-blue-500 flex justify-between items-center">
        <div>
          <h1 class="text-white">图书管理系统后台</h1>
        </div>
        <div>
          <el-button type="primary" @click="$router.push('/admin/login')">退出登录</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="bg-light-300">
            <Menu></Menu>
        </el-aside>
        <el-main class="bg-gray-100">
          <el-scrollbar> <router-view></router-view> </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
