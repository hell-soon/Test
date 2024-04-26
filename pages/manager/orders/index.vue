<template>
  <ManagerOrders>
    <template #card>
      <template v-if="orders">
        <StatusCard v-for="item in orders" :key="item.id" status="success">
          <span>№: {{ item.id }}</span>
        </StatusCard>
      </template>
      <template v-else>
        <Empty>
          <span>Заказов еще нет</span>
        </Empty>
      </template>
    </template>
  </ManagerOrders>
</template>

<script setup lang="ts">
import { StatusCard } from "~/shared/ui/status-card";
import Empty from "~/shared/ui/empty/index.vue";

import ManagerOrders from "~/pages/manager/orders/index.vue";

const orders = ref()
const err = ref()
async function getOrder() {
  try {
    const res = await $fetch(`method/orders.getTest`, {
      method: "GET",
      params: {
        id_orders: 93732,
        yers: 2022
      }
    });
    const data = await res as any;

    orders.value = data.response.data.orders
  }
  catch (e) {
    err.value = e as Error
  }
}

getOrder();
</script>

<style lang="scss" scoped>
.block {
  padding: 16px;
  margin-bottom: 15px;
}
</style>
