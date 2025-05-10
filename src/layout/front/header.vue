<script lang="ts" setup>
import { reactive, ref } from 'vue';
import api from '@/request/index';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/pinia';
import type { FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
const { userInfo } = useUserStore();

console.log(userInfo);

// const res = await api('/api/typesinfo')
// console.log(res)

const value4 = ref([]);
const activeName = ref('login');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
const centerDialogVisible = ref(false);

const loginFront = () => {
  centerDialogVisible.value = true;
};

const handleTabClick = (val) => {
  console.log(val);
};

const loginRule = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const router = useRouter();

const loginFormRef = ref<FormInstance | null>(null);

const loginForm = reactive({
  username: '',
  password: '',
});

const login = () => {
  loginFormRef?.value?.validate((valid) => {
    // 校验通过
    if (valid) {
      console.log(loginForm);
      router.push('/admin');
    }
  });
};
</script>

<template>
  <div class="w-full h-full flex items-center justify-between">
    <!-- logo -->
    <div class="flex justify-center items-center gap-2">
      <img src="@/assets/vue.svg" alt="logo" />
      <h1>图书系统</h1>
    </div>
    <!-- 搜索 -->
    <div>
      <el-select
        v-model="value4"
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="5"
        placeholder="选择类型"
        style="width: 300px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <!-- 右侧  -->
    <div class="flex items-center gap-2 cursor-pointer">
      <span @click="$router.push('/admin/login')">后台</span>
      <el-icon
        class="cursor-pointer"
        @click="$router.push('/shopCar')"
        size="29"
        ><Collection
      /></el-icon>
      <span @click="loginFront">登录</span>
    </div>

    <el-dialog v-model="centerDialogVisible" width="30%" center>
      <div>
        <el-tabs
          v-model="activeName"
          @tab-click="handleTabClick"
        >
          <el-tab-pane label="注册" name="registered">
            <el-form
              ref="loginFormRef"
              :rules="loginRule"
              :model="loginForm"
              label-width="80px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  class="w-full"
                  v-model="loginForm.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  show-password
                ></el-input>
              </el-form-item>
              <div class="flex item-center justify-around">
                <el-button round class="w-30%" type="primary" @click="login"
                  >注册</el-button
                >
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="登录" name="login">
            <el-form
              ref="loginFormRef"
              :rules="loginRule"
              :model="loginForm"
              label-width="80px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  class="w-full"
                  v-model="loginForm.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  show-password
                ></el-input>
              </el-form-item>
              <div class="flex item-center justify-around">
                <el-button round class="w-30%" type="primary" @click="login"
                  >登录</el-button
                >
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>
