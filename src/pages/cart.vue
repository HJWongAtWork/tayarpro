<template>
  <div class="title-page">
    <div class="line"></div>
    <h2 class="no-background text-center">
      <span><strong>MY CART</strong></span>
    </h2>
    <div class="line"></div>
  </div>
  <v-container max-width="1200">
    <!-- <h2
      class="text-h3 text-center weight-bold sticky responsive-title"
      style="padding: 10px"
    >
      My Cart
    </h2> -->
    <h4
      class="text-h6 text-center notification-banner"
      style="background-color: #ffc0cb; padding: 20px"
    >
      Ready to complete your order? Check Out Now!
    </h4>
    <div class="cart-container">
      <v-table>
        <thead>
          <tr>
            <th class="hide-sm"></th>
            <th class="text-center">Product</th>
            <th class="text-center hide-sm">Description</th>
            <th class="text-center">Unit Price</th>
            <th class="text-center">Qty</th>
            <th class="text-center hide-sm">Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts" :key="cart.productid">
            <td>
              <cartButton
                @click="remove(cart.productid)"
                icon="mdi-close"
                rounded
              ></cartButton>
            </td>
            <td class="text-center">
              <v-img
                :src="cart.image_link"
                :lazy-src="placeholderImage"
                :error-src="placeholderImage"
                :alt="cart.title"
                :width="$vuetify.display.smAndDown ? '60' : '100'"
                :height="$vuetify.display.smAndDown ? '60' : '100'"
                :padding="$vuetify.display.smAndDown ? '0' : '0'"
                cover
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                  </v-row>
                </template>
              </v-img>
            </td>
            <td class="text-center hide-sm">{{ cart.description }}</td>
            <td class="text-center">RM {{ formatNumber(cart.price) }}</td>
            <td class="text-center">
              <div class="d-flex align-center quantity-controls">
                <cartButton
                  @click="decreaseQuantity(cart)"
                  icon="mdi-minus"
                  :disabled="cart.quantity <= 1"
                  density="comfortable"
                  size="small"
                ></cartButton>
                <span class="mx-2 quantity-text">{{ cart.quantity }}</span>
                <cartButton
                  @click="increaseQuantity(cart)"
                  icon="mdi-plus"
                  density="comfortable"
                  size="small"
                ></cartButton>
              </div>
            </td>
            <td class="text-center hide-sm">
              RM {{ formatNumber(cart.price * cart.quantity) }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-container>
      <v-row>
        <!-- <v-col cols="12" md="4">
          <div class="voucher-section">
            <v-form
              class="code-container"
              validate-on="submit"
              @submit.prevent="submitCode"
            >
              <v-text-field
                v-model="RedeemCode"
                :rules="rules"
                label="Voucher Code"
                border="20px solid black"
                outlined
                width="100"
              />
              <cartButton
                type="submit"
                color="#FF6875"
                min="100px"
                height="55px"
                :disabled="!RedeemCode"
                >SUBMIT</cartButton
              >
            </v-form>
          </div>
        </v-col> -->

        <v-col cols="12">
          <v-container class="summary-container">
            <v-row justify="center">
              <v-col cols="6">
                <v-table density="comfortable">
                  <tbody>
                    <tr>
                      <td class="table-cell-small">Subtotal</td>
                      <td class="table-cell-small">
                        RM {{ Subtotal.toFixed(2) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="table-cell-small">SST Fee(8%)</td>
                      <td class="table-cell-small">RM {{ SST.toFixed(2) }}</td>
                    </tr>
                    <tr>
                      <td class="table-cell-small">Coupon</td>
                      <td class="table-cell-small">
                        RM {{ Coupon.toFixed(2) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="table-cell-big">Total</td>
                      <td class="table-cell-big">RM {{ Total.toFixed(2) }}</td>
                    </tr>
                    <tr>
                      <td colspan="12">
                        <!-- <checkoutDialog v-bind:subtotal="Subtotal" /> -->
                        <v-btn
                          @click="handleCheckout"
                          min="260px"
                          height="55px"
                          color="#FF6875"
                          display="flex"
                          width="-webkit-fill-available"
                        >
                          Checkout
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <ToastNotification
    ref="toast"
    :default-color="'info'"
    :default-timeout="2000"
    :max-toasts="5"
  />
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import cartButton from "../components/cartButton.vue";
import checkoutDialog from "../components/checkoutDialog.vue";
import { isLogicalExpression } from "@babel/types";
import placeholderImage from "@/assets/tyre.jpg";
import { ref, onMounted, onUnmounted } from "vue";
import { useCheckoutStore } from "@/stores/checkout";
import ToastNotification from "@/components/ToastNotification.vue";

const isLoading = ref(true);
const handleImageError = () => {
  console.log("Image failed to load");
  isLoading.value = false;
};

export default {
  components: {
    cartButton,
    checkoutDialog,
  },
  setup() {
    const router = useRouter();
    const checkoutStore = useCheckoutStore();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    onMounted(() => {
      document.title = "Cart";
    });

    return { router, checkoutStore, baseUrl };
  },
  data() {
    return {
      carts: [],
      accountid: "ACC001",
      RedeemCode: "",
      ValidRedeemCode: [
        { code: "DISCPROT10", discount: 10 },
        { code: "DISCPROT20", discount: 20 },
      ],
      rules: [(v) => v.length >= 8 || "Minimum 8 characters"],
      Coupon: 0,
      showOrderDialog: false,
      step: 1,
      items: [
        "Select Payment",
        "Make Payment",
        "Make Appointment",
        "Success!!!",
      ],
      paymentType: null,
      isLoading: true,
      placeholderImage,
    };
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    },
    handleCheckout() {
      this.checkLoginStatus();
      if (!this.isLoggedIn) {
        // 3. Store the return path
        localStorage.setItem("checkoutRedirect", "/cart");

        // 4. Redirect to login page
        this.router.push("/login");

        // 5. Stop the method here
        return;
      }
      //console.log("product service: " + this.checkoutStore.hasProduct + " " + this.checkoutStore.hasService);
      if (!this.checkoutStore.hasProduct && !this.checkoutStore.hasService) {
        this.$refs.toast.addToast("Cart is empty!", 2000);
      }
      // else if (!this.checkoutStore.hasProduct && this.checkoutStore.hasService) {
      //   this.$refs.toast.addToast("No product in cart!", 2000);
      // }
      // else if (this.checkoutStore.hasProduct && !this.checkoutStore.hasService) {
      //   this.$refs.toast.addToast("No service in cart!", 2000);
      // }
      else {
        this.checkoutStore.setCheckoutData({
          Subtotal: this.Subtotal,
          SST: this.SST,
          Total: this.Total,
        });
        this.checkoutStore.hasProduct = false;
        this.checkoutStore.hasService = false;

        this.router.push("/checkout");
      }
    },
    async fetchCartItems() {
      try {
        const token = localStorage.getItem("jwt");
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        // console.log("Cart - Current token:", token); // Debug log
        // console.log("Cart - IsLoggedIn:", isLoggedIn); // Debug log

        if (!token || !isLoggedIn) {
          console.log("No auth data, redirecting to login");
          this.router.push("/login");
          return;
        }

        //console.log("Making cart request with token..."); // Debug log

        const response = await axios.post(
          `${this.baseUrl}/get_cart`,
          "", // Empty string as data
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        );

        //console.log("Cart response:", response.data); // Debug log

        this.carts = response.data.map((item) => ({
          productid: item.productid,
          title: item.description,
          description: item.description,
          price: item.unitprice,
          quantity: item.quantity,
          image_link: item.productid.startsWith("SVR")
            ? new URL("@/assets/tyre-install-01.jpg", import.meta.url).href
            : new URL("@/assets/tyre.jpg", import.meta.url).href,
        }));
        //console.log("Cart items:", this.carts); // Debug log
        this.checkoutStore.hasService = false;
        this.checkoutStore.hasProduct = false;
        this.carts.forEach((cart) => {
          if (cart.productid.startsWith("SVR")) {
            this.checkoutStore.hasService = true;
          }
          if (cart.productid.startsWith("T")) {
            this.checkoutStore.hasProduct = true;
          }
        });
      } catch (error) {
        console.error("Cart error details:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });

        if (error.response?.status === 401) {
          console.log("Unauthorized in cart, clearing auth data");
          localStorage.removeItem("jwt");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("username");
          this.router.push("/login");
        }
      }
    },
    async remove(productid) {
      try {
        console.log("Removing cart item:", productid); // Debug log
        const response = await axios.delete(
          `${this.baseUrl}/delete_cart_item/${productid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        if (response.data.message === "Item removed from cart") {
          // Remove item from local array
          const index = this.carts.indexOf(cart);
          if (index > -1) {
            this.carts.splice(index, 1);
          }
          // Optional: Refresh cart data
          await this.fetchCartItems();
        }
      } catch (error) {
        console.error("Error removing item:", error);
        if (error.response?.status === 401) {
          console.error("Unauthorized: Please login");
        } else if (error.response?.status === 404) {
          console.error("Item not found in cart");
        }
      }
      await this.fetchCartItems();
    },
    async increaseQuantity(cart) {
      try {
        const newQuantity = cart.quantity + 1;
        const response = await axios.post(
          `${this.baseUrl}/update_cart_quantity/${cart.productid}/${newQuantity}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        if (response.data.message) {
          await this.fetchCartItems();
        }
      } catch (error) {
        console.error("Error increasing quantity:", error);
      }
      await this.fetchCartItems();
    },
    async decreaseQuantity(cart) {
      try {
        if (cart.quantity > 1) {
          const newQuantity = cart.quantity - 1;
          const response = await axios.post(
            `${this.baseUrl}/update_cart_quantity/${cart.productid}/${newQuantity}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );

          if (response.data.message) {
            await this.fetchCartItems();
          }
        }
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
      await this.fetchCartItems();
    },
    submitCode() {
      const validCode = this.ValidRedeemCode.find(
        (element) => element.code === this.RedeemCode
      );
      if (validCode) {
        this.Coupon = validCode.discount;
        this.Total = this.Total - this.Coupon;
        alert("Discount Applied: RM" + this.Coupon);
      } else {
        alert("Invalid Code No Discount");
      }
    },
    formatNumber(value) {
      const number = typeof value === "string" ? parseInt(value) : value;
      return number.toLocaleString("en-US");
    },
  },
  async mounted() {
    // console.log("Cart mounted");
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.log("No token found in mounted");
      this.router.push("/login");
      return;
    }
    await this.fetchCartItems();
    this.checkLoginStatus();
  },
  computed: {
    Subtotal() {
      let subtotal = 0;
      this.carts.forEach((cart) => {
        const price = parseFloat(cart.price || cart.unitprice);
        const quantity = parseInt(cart.quantity);
        subtotal += price * quantity;
        // subtotal = subtotal.toFixed(2);
      });
      // console.log("Subtotal calculated:", subtotal);
      return subtotal;
    },
    SST() {
      return (this.Subtotal * 8) / 100;
    },
    Total() {
      if (this.Coupon != null && this.Coupon > 0) {
        return (
          parseFloat(this.Subtotal) +
          parseFloat(this.SST) -
          parseFloat(this.Coupon)
        );
      } else {
        return parseFloat(this.Subtotal) + parseFloat(this.SST);
      }
    },
  },
};
</script>

<style scoped>
.summary-container {
  max-width: 100%;
  padding: 0px;
  margin: 0px;
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.responsive-title {
  font-size: clamp(1.5rem, 3vw, 2rem) !important;
}
.notification-banner {
  background-color: #ffc0cb;
  padding: 20px;
  margin-bottom: 20px;
  font-size: clamp(0.875rem, 2vw, 1.25rem);
}
.small-image {
  width: 25px;
  height: 25px;
}
.table-cell-small {
  font-size: clamp(14px, 2vw, 16px); /* Adjust font size */
  padding: 4px 8px !important; /* Adjust padding */
  font-weight: normal; /* Make text bold */
  border-bottom: none !important;
  text-justify: centered;
}

.table-cell-big {
  font-size: clamp(18px, 3vw, 24px); /* Adjust font size */
  padding: 6px 8px; /* Adjust padding */
  font-weight: bold; /* Make text bold */
}

.table-cell-small:last-child,
.table-cell-big:last-child {
  text-align: right;
}
.code-container {
  display: flex;
  gap: 10px;
}
.cart-container {
  padding: 0 20px;
  width: 100%;
  max-width: 1200;
  margin: 0 auto;
}
.v-table {
  border-spacing: 4px 8px;
  border-collapse: collapse;
}
th {
  font-weight: bold;
  font-size: large;
}
td {
  width: 5%;
  height: auto;
  padding: 10px 10px !important;
  background-color: #fff;
}

.summary-table {
  max-width: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
}

@media (max-width: 600px) {
  .summary-table {
    padding: 8px;
  }

  .table-cell-small {
    padding: 6px !important;
  }

  .table-cell-big {
    padding: 8px;
    text-align: center;
  }
}

.quantity-controls {
  min-width: 100px;
  padding: 4px;
  border-radius: 4px;
  background-color: #f5f5f5;
  justify-content: center;
}

.quantity-text {
  min-width: 24px;
  text-align: center;
  font-weight: 500;
}

/* Make it more compact on mobile */
@media (max-width: 600px) {
  .quantity-controls {
    min-width: 80px;
    padding: 2px;
  }

  .quantity-text {
    min-width: 20px;
  }
}

.title-page .line {
  height: 3px;
  flex: 1;
  background-color: #000;
}
.title-page {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto;
}
.title-page h2 {
  padding: 0 2rem;
}
</style>
