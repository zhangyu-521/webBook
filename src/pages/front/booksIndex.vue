<script lang="ts" setup>
import {
  BookInfos,
  addBasket as AddBasketAPI,
  BookInfoByName,
  BookInfoByType,
} from '@/request/front';
import { getAllCategory } from '@/request/end';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/pinia';
import { ElMessage } from 'element-plus';
const { userInfo } = useUserStore();

const books = ref();
const res: any = await BookInfos();
console.log(res);
books.value = res.books;

const addBasket = async (id: number) => {
  if (!userInfo.account) {
    ElMessage({
      message: '请先登录',
      type: 'error',
    });
    return;
  }
  const res = await AddBasketAPI(id);
  console.log(res);
};
const name = ref('');
const search = async () => {
  const res: any = await BookInfoByName(name.value);
  console.log(res);
  books.value = res.books;
  console.log('搜索');
};

const searchByType = async (type: string) => {
  const res: any = await BookInfoByType(type);
  console.log(res);
  books.value = res.books;
  console.log('搜索');
};

const categorys = ref();
onMounted(async () => {
  const res: any = await getAllCategory();
  categorys.value = res.categorys;
});
</script>

<template>
  <div>
    <div class="flex gap-2 flex-wrap mb-6 mt-10vh">
      <p>分类：</p>
      <el-button
        size="small"
        plain
        v-for="category in categorys"
        :key="category.id"
        @click="searchByType(category.type)"
        >{{ category.type }}</el-button
      >
    </div>
    <div class="flex gap-4 mb-6 items-center">
      <p>关键字搜索图书：</p>
      <el-input
        v-model="name"
        style="width: 250px"
        type="text"
        placeholder="搜索"
      />
      <el-button @click="search" type="primary">搜索</el-button>
    </div>

    <el-card v-for="book in books" :key="book.id">
      <div class="flex items-center justify-around">
        <img class="w-40 h-50" :src="book.pic" alt="" />
        <div class="flex flex-col gap-4">
          <div>书名：{{ book.name }}</div>
          <div>详情：{{ book.detail }}</div>
          <div>价格：{{ book.price }}</div>
          <div>剩余：{{ book.num }}</div>
          <el-button @click="addBasket(book.number)" size="small" type="primary"
            >加入收藏夹</el-button
          >
        </div>
      </div>
    </el-card>

    <el-empty description="暂无数据" v-if="books.length === 0"></el-empty>
  </div>
</template>
