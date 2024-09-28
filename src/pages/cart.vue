<template>
  <!-- <Header /> -->
  <h2 class="text-h3 text-center weight-bold sticky" style="padding: 10px">
    My Cart
  </h2>
  <h4
    class="text-h6 text-center"
    style="background-color: #ffc0cb; padding: 20px"
  >
    You Sucessfully Added to Cart.Check Out Now
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="cart in carts" :key="cart.id">
          <td>
            <v-btn
              density="default"
              elevation="4"
              v-on:click="remove(cart)"
              icon
              ><v-icon color="red">mdi-close</v-icon>
            </v-btn>
          </td>
          <td><v-img :src="cart.image_link"></v-img></td>
          <td>{{ cart.title }}</td>
          <td>RM {{ formatNumber(cart.price) }}</td>
          <td class="weight-bold">
            <!-- <button v-on:click="increaseQuantity(item)"> -->
            <v-btn
              density="default"
              elevation="4"
              v-on:click="increaseQuantity(cart)"
              icon="mdi-plus"
            ></v-btn>

            {{ cart.quantity }}

            <v-btn
              density="default"
              elevation="4"
              v-if="cart.quantity > 0"
              v-on:click="decreaseQuantity(cart)"
              icon="mdi-minus"
            >
            </v-btn>

            <!-- <v-icon>mdi-minus</v-icon> -->
            <!-- </button> -->
            <!-- <span v-else><v-icon density="default"> mdi-minus</v-icon></span> -->
          </td>
          <td>RM {{ formatNumber(cart.price * cart.quantity) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <v-container>
    <div>
      <v-row>
        <v-col cols="6">
          <div>
            <v-form class="code-container" validate-on="submit" @submit.prevent>
              <input
                v-model="RedeemCode"
                :rules="rules"
                label="Voucher Code"
                border="2px solid black"
                outlined
                width="200"
              />

              <v-btn
                background-color="primary"
                density="default"
                elevation="4"
                type="submit"
                color="error"
                height="55"
                width="200"
                :disabled="!RedeemCode"
                >Submit</v-btn
              >
            </v-form>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { parse } from "vue/compiler-sfc";

export default {
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
        },
        {
          title: "CONTINENTAL MC6 235-35-19",
          price: "1080",
          quantity: 0,
          image_link:
            "https://limtayar.com.my/wp-content/uploads/2020/03/mc6-300x300.jpg",
          image_path: "images/CONTINENTAL_MC6_235-35-19.jpg",
        },
        {
          title: "CONTINENTAL UC6 SUV 275-45-20",
          price: "1195",
          quantity: 0,
          image_link:
            "https://limtayar.com.my/wp-content/uploads/2020/03/uc6-300x300.jpg",
          image_path: "images/CONTINENTAL_UC6_SUV_275-45-20.jpg",
        },
        {
          title: "BRIDGESTONE EP150 175-65-14",
          price: "230",
          quantity: 0,
          image_link:
            "https://limtayar.com.my/wp-content/uploads/2024/08/Bridgestone_EP150.jpg",
          image_path: "images/BRIDGESTONE_EP150_175-65-14.jpg",
        },
        {
          title: "BRIDGESTONE EP300 205-55-16",
          price: "387",
          quantity: 0,
          image_link:
            "https://limtayar.com.my/wp-content/uploads/2024/08/Bridgestone_EP300.jpg",
          image_path: "images/BRIDGESTONE_EP300_205-55-16.jpg",
        },
      ],
      RedeemCode: "",
      rules: [
        (v) => v.length <= 10 || "Max 10 characters",
        "The code must be in 10 characters",
      ],
    };
  },
  methods: {
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
};
</script>

<style>
.code-container {
  display: flex;
  gap: 0;
}
.cart-container {
  width: 100%;
  padding: 0 20px;
}
.v-table {
  border-spacing: 10px 30px;
  border-collapse: separate;
}
th {
  font-weight: bold;
  font-size: large;
}
td {
  width: 5%;
  height: auto;
  padding: 20px 0 !important;
  background-color: #fff;
}
</style>
