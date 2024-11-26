<template>
  <div class="title-page">
    <div class="line"></div>
    <h2 class="no-background text-center">
      <span><strong>SERVICES</strong></span>
    </h2>
    <div class="line"></div>
  </div>

  <Loader v-if="loading" height="300px" width="300px" />
  <v-container v-else class="mt-2" max-width="1200" min-width="350">
    <v-row>
      <v-col cols="12" md="3" class="px-5">
        <div class="ma-2 pa-0">
          <h3><strong>SERVICES CATEGORIES</strong></h3>
        </div>
        <v-divider thickness="2"></v-divider>

        <v-list class="service-list">
          <v-list-item
            class="pa-0"
            v-for="serviceType in ServiceTypeList"
            :key="serviceType.typeid"
          >
            <v-checkbox
              v-model="selectedServiceTypes"
              :label="serviceType.description"
              :value="serviceType.typeid"
              hide-details
            >
            </v-checkbox>
          </v-list-item>
        </v-list>

        <div class="filter-section ma-2">
          <h3><strong>CAR FILTER</strong></h3>
        </div>
        <v-divider thickness="2"></v-divider>
        <v-tooltip
          :disabled="!isCarFilteredDisabled"
          text="Car filter is disabled when there is a tyre in your cart"
        >
          <template v-slot:activator="{ props }">
            <div v-bind="props">
              <v-select
                v-model="selectedCarId"
                :items="carOptionsWithAll"
                item-title="text"
                item-value="value"
                :label="selectedCarText"
                @update:model-value="onCarSelect"
                :disabled="isCarFilteredDisabled"
              >
              </v-select>
            </div>
          </template>
        </v-tooltip>
      </v-col>
      <v-col cols="12" md="9" class="content-column px-10">
        <div ref="searchWrapper" class="search-wrapper">
          <div
            ref="searchContainer"
            :class="['search-container', { sticky: isSticky }]"
          >
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              hide-details
              single-line
              v-model="searchText"
              class="search-field"
            ></v-text-field>
          </div>
        </div>
        <div v-show="isSticky" class="search-placeholder"></div>
        <v-row class="mt-9 items-container">
          <ServiceItems :serviceItems="paginatedServiceList"> </ServiceItems>
        </v-row>
        <v-row justify="center" class="mt-4">
          <v-pagination
            v-model="currentPage"
            :length="pageCount"
            :total-visible="8"
          ></v-pagination>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.items-container {
  position: relative;
  z-index: 1;
}

