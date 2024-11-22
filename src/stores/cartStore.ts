import { defineStore } from "pinia";
import axios from "axios";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  // Add other properties of cart items as needed
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as CartItem[], // Define the type of cartItems
  }),
  getters: {
    cartItemCount: (state) => state.cartItems.length, // Number of items in cart
  },
  actions: {
    // Fetch cart items from the API
    async fetchCartItems(accountId: string): Promise<void> {
      try {
        const response = await axios.get<CartItem[]>(
          `http://tayar.pro/get_cart/${accountId}`
        );
        this.cartItems = response.data;
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    },
    clearCart(): void {
      this.cartItems = [];
    },
  },
});
