<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Header from './header.vue';
const router = useRouter();
router.push('/booksIndex')
</script>

<template>
  <div class="h-vh w-full bg-gray-100">
    <el-container>
      <el-header class="bg-light-50 h-[10vh] flex items-center justify-center fixed w-100%"><Header></Header></el-header>
      <el-main class="m-auto w-[80%]"> <router-view></router-view> </el-main>
    </el-container>
  </div>
</template>
