<script lang="ts" setup>
import {
  getBookinfo,
  getAllCategory,
  addBook,
  updateBook,
  deleteBook
} from '@/request/end.ts';
import { reactive, ref } from 'vue';
const bookinfo = ref();
const category = ref();
const dialogInfo = reactive({
  visible: false,
  title: '',
  form: {
    id: 0,
    name: '',
    num: '',
    number: 0,
    price: 0,
    type: '',
    pic: '',
    detail: '',
  },
});
bookinfo.value = await getBookinfo();
category.value = await getAllCategory();

const handleEdit = (index: number, row: any) => {
  dialogInfo.visible = true;
  dialogInfo.title = '修改图书信息';
  dialogInfo.form = row;
};

const handleDelete = async (index: number, row: any) => {
  await deleteBook(row.id);
  bookinfo.value = await getBookinfo();
};

const handleAdd = () => {
  dialogInfo.visible = true;
  dialogInfo.title = '添加图书信息';
  dialogInfo.form = {
    id: 0,
    name: '',
    num: '',
    number: 0,
    price: 0,
    type: '',
    pic: '',
    detail: '',
  };
};
const delBook = async (id: number) => {
  if (dialogInfo.title == '修改图书信息') {
    await updateBook(dialogInfo.form);
  } else {
    // 添加
    await addBook(dialogInfo.form);
  }
  bookinfo.value = await getBookinfo();
  dialogInfo.visible = false;
};
</script>

<template>
  <div>
    <el-button class="mb-5" type="primary" @click="handleAdd"
      >添加图书</el-button
    >
    <el-table height="500" :data="bookinfo.books">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="书名" />
      <el-table-column prop="num" label="数量" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="number" label="图书编号" />
      <el-table-column prop="pic" label="pic">
        <template #default="scope">
          <img :src="scope.row.pic" class="w-20 h-20" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="detail" label="详情" />
      <el-table-column label="操作" fixed="right">
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
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogInfo.visible" :title="dialogInfo.title">
      <el-form label-width="90px" :model="dialogInfo.form">
        <el-form-item label="ID" prop="id">
          <el-input v-model="dialogInfo.form.id" disabled />
        </el-form-item>
        <el-form-item label="书名" prop="name">
          <el-input v-model="dialogInfo.form.name" />
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <el-input v-model="dialogInfo.form.num" />
        </el-form-item>
        <el-form-item label="图书编号" prop="number">
          <el-input v-model="dialogInfo.form.number" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="dialogInfo.form.price" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="dialogInfo.form.type">
            <el-option
              v-for="item in category.categorys"
              :key="item.type"
              :label="item.type"
              :value="item.type"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详情" prop="detail">
          <el-input v-model="dialogInfo.form.detail" />
        </el-form-item>
        <el-form-item label="图片" prop="pic">
          <el-input v-model="dialogInfo.form.pic" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="delBook">确定</el-button>
          <el-button @click="dialogInfo.visible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
