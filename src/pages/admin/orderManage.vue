<script lang="ts" setup>
import { getAllOrders, UpdateOrderStatus } from '@/request/end';
import { onMounted, ref } from 'vue';
const dialogVisible = ref<any>({
  title: '',
  visible: false,
  row: '',
})
const orderList = ref([]);

const init = async () => {
  const res: any = await getAllOrders();
  orderList.value = res.orders;
};

const handleEdit = async (index: number, row: any) => {
  dialogVisible.value.visible = true;
  dialogVisible.value.title = '修改订单状态';
  dialogVisible.value.row = row;
};

const trueEdit = async () => {
  dialogVisible.value.visible = false;
 await UpdateOrderStatus({ id: dialogVisible.value.row.id, status: dialogVisible.value.row.status });
 await init()

}



onMounted(async () => {
  await init();
});
</script>

<template>
  <div>
    <el-table height="500" border :data="orderList">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="书名" />
      <el-table-column prop="num" label="数量" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="status" label="状态" />
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
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogVisible.title" v-model="dialogVisible.visible">
      <el-form label-width="120px">
        <el-form-item label="订单状态">
          <el-input v-model="dialogVisible.row.status" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="trueEdit">确定</el-button>
          <el-button @click="dialogVisible.visible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
