<script lang="ts" setup>
import { getBaskets, payOrders } from '@/request/front';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
const data = ref<any>([]);
const init = async () => {
  const res: any = await getBaskets();
  data.value = res.Baskets;
  console.log(res.Baskets);
};
const buy = async (item: any) => {
  const res = await payOrders(item)
  console.log(res);
  ElMessage.success('购买成功');
  await init()
}
onMounted(async () => {
  await init();
});
</script>

<template>
  <div class="bg-gray-100  mt-10vh">
    <el-empty description="暂无数据" v-if="!data.length"></el-empty>
    <div v-else>
      <div class="flex flex-wrap gap-5">
        <el-card class="mb-6 w-30%" v-for="item in data" :key="item.id">
          <div class="flex items-center justify-around gap-5">
            <img class="w-40 h-50" :src="item.pic" alt="" />
            <div class="flex flex-col gap-4">
              <div>书名：{{ item.name }}</div>
              <div>详情：{{ item.detail }}</div>
              <div>价格：{{ item.price }}</div>
              <div>剩余：{{ item.num }}</div>
              <el-button
                @click="buy(item)"
                size="small"
                type="primary"
                >购买</el-button
              >
            </div>
          </div>
        </el-card>

      </div>
    </div>
  </div>
</template>
