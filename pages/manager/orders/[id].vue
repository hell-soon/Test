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

import { useOrderListStore } from "~~/store/order.store";

const { id } = useRoute().params as { id: string };
const orderExists = ref();

const store = useOrderListStore()

const params = {
  id_orders: id
}

store.fetchOrderList(params)
store.fetchOrder(id)
</script>

<style lang="scss" scoped>
.block {
  padding: 16px;
  margin-bottom: 15px;
}
</style>
