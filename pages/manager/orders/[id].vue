<template>
  <ManagerOrders>
    <template #card>
      <StatusCard status="success">
        <span>№: {{ id }}</span>
      </StatusCard>
    </template>
  </ManagerOrders>
</template>

<script setup lang="ts">
import { StatusCard } from "~/shared/ui/status-card";

import ManagerOrders from "~/pages/manager/orders/index.vue";

const order = ref()
const err = ref()
const { id } = useRoute().params as { id: string };
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
