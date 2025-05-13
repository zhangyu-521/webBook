<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { login as loginApi, signUp, Notices } from '@/request/front';
import { useUserStore } from '@/pinia';
import { ElMessage, ElNotification, type FormInstance } from 'element-plus';

import { useRouter } from 'vue-router';
const { userInfo } = useUserStore();
const router = useRouter();
const value4 = ref([]);
const activeName = ref('login');
const centerDialogVisible = ref(false);

const loginFront = (val: any) => {
  activeName.value = val;
  centerDialogVisible.value = true;
};

const handleTabClick = (val: any) => {
  console.log(val);
};

const registRule = {
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮件', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请输入性别', trigger: 'blur' }],
};
const loginRule = {
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const loginFormRef = ref<FormInstance | null>(null);
const registFormRef = ref<FormInstance | null>(null);

const registForm = reactive({
  account: '',
  password: '',
  tel: '',
  email: '',
  name: '',
  balance: 0,
  sex: '',
});
const loginForm = reactive({
  account: '',
  password: '',
});

const login = async () => {
  loginFormRef?.value?.validate(async (valid) => {
    // 校验通过
    if (valid) {
      if (activeName.value === 'login') {
        const res: any = await loginApi(loginForm);
        userInfo.account = res.user.account;
        localStorage.setItem('account', res.user.account);
        console.log(userInfo);
        console.log(res.user);
      } else {
        const res = await signUp(registForm);
        console.log(res);
      }
      centerDialogVisible.value = false;
    }
  });
};

const logout = () => {
  localStorage.removeItem('account');
  userInfo.account = '';
};

const shopCar = () => {
  if (!userInfo.account) {
    ElMessage.error('请先登录');
    return;
  }
  router.push('/shopCar');
};

const goOrder = () => {
  if (!userInfo.account) {
    ElMessage.error('请先登录');
    return;
  }
  router.push('/orders');
};

onMounted(async () => {
  const res: any = await Notices();
  let data = res.notices[res.notices.length - 1];
  console.log(res.notices[res.notices.length - 1]);
  ElNotification({
    title: data.title,
    message: data.detail,
    duration: 0,
  });
});
</script>

<template>
  <div class="fixed px-20 w-full h-10vh bg-[#409eff] flex items-center justify-between">
    <!-- logo -->
    <div
      @click="$router.push('/booksIndex')"
      class="flex justify-center items-center gap-2 cursor-pointer"
    >
      <img src="@/assets/vue.svg" alt="logo" />
      <h1 class="text-3xl">图书系统</h1>
    </div>
    <!-- 搜索 -->

    <!-- 右侧  -->
    <div class="flex items-center gap-5 cursor-pointer">
      <span @click="$router.push('/booksIndex')">首页</span>
      <span @click="goOrder">订单</span>
      <span @click="$router.push('/admin/login')">后台</span>
      <span @click="shopCar">收藏</span>
      <div v-if="userInfo.account">
        <span class="mr-5">当前账户:{{ userInfo.account }}</span>
        <span @click="logout">退出登录</span>
      </div>
      <div v-else>
        <span class="mr-5" @click="loginFront('login')">登录</span>
        <span @click="loginFront('registered')">注册</span>
      </div>
    </div>
  </div>
  <el-dialog z-index="9999" v-model="centerDialogVisible" width="30%" center>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="注册" name="registered">
          <el-form
            ref="registFormRef"
            :rules="registRule"
            :model="registForm"
            label-width="80px"
          >
            <el-form-item label="用户名" prop="account">
              <el-input class="w-full" v-model="registForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="registForm.password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input class="w-full" v-model="registForm.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="tel">
              <el-input class="w-full" v-model="registForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input class="w-full" v-model="registForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input class="w-full" v-model="registForm.email"></el-input>
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
            <el-form-item label="用户名" prop="account">
              <el-input class="w-full" v-model="loginForm.account"></el-input>
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
</template>
