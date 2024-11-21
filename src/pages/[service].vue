<template>
  <v-container class="mt-10" max-width="1200">
    <v-card v-if="serviceData.length">
      <v-row>
        <v-col cols="4">
          <v-img
            src="@/assets/change-brake-fluid.webp"
            height="300"
            width="300"
            class="ma-6"
          ></v-img>
        </v-col>
        <v-col cols="8">
          <v-card-title class="text-h4 mt-2 pl-0">{{
            serviceData[0].description
          }}</v-card-title>
          <v-card-subtitle class="pl-0"> Services </v-card-subtitle>
          <v-divider class="my-5"></v-divider>
          <div class="car-types">
            <v-btn
              v-for="service in serviceData"
              :key="service.cartype"
              :value="service.cartype"
              @click="updateSelectedType(service.cartype)"
              :color="selectedType === service.cartype ? 'red' : ''"
            >
              {{ service.cartype }}
            </v-btn>
          </div>
          <div v-if="selectedType" class="price-display">
            <h2 class="text-h5">
              Price: ${{ getPrice(selectedType).toFixed(2) }}
            </h2>
          </div>

          <v-row>
            <v-col cols="12">
              <v-btn @click="addToCart" color="black">ADD TO CART</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";

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
    const serviceData = ref<ServiceItem[]>(props.service);
    const loading = ref(true);
    const selectedType = ref<string | null>(null);

    const carTypes = computed(() => {
      return serviceData.value.map((item) => item.cartype);
    });

    const fetchService = async () => {
      try {
        const serviceDescription = localStorage.getItem("servicedescription");
        if (serviceDescription) {
          const response = await axios.get<ServiceItem[]>(
            `http://localhost:8000/service/${serviceDescription}`
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
      try {
        if (!selectedType.value || serviceData.value.length === 0) return;

        const serviceResponse = await axios.get<ServiceItem>(
          `http://localhost:8000/service/${serviceData.value[0].description}/${selectedType.value}`
        );

        const service = serviceResponse.data;
        console.log(service);

        const newCartItem = {
          accountid: userStore.currentUser.accountid,
          productid: service.serviceid,
          // Add other necessary fields here
        };

        // TODO: Implement the actual cart addition logic
        console.log("Adding to cart:", newCartItem);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };

    const getPrice = (type: string): number => {
      const service = serviceData.value.find((item) => item.cartype === type);
      return service ? service.price : 0;
    };

    const updateSelectedType = (type: string) => {
      selectedType.value = type;
    };

    onMounted(() => {
      if (props.service.length === 0) {
        fetchService();
      } else {
        loading.value = false;
      }
    });

    return {
      serviceData,
      loading,
      selectedType,
      carTypes,
      addToCart,
      getPrice,
      updateSelectedType,
    };
  },
});
</script>
