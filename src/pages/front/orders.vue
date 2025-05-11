<script lang="ts" setup>
import {getOrderByAcc,getorders} from '@/request/front';

type Orders = Array<{
  id: number;
  name: string;
  price: string;
  status: string;
  time: string;
  account: string;
}>;

type OrderInfo = {
  orders: Orders;
};
const data = await getOrderByAcc();
const data2 = await getorders();

console.log(data);
console.log(data2)
</script>

<template>
  <div>
    <!-- <el-card class="m-5" v-for="item in data?.orders" :key="item.id">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-2xl mb-3">书名：{{ item.name }}</p>
          <p class="c-red text-xl">￥{{ item.price }}</p>
        </div>
        <div class="flex flex-col">
          <el-tag v-if="item.status == '已发货'" class="ml-2" type="success">已发货</el-tag>
          <el-tag v-else-if="item.status == '已取消'" class="ml-2" type="info">已取消</el-tag>
          <el-tag v-else class="ml-2" type="danger">未知状态</el-tag>
          <span class="mt-3 text-center">{{ item.time }}</span>
          <span class="mt-3 text-center">{{ item.account }}</span>
          <router-view></router-view>
        </div>
      </div>
    </el-card> -->
  </div>
</template>
