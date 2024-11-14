<template>
  <v-container>
    <h2
      class="text-h3 text-center weight-bold sticky responsive-title"
      style="padding: 10px"
    >
      My Cart
    </h2>
    <h4
      class="text-h6 text-center notification-banner"
      style="background-color: #ffc0cb; padding: 20px"
    >
      You Sucessfully Added to Your Cart.Check Out Now
    </h4>
    <div class="cart-container">
      <v-table>
        <thead>
          <tr>
            <th class="hide-sm"></th>
            <th class="text-center">Product</th>
            <th class="text-justify hide-sm">Description</th>
            <th class="text-left">Unit Price</th>
            <th class="text-left">Qty</th>
            <th class="text-left hide-sm">Total Price</th>
            <th class="text-left">Selected Item</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts" :key="cart.productid">
            <td>
              <cartButton
                @click="remove(cart)"
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
                cover
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey-lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </td>
            <td class="text-justify hide-sm">{{ cart.description }}</td>
            <td class="text-left">RM {{ formatNumber(cart.price) }}</td>
            <td class="text-left">
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
            <td class="text-left hide-sm">
              RM {{ formatNumber(cart.price * cart.quantity) }}
            </td>
            <td class="text-left">
              <v-checkbox
                v-model="cart.selected"
                density="compact"
              ></v-checkbox>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
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
        </v-col>
        <v-col cols="12" md="4"></v-col>

        <v-col cols="12" md="4">
          <div class="summary-table">
            <v-table density="comfortable">
              <tbody>
                <tr>
                  <td class="table-cell-small">Subtotal</td>
                  <td class="table-cell-small">RM {{ Subtotal.toFixed(2) }}</td>
                </tr>
                <tr>
                  <td class="table-cell-small">SST Fee(8%)</td>
                  <td class="table-cell-small">
                    RM {{ SaleServiceTax.toFixed(2) }}
                  </td>
                </tr>
                <tr>
                  <td class="table-cell-small">Coupon</td>
                  <td class="table-cell-small">RM {{ Coupon.toFixed(2) }}</td>
                </tr>
                <tr>
                  <td class="table-cell-big">Total</td>
                  <td class="table-cell-big">RM {{ Total.toFixed(2) }}</td>
                </tr>
                <tr>
                  <td colspan="12">
                    <checkoutDialog v-bind:subtotal="Subtotal" />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import cartButton from "../components/cartButton.vue";
import checkoutDialog from "../components/checkoutDialog.vue";
import { isLogicalExpression } from "@babel/types";
import placeholderImage from "@/assets/tyre.jpg";
import { ref } from "vue";

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
    return { router };
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
      Total: 0,
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
    async fetchCartItems() {
      try {
        const response = await axios.get("http://localhost:8000/get_cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        // Transform the response data to match table structure
        this.carts = response.data.map((item) => ({
          productid: item.productid,
          title: item.description, // For alt text in image
          description: item.description, // For description column
          price: item.unitprice,
          quantity: item.quantity,
          selected: false,
          image_link: item.productid.startsWith("SVR")
            ? "/images/service-placeholder.jpg"
            : "/images/tyre-placeholder.jpg",
        }));

        console.log("Cart items loaded:", this.carts);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Unauthorized: Please login");
          this.router.push("/login");
        } else {
          console.error("Error fetching cart items:", error);
        }
      }
    },
    async remove(cart) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/remove_from_cart/${cart.productid}`,
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
    },
    async increaseQuantity(cart) {
      try {
        const newQuantity = cart.quantity + 1;
        const response = await axios.put(
          `http://localhost:8000/update_cart_quantity/${cart.productid}/${newQuantity}`,
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
    },
    async decreaseQuantity(cart) {
      try {
        if (cart.quantity > 1) {
          const newQuantity = cart.quantity - 1;
          const response = await axios.put(
            `http://localhost:8000/update_cart_quantity/${cart.productid}/${newQuantity}`,
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
    await this.fetchCartItems();
  },
  computed: {
    Subtotal() {
      let subtotal = 0;
      this.carts.forEach((cart) => {
        if (cart.selected) {
          const price = parseFloat(cart.price || cart.unitprice);
          const quantity = parseInt(cart.quantity);
          subtotal += price * quantity;
          // subtotal = subtotal.toFixed(2);
        }
      });
      console.log("Subtotal calculated:", subtotal);
      return subtotal;
    },
    SaleServiceTax() {
      return (this.Subtotal * 8) / 100;
    },
    Total() {
      if (this.Coupon != null && this.Coupon > 0) {
        return (
          parseFloat(this.Subtotal) +
          parseFloat(this.SaleServiceTax) -
          parseFloat(this.Coupon)
        );
      } else {
        return parseFloat(this.Subtotal) + parseFloat(this.SaleServiceTax);
      }
    },
  },
};
</script>

<style>
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
</style>
