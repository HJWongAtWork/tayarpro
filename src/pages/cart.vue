<template>
  <h2 class="text-h3 text-center weight-bold sticky" style="padding: 10px">
    My Cart
  </h2>
  <h4
    class="text-h6 text-center"
    style="background-color: #ffc0cb; padding: 20px"
  >
    You Sucessfully Added to Your Cart.Check Out Now
  </h4>
  <div class="cart-container">
    <v-table>
      <thead>
        <tr>
          <th></th>
          <th class="text-center">Product</th>
          <th class="text-justify">Product Description</th>
          <th class="text-left">Unit Price</th>
          <th class="text-left">Qty</th>
          <th class="text-left">Price</th>
          <th class="text-left">Selected Item</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cart in carts" :key="cart.id">
          <td>
            <cartButton
              @click="remove(cart)"
              icon="mdi-close"
              rounded
            ></cartButton>
          </td>
          <td><v-img :src="cart.image_link"></v-img></td>
          <td>{{ cart.title }}</td>
          <td>RM {{ formatNumber(cart.price) }}</td>
          <td class="weight-bold">
            <cartButton
              @click="increaseQuantity(cart)"
              icon="mdi-plus"
            ></cartButton>

            {{ cart.quantity }}

            <cartButton @click="decreaseQuantity(cart)" icon="mdi-minus">
            </cartButton>
          </td>
          <td>RM {{ formatNumber(cart.price * cart.quantity) }}</td>
          <td>
            <v-checkbox
              v-model="cart.selected"
              label="Click to Select"
            ></v-checkbox>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <v-container>
    <div>
      <v-row>
        <v-col cols="4">
          <div>
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
        <v-col cols="4"> </v-col>
        <v-col cols="4">
          <div>
            <v-table>
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
                  <td class="table-cell-small">- RM {{ Coupon.toFixed(2) }}</td>
                </tr>
                <tr>
                  <td class="table-cell-big">Total</td>
                  <td class="table-cell-big">RM {{ Total }}</td>
                </tr>
                <tr>
                  <td colspan="2">
                    <cartButton
                      @click="submitOrder"
                      min="260px"
                      height="55px"
                      color="#FF6875"
                      display="flex"
                    >
                      Checkout
                    </cartButton>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { parse } from "vue/compiler-sfc";
import cartButton from "../components/cartButton.vue";

export default {
  components: {
    cartButton,
  },
  data() {
    return {
      carts: [
        {
          title: "CONTINENTAL UC6 225-50-18",
          price: "746",
          quantity: 0,
          image_link:
            "https://limtayar.com.my/wp-content/uploads/2020/03/uc6-300x300.jpg",
          image_path: "images/CONTINENTAL_UC6_225-50-18.jpg",
          selected: false,
        },
        {
          title: "CONTINENTAL MC6 235-35-19",
          price: "1080",
          quantity: 0,
          image_link:
            "https://limtayar.com.my/wp-content/uploads/2020/03/mc6-300x300.jpg",
          image_path: "images/CONTINENTAL_MC6_235-35-19.jpg",
          selected: false,
        },
        {
          title: "CONTINENTAL UC6 SUV 275-45-20",
          price: "1195",
          quantity: 0,
          image_link:
            "https://limtayar.com.my/wp-content/uploads/2020/03/uc6-300x300.jpg",
          image_path: "images/CONTINENTAL_UC6_SUV_275-45-20.jpg",
          selected: false,
        },
        {
          title: "BRIDGESTONE EP150 175-65-14",
          price: "230",
          quantity: 0,
          image_link:
            "https://limtayar.com.my/wp-content/uploads/2024/08/Bridgestone_EP150.jpg",
          image_path: "images/BRIDGESTONE_EP150_175-65-14.jpg",
          selected: false,
        },
        {
          title: "BRIDGESTONE EP300 205-55-16",
          price: "387",
          quantity: 0,
          image_link:
            "https://limtayar.com.my/wp-content/uploads/2024/08/Bridgestone_EP300.jpg",
          image_path: "images/BRIDGESTONE_EP300_205-55-16.jpg",
          selected: false,
        },
      ],
      RedeemCode: "",
      ValidRedeemCode: [
        { code: "DISCPROT10", discount: 10 },
        { code: "DISCPROT20", discount: 20 },
      ],
      rules: [(v) => v.length >= 8 || "Minimum 8 characters"],
      Coupon: 0,
      Total: 0,
    };
  },
  methods: {
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
    remove(cart) {
      const index = this.carts.indexOf(cart);
      if (index > -1) {
        this.carts.splice(index, 1);
      }
    },
    increaseQuantity(cart) {
      cart.quantity += 1;
    },
    decreaseQuantity(cart) {
      if (cart.quantity > 0) cart.quantity -= 1;
    },
    formatNumber(value) {
      const number = typeof value === "string" ? parseInt(value) : value;
      return number.toLocaleString("en-US");
    },
  },
  computed: {
    Subtotal() {
      let subtotal = 0;
      this.carts.forEach((cart) => {
        if (cart.selected) {
          subtotal += cart.price * cart.quantity;
        }
      });
      console.log("Subtotal: " + subtotal);
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
.table-cell-small {
  font-size: 16px; /* Adjust font size */
  padding: 4px 8px !important; /* Adjust padding */
  font-weight: normal; /* Make text bold */
  border-bottom: none !important;
  text-justify: centered;
}

.table-cell-big {
  font-size: 24px; /* Adjust font size */
  padding: 6px 8px; /* Adjust padding */
  font-weight: bold; /* Make text bold */
}
.code-container {
  display: flex;
  gap: 0;
}
.cart-container {
  width: 100%;
  padding: 0 10px;
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
</style>
