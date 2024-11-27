<template>
  <loader v-if="loading" height="300px" width="300px" />
  <v-container v-else class="mt-10" max-width="1200">
    <v-card v-if="serviceData.length" align="center">
      <v-row>
        <v-col cols="12" sm="4">
          <v-img
            src="@/assets/change-brake-fluid.webp"
            height="300"
            width="300"
            class="ma-6"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="8">
          <v-card-title class="text-h4 mt-2 pl-0 text-wrap">{{
            serviceData[0].description
          }}</v-card-title>
          <v-card-subtitle class="pl-0 ma-auto"> Services </v-card-subtitle>
          <v-divider class="my-5"></v-divider>
          <div class="car-types">
            <v-btn
              v-for="service in serviceData"
              class="mr-4"
              :key="service.cartype"
              :value="service.cartype"
              @click="updateSelectedType(service.cartype)"
              :color="selectedType === service.cartype ? 'red' : ''"
            >
              {{ service.cartype }}
            </v-btn>
          </div>
          <div v-if="selectedType" class="price-display">
            <h2 class="text-h5">RM {{ getPrice(selectedType).toFixed(2) }}</h2>
          </div>

          <v-row>
            <v-col cols="12" class="mb-5">
              <v-btn @click="addToCart" color="black" class="add-to-cart-button"
                >ADD TO CART</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

  <ToastNotification
    ref="toast"
    :default-color="'info'"
    :default-timeout="2000"
    :max-toasts="5"
  />
</template>

<style scoped>
.price-display {
  margin-top: 16px;
}
.add-to-cart-button {
  margin-top: 16px;
}
</style>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";
import { useRouter } from "vue-router";
// import { ro } from "vuetify/locale";

interface ServiceItem {
  serviceid: number;
  description: string;
  cartype: string;
  price: number;
}

export default defineComponent({
  name: "ServiceDetails",
  props: {
    service: {
      type: Array as () => ServiceItem[],
      default: () => [],
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const router = useRouter();
    const serviceData = ref<ServiceItem[]>(props.service);
    const loading = ref(true);
    const selectedType = ref<string | null>(null);
    const toast = ref(null);

    const carTypes = computed(() => {
      return serviceData.value.map((item) => item.cartype);
    });

    const fetchService = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const serviceDescription = localStorage.getItem("serviceDescription");
        console.log(serviceDescription);
        if (serviceDescription) {
          const response = await axios.get<ServiceItem[]>(
            `${baseUrl}/service?description=${serviceDescription}`
          );
          serviceData.value = response.data;
          if (serviceData.value.length > 0) {
            selectedType.value = serviceData.value[0].cartype;
          }
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        loading.value = false;
      }
    };

    const addToCart = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        if (!selectedType.value || serviceData.value.length === 0) {
          return;
        }
        // const serviceResponse = await axios.get<ServiceItem>(
        //   `https://localhost:8000/service/${serviceData.value[0].description}/${selectedType.value}`
        // );

        const service = serviceData.value.find(
          (item) => item.cartype === selectedType.value
        );
        if (!service) {
          console.error("Selected service not found");
          return;
        }

        const token = localStorage.getItem("jwt");
        if (!token) {
          console.log("No authentication token found");
          router.push("/login");
          return;
        }

        // const service = serviceResponse.data;
        // console.log(service);

        const newCartItem = {
          accountid: userStore.currentUser.accountid,
          productid: service.serviceid,
          quantity: 1,
          unitprice: service.price,
          description: service.description,
        };
        // console.log(newCartItem);

        await axios.post(
          `${baseUrl}/add_service_to_cart`,
          {
            service_id: service.serviceid,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //alert("Services added to cart successfully!");
        toast.value.addToast("Service added to the cart successfully!", 2000, 'red');
        console.log("Adding to cart:", newCartItem);
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        await initializeData();
      }
    };

    const getPrice = (type: string): number => {
      const service = serviceData.value.find((item) => item.cartype === type);
      return service ? service.price : 0;
    };

    const updateSelectedType = (type: string) => {
      selectedType.value = type;
    };

    onMounted(async () => {
      if (props.service.length === 0) {
        await initializeData();
      } else {
        loading.value = false;
      }
    });

    //const loading = ref(true);
    const initializeData = async () => {
      loading.value = true;
      const delay = new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        await Promise.all([fetchService(), delay]);
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        loading.value = false;
      }
    };

    return {
      serviceData,
      loading,
      selectedType,
      carTypes,
      addToCart,
      getPrice,
      updateSelectedType,
      initializeData,
      toast,
    };
  },
});
</script>
