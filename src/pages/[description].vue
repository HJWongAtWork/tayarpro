<template>
  <v-container class="mt-10" max-width="1200">
    <v-card v-if="tyre">
      <v-row>
        <v-col cols="4">
          <v-img
            src="../assets/tyre.jpg"
            height="300"
            width="300"
            class="ma-6"
          ></v-img>
        </v-col>
        <v-col cols="8">
          <v-card-title class="text-h4 mt-2 pl-0">{{
            tyre.description
          }}</v-card-title>
          <div class="d-flex pl-0">
            <v-card-subtitle class="pl-0"
              >Brand: {{ tyre.brand_name }}</v-card-subtitle
            >
            <v-divider vertical class="mx-2"></v-divider>
            <v-card-subtitle>Type: {{ tyre.cartype }}</v-card-subtitle>
          </div>
          <v-divider class="my-5"></v-divider>
          <h2>RM {{ tyre.unitprice }}</h2>
          <v-row class="mt-4 ml-1 align-center">
            <div class="quantity">
              <v-col cols="auto" class="pa-0">
                <button
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="minus-button"
                  variant="outlined"
                >
                  -
                </button>
              </v-col>

              <v-col cols="auto" class="pa-0">
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  class="quantity"
                  hide-spin-buttons
                />
              </v-col>

              <v-col cols="auto" class="pa-0">
                <button
                  variant="outlined"
                  class="add-button"
                  :disabled="quantity >= tyre.stockunit"
                  @click="increaseQuantity"
                >
                  +
                </button>
              </v-col>
              <v-col>
                <v-card-subtitle>
                  {{ tyre.stockunit }} pieces available
                </v-card-subtitle>
              </v-col>
            </div>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn @click="addToCart" color="black">ADD TO CART</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <v-divider :thickness="2" class="mt-5 mx-auto" width="1200"></v-divider>

  <v-container max-width="1200">
    <v-card v-if="tyre">
      <v-card-title> Product Description</v-card-title>
      <div class="product-description">
        <ul>
          <li>{{ tyre.details }}</li>
          <li>{{ tyre.details2 }}</li>
          <li>{{ tyre.details3 }}</li>
        </ul>
        <div class="product-spec">
          <span>Load index: {{ tyre.loadindex }}</span>
          <span>Speed index: {{ tyre.speedindex }}</span>
          <span>Tyre Size: {{ tyre.tyresize }}</span>
        </div>
      </div>
    </v-card>
  </v-container>
  <v-divider :thickness="2" class="mt-5 mx-auto" width="1200"></v-divider>
  <v-container max-width="1200">
    <v-card v-if="tyre">
      <v-card-title> Recommendation</v-card-title>
      <v-slide-group class="pa-4" selected-class="bg-primary" show-arrows>
        <v-slide-group-item v-for="item in recommendedTyres" :key="item.itemid">
          <v-card height="400" width="180" class="mx-2 tyre-card">
            <v-img
              src="@/assets/tyre.jpg"
              height="200"
              contain
              class="align-end text-white"
            >
            </v-img>
            <v-card-text>
              <div class="tyre-description">
                {{ item.description }}
              </div>
              <div class="tyre-cartype">{{ item.cartype }}</div>
              <div class="tyre-price">RM {{ item.unitprice.toFixed(2) }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="view-details-button border-thin"
                color="primary"
                @click.stop="goToTyreDetails(item)"
              >
                View Details
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-card>
  </v-container>
</template>
<style scoped>
.product-spec span {
  display: flex;
  margin-left: 18px;
  margin-top: 4px;
}

.product-spec {
  margin-top: 10px;
}

.product-description li {
  margin-top: 7px;
}

.product-description ul {
  padding-left: 20px;
  margin-left: 10px;
}

.product-description {
  padding-bottom: 10px;
}

.quantity {
  display: flex;
}

.quantity input[type="number"]::-webkit-inner-spin-button,
.quantity input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.quantity input,
.quantity button {
  width: 50px;
  padding: 0.5em;
  text-align: center;
  background: white;
  border: 1px solid #aaa;
}

.quantity input {
  border-left: none;
  border-right: none;
}

.tyre-card {
  display: flex;
  flex-direction: column;
}

.v-card-text {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tyre-description {
  font-size: 14px;
  font-weight: bold;
  line-height: 1.2;
  height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
}

.tyre-cartype {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
}

.tyre-price {
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
}

.view-details-button {
  width: 120px;
  height: 36px;
  font-size: 0.875rem;
  text-transform: none;
}
</style>

<script lang="ts">
interface RecommendedTyre {
  itemid: string;
  description: string;
  cartype: string;
  unitprice: number;
}
import axios from "axios";
import { defineComponent, ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    description: String,
  },
  setup() {
    const userStore = useUserStore();
    const tyre = ref();
    const router = useRouter();
    const quantity = ref(1);
    const loading = ref(false);
    const recommendedTyres = ref<RecommendedTyre[]>([]);

    const fetchTyre = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        loading.value = true;
        const itemId = localStorage.getItem("currentTyreItemId");
        if (itemId) {
          const response = await axios.get(
            `${baseUrl}/get_product_by_id?tyre_id=${itemId}`
          );
          tyre.value = response.data;
        }
      } catch (error) {
        console.error("Error fetching tyre:", error);
        // Handle the error appropriately
      } finally {
        loading.value = false;
      }
    };

    const addToCart = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          alert("You need to be logged in to add items to cart.");
          return;
        }
        // get cart quantity for this tyre
        const params = new URLSearchParams({
          accountid: userStore.currentUser.accountid.toString(),
          productid: tyre.value.itemid.toString(),
        });
        const cartResponse = await axios.post(
          `${baseUrl}/get_carts_by_details?${params.toString()}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch the entire cart
        const cartResponse2 = await axios.post(
          `${baseUrl}/get_cart`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Cart Response 2", cartResponse2.data);

        // Count products with IDs starting with "T" in the entire cart
        const tProductCount = cartResponse2.data.filter((item: any) =>
          item.productid.startsWith("T")
        ).length;

        console.log("T Product Count", tProductCount);
        // Check if adding this product would exceed the limit
        if (tProductCount >= 2) {
          alert(
            "You cannot have more than two type of tyre products in your cart."
          );
          return;
        }

        // calculate the total quantity (cart + new quantity)
        const currentCartQuantity =
          cartResponse.data.length > 0 ? cartResponse.data[0].quantity : 0;
        const totalQuantity = currentCartQuantity + quantity.value;

        if (totalQuantity > tyre.value.stockunit) {
          alert(`Cannot add ${quantity.value} more item(s) to cart. 
             You already have ${currentCartQuantity} in your cart. 
             The total would exceed the available stock of ${tyre.value.stockunit}.`);
          return;
        }

        // const newCartItem = {
        //   accountid: userStore.currentUser.accountid,
        //   productid: tyre.value.itemid,
        //   quantity: quantity.value,
        //   unitprice: parseFloat(tyre.value.unitprice),
        //   description: tyre.value.description,
        // };
        // console.log(newCartItem);
        await axios.post(
          `${baseUrl}/add_tyre_to_cart`,
          {
            tyre_id: tyre.value.itemid,
            quantity: quantity.value,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        alert("Items added to cart successfully !");
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    };

    const fetchRecommendedTyres = async () => {
      // const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        // if (tyre.value && tyre.value.brandid) {
        //   const response = await axios.get<RecommendedTyre[]>(
        //     `${baseUrl}/get_random_tyres`
        //   );
        //   recommendedTyres.value = response.data.filter(
        //     (item) => item.itemid !== tyre.value.itemid
        //   );
        // }
      } catch (error) {
        console.error("Error fetching recommended tyres:", error);
      }
    };

    const goToTyreDetails = async (tyre: RecommendedTyre) => {
      try {
        localStorage.setItem("currentTyreItemId", tyre.itemid);
        await router.push(`/${encodeURIComponent(tyre.description)}`);
        window.location.reload();
      } catch (error) {
        console.error("Navigation error:", error);
      }
    };

    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    const increaseQuantity = () => {
      if (quantity.value < tyre.value.stockunit) {
        quantity.value++;
      }
    };

    onMounted(async () => {
      await fetchTyre();
      await fetchRecommendedTyres();
    });

    return {
      tyre,
      quantity,
      loading,
      addToCart,
      decreaseQuantity,
      increaseQuantity,
      recommendedTyres,
      goToTyreDetails,
    };
  },
});
</script>