.sticky-container {
  position: sticky !important;
  top: 0;
  background-color: transparent;
  border-color: none;
  z-index: 1000;
  padding: 10px 0;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.content-column {
  position: relative;
}
.search-wrapper {
  position: relative;
  z-index: 1000;
}
.search-container {
  background-color: white;
  transition: all 0.3s ease;
}
.search-container.sticky {
  position: fixed;
  top: 70px;
  left: auto;
  right: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 999;
}
.search-placeholder {
  height: 56px;
}
.search-field {
  width: 100%;
  margin: 0px;
}

.service-list {
  background-color: transparent;
}
.title-page {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto;
}

.title-page .line {
  height: 3px;
  flex: 1;
  background-color: #000;
}

.title-page h2 {
  padding: 0 2rem;
}
</style>

<script lang="ts">
import servicepic from "@/assets/tyre-install-01.jpg";
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import axios from "axios";
import { useVehicleStore } from "../stores/vehicleStore";
import { useCartStore } from "../stores/cartStore";
import { storeToRefs } from "pinia";

interface ServiceType {
  typeid: number;
  description: string;
}

interface Service {
  serviceid: number;
  description: string;
  typeid: number;
  price: number;
  minPrice?: number;
  maxPrice?: number;
}

export default defineComponent({
  components: {
    // ServiceItems,
  },
  setup() {
    const vehicleStore = useVehicleStore();
    const cartStore = useCartStore();
    const { cars, selectedCar } = storeToRefs(vehicleStore);
    const selectedCarId = ref<number | string | null>(null);

    const ServiceList = ref<Service[]>([]);
    const ServiceTypeList = ref<ServiceType[]>([]);
    const selectedServiceTypes = ref<number[]>([]);
    const servicePic = servicepic;
    const searchText = ref("");
    const currentPage = ref(1);
    const itemsPerPage = 12;

    const searchWrapper = ref(null);
    const searchContainer = ref(null);
    const isSticky = ref(false);

    const isCarFilteredDisabled = computed(() => {
      return cartStore.cartItems.some(
        (item) =>
          item.productid.startsWith("T") || item.productid.startsWith("S")
      );
    });

    const carOptionsWithAll = computed(() => [
      { text: "ALL CAR", value: "all" },
      ...cars.value.map((car) => ({
        text: `${car.carbrand.toUpperCase()} ${car.carmodel.toUpperCase()} ${car.platenumber.toUpperCase()}`,
        value: car.carid,
      })),
    ]);

    const selectedCarText = computed(() => {
      if (selectedCar.value) {
        return `${selectedCar.value.carbrand.toUpperCase()} ${selectedCar.value.carmodel.toUpperCase()} ${selectedCar.value.platenumber.toUpperCase()}`;
      }
      return "Select a car";
    });

    const handleScroll = () => {
      if (searchWrapper.value && searchContainer.value) {
        // ... (keep your existing handleScroll logic) ...
      }
    };

    const fetchServiceTypeList = async () => {
      try {
        const response = await axios.get<ServiceType[]>(
          "https://tayar.pro/get_all_service_types"
        );
        ServiceTypeList.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchServiceList = async () => {
      try {
        const response = await axios.get<Service[]>(
          "https://tayar.pro/get_all_services"
        );

        const groupedServices = response.data.reduce((acc, service) => {
          if (!acc[service.description]) {
            acc[service.description] = {
              ...service,
              minPrice: service.price,
              maxPrice: service.price,
            };
          } else {
            acc[service.description].minPrice = Math.min(
              acc[service.description].minPrice!,
              service.price
            );
            acc[service.description].maxPrice = Math.max(
              acc[service.description].maxPrice!,
              service.price
            );
          }
          return acc;
        }, {} as Record<string, Service>);

        ServiceList.value = Object.values(groupedServices);
      } catch (error) {
        console.log(error);
      }
    };

    const filteredServiceList = computed(() => {
      return ServiceList.value.filter((service) => {
        const typeMatch =
          selectedServiceTypes.value.length === 0 ||
          selectedServiceTypes.value.includes(service.typeid);
        const searchMatch =
          !searchText.value ||
          service.description
            .toLowerCase()
            .includes(searchText.value.toLowerCase());
        return typeMatch && searchMatch;
      });
    });

    const pageCount = computed(() => {
      return Math.ceil(filteredServiceList.value.length / itemsPerPage);
    });

    const paginatedServiceList = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredServiceList.value.slice(start, end);
    });

    const onCarSelect = (value: number | string | null) => {
      if (!isCarFilteredDisabled.value) {
        selectedCarId.value = value;
        vehicleStore.setSelectedCar(value);
      }
    };
    watch(
      () => cartStore.cartItems,
      (newItems) => {
        const tyreinCart = newItems.find((item) =>
          item.productid.startsWith("T")
        );
        const serviceinCart = newItems.find((item) =>
          item.productid.startsWith("S")
        );
        if (tyreinCart && tyreinCart.carid) {
          selectedCarId.value = tyreinCart.carid;
          vehicleStore.setSelectedCar(tyreinCart.carid);
        } else if (serviceinCart && serviceinCart.carid) {
          selectedCarId.value = serviceinCart.carid;
          vehicleStore.setSelectedCar(serviceinCart.carid);
        } else if (!tyreinCart && !serviceinCart) {
          selectedCarId.value = "all";
          vehicleStore.setSelectedCar("all");
        }
      },
      { deep: true }
    );

    onMounted(async () => {
      await initializeData();
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    });

    const loading = ref(true);
    const initializeData = async () => {
      loading.value = true;
      const delay = new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        await Promise.all([
          fetchServiceList(),
          fetchServiceTypeList(),
          vehicleStore.fetchVehicles(),
          delay,
        ]);
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        loading.value = false;
      }
    };

    return {
      searchWrapper,
      searchContainer,
      isSticky,
      ServiceList,
      ServiceTypeList,
      selectedServiceTypes,
      searchText,
      currentPage,
      itemsPerPage,
      filteredServiceList,
      pageCount,
      paginatedServiceList,
      servicePic,
      loading,
      initializeData,
      selectedCarId,
      selectedCarText,
      onCarSelect,
      isCarFilteredDisabled,
      carOptionsWithAll,
    };
  },
});
</script>
