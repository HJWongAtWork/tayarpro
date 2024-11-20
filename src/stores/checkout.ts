import { defineStore } from "pinia";

interface CheckoutData {
  Subtotal: number;
  SST: number;
  Total: number;
}

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    checkoutData: {
      Subtotal: 0,
      SST: 0,
      Total: 0,
    } as CheckoutData,
  }),
  actions: {
    setCheckoutData(data: CheckoutData) {
      this.checkoutData = data;
    },
  },
});
