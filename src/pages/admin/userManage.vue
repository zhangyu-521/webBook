<script lang="ts" setup>
import { getAllUserInfo } from '@/request/end';
import { onMounted, ref } from 'vue';
const User = ref([]);
const init = async () => {
  const res:any = await getAllUserInfo();
  User.value = res.Users;
  console.log(res);
};

onMounted(async () => {
  await init();
});
</script>

<template>
    <div>
        <el-table height="500" border :data="User">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="role" label="角色"> 
        <template #default="scope">
          <el-tag v-if="scope.row.role === 0" type="success">管理员</el-tag>
          <el-tag v-else type="info">普通用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="tel" label="电话" />
      <el-table-column prop="account" label="账户" />
      <el-table-column prop="balance" label="余额" />


      
      <!-- <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
    </div>
</template>
