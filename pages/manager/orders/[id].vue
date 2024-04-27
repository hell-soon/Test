<template>
  <ManagerOrders>
    <template v-if="orderExists" #card>
      <StatusCard  status="success">
        <span>№: {{ orderExists.id }}</span>
      </StatusCard>
    </template>
    <template v-else #card>
      <Empty>
        <span>Заказов еще нет</span>
      </Empty>
    </template>
  </ManagerOrders>
</template>

<script setup lang="ts">
import { StatusCard } from "~/shared/ui/status-card";
import Empty from "~/shared/ui/empty/index.vue";

import ManagerOrders from "~/pages/manager/orders/index.vue";

const order = ref()
const err = ref()
const { id } = useRoute().params as { id: string };
const orderExists = ref();

async function getOrder() {
  try {
    const res = await $fetch(`method/orders.getTest`, {
      method: "GET",
      params: {
        id_orders: id,
      }
    });
    const data = await res as any;

    order.value = data.response.data.orders
    orderExists.value = order.value.find((item: any) => item.id === id);
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
