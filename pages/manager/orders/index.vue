<template>
  <ManagerOrders>
    <template #card>
      <template v-if="store.orderList">
        <StatusCard v-for="item in store.orderList" :key="item.id" status="success">
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

import { useOrderListStore } from "~~/store/order.store";

const store = useOrderListStore()

store.fetchOrderList()
</script>

<style lang="scss" scoped>
.block {
  padding: 16px;
  margin-bottom: 15px;
}
</style>
