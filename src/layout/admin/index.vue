<script lang="ts" setup>
import { reactive } from 'vue';
import Menu from './Menu.vue';
import { addNotice } from '@/request/end';

const dialogInfo = reactive({
  visible: false,
  title: '发布公告',
  form: {
    detail: '',
    title: ''
  },
})

const publishNotice = async () => {
  await addNotice(dialogInfo.form);
  dialogInfo.visible = false;
  dialogInfo.form.detail = '';
  dialogInfo.form.title = '';
};
</script>

<template>
  <div class="w-100vw h-100vh flex flex-col justify-center items-center">
    <el-container class="w-full">
      <el-header class="bg-blue-500 flex justify-between items-center">
        <div>
          <h1 class="text-white">图书管理系统后台</h1>
        </div>
        <div>
          <el-button type="warning" @click="dialogInfo.visible = true">发布公告</el-button>
          <el-button type="primary" @click="$router.push('/admin/login')"
            >退出登录</el-button
          >
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

    <el-dialog :title="dialogInfo.title" v-model="dialogInfo.visible">
      <el-form label-width="120px">
        <el-form-item label="主题">
          <el-input v-model="dialogInfo.form.title" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="dialogInfo.form.detail" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="publishNotice">确定</el-button>
          <el-button @click="dialogInfo.visible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    
  </div>
</template>
