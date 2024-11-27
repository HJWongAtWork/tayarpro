import { defineStore } from "pinia";
import axios from "axios";

interface CartItem {
  quantity: number;
  productid: string;
  description: string;
  unitprice: number;
  accountid: string;
  carid: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as CartItem[],
  }),
  getters: {
    cartItemCount: (state) => state.cartItems.length,
  },
  actions: {
    // Fetch cart items from the API
    async fetchCartItems(accountId: string): Promise<void> {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.post<CartItem[]>(
          `${baseUrl}/get_cart/`,
          "",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        this.cartItems = response.data;
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    },
    addCartItem(item: CartItem): void {
      this.cartItems.push(item);
      console.log(this.cartItems);
    },
    clearCart(): void {
      this.cartItems = [];
    },
  },
});
