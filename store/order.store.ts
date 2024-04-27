import type { Order, OrderParams } from "~~/types/order";


//* --- State ----------------------------------------------- *//
interface OrderListState {
  orderList: Order[] | null
  error: unknown
}

//* --- Store ----------------------------------------------- *//
export const useOrderListStore = defineStore("orderList", {
  state: (): OrderListState => ({
    orderList: null,
    error: {},
  }),

  actions: {
    async fetchOrderList(nameParams?: OrderParams) {
      try {
        const res = await $fetch<{ response: { data: { orders: Order[] } } }>(`method/orders.getTest`, {
          method: "GET",
          params: nameParams,
        });
        
        this.orderList = res.response.data.orders
      }
      catch (err) {
        this.error = err
      }
    },

    fetchOrder(id: string) {
      return this.orderList?.find((item: Order) => item.id === id)  
    }
  },
})
