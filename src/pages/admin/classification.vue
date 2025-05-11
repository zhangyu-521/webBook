<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {
  getAllCategory,
  addCategoryInfo,
  UpdateCategoryInfo,
  deleteCategoryInfo,
} from '@/request/end';

const categoryList = ref<any>([]);
const dialogVisible = ref({
  visible: false,
  title: '添加分类',
  typeValue: '',
  id: '',
});

const init = async () => {
  let data: any = await getAllCategory();
  categoryList.value = data.categorys;
};

const handleAdd = () => {
  dialogVisible.value.title = '添加分类';
  dialogVisible.value.visible = true;
  dialogVisible.value.typeValue = '';
  dialogVisible.value.id = '';
  console.log('添加分类');
};
const handleEdit = (index: number, row: any) => {
  dialogVisible.value.title = '修改分类';
  dialogVisible.value.visible = true;
  dialogVisible.value.typeValue = '';
  dialogVisible.value.id = row.id;
  console.log(index, row);
};
const handleDelete = async (index: number, row: any) => {
  await deleteCategoryInfo({ id: row.id });
  await init()
  console.log(index, row);
};

const addClassification = async () => {
  console.log('添加分类');
  if (dialogVisible.value.title === '添加分类') {
    await addCategoryInfo({ type: dialogVisible.value.typeValue });
  } else {
    await UpdateCategoryInfo({
      id: dialogVisible.value.id,
      type: dialogVisible.value.typeValue,
    });
    console.log('修改分类');
  }
  dialogVisible.value.visible = false;
  await init();
};

onMounted(async () => {
  await init();
});
</script>

<template>
  <div>
    <el-button class="mb-5" type="primary" @click="handleAdd"
      >添加分类</el-button
    >
    <el-table height="500" border :data="categoryList">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="type" label="类型" />
      <!-- <el-table-column prop="isdelete" label="isdelete" /> -->
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

    <el-dialog :title="dialogVisible.title" v-model="dialogVisible.visible">
      <el-form label-width="120px">
        <el-form-item label="分类名称">
          <el-input v-model="dialogVisible.typeValue" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addClassification">确定</el-button>
          <el-button @click="dialogVisible.visible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
