<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { type FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
import { login as loginAPI } from '@/request/end';
const loginRule = {
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const router = useRouter();

const loginFormRef = ref<FormInstance | null>(null);

const loginForm = reactive({
  account: '',
  password: '',
});

const login = async () => {
  loginFormRef?.value?.validate(async (valid) => {
    // 校验通过
    if (valid) {
    console.log(loginForm);
     const res = await loginAPI(loginForm)

     console.log(res)
     if(res) {
       router.push('/admin/bookinfo');
     }
    }
  });
};
</script>

<template>
  <div class="h-100vh w-100vw flex justify-center items-center bg-gray-100">
    <el-card class="w-[25%]">
      <div class="flex justify-center items-center mb-7">
        <img
          class="w-25% h-25% border-1px border-gray-200 rounded-50% border-solid"
          src="@/assets/vue.svg"
          alt=""
        />
      </div>
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
          <el-button
            round
            class="w-30%"
            type="warning"
            @click="loginFormRef?.resetFields()"
            >重置</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>
