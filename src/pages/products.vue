<template>
  <div class="title-page">
    <div class="line"></div>
    <h2 class="no-background text-center">
      <span><strong>TYRES</strong></span>
    </h2>
    <div class="line"></div>
  </div>

  <Loader v-if="loading" height="300px" width="300px" />
  <v-container v-else class="mt-2" max-width="1200" min-width="350">
    <v-row>
      <v-col cols="12" md="3" class="px-5">
        <div class="ma-2 pa-0">
          <h3><strong>PRODUCT CATEGORIES</strong></h3>
        </div>
        <v-divider thickness="2"></v-divider>

        <v-list class="product-list">
          <v-list-group
            v-for="product in ProductsList"
            class="pa-0"
            hide-details
            :key="product.productid"
            :value="false"
          >
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" style="padding: 0px !important">
                <v-checkbox
                  dense
                  v-model="selectedProducts"
                  :label="product.description"
                  :value="product.productid"
                  @change="toggleAllBrands(product.productid)"
                ></v-checkbox>
              </v-list-item>
            </template>
            <v-list-item
              v-for="brand in getBrandsForProducts(product.productid)"
              :key="brand.brandid"
              style="padding: 0px !important"
            >
              <v-checkbox
                dense
                v-model="selectedBrands"
                :label="brand.description"
                :value="brand.brandid"
                hide-details
              ></v-checkbox>
            </v-list-item>
          </v-list-group>
        </v-list>

        <div class="filter-section ma-2">
          <h3><strong>FILTER</strong></h3>
        </div>
        <v-divider thickness="2"></v-divider>
        <v-list class="filter-list">
          <v-list-item
            v-for="(item, index) in filterMenu"
            :key="index"
            style="padding: 0px !important"
          >
            <div class="d-flex align-center">
              <v-checkbox
                v-model="selectedFilter[item.sort]"
                :label="item.title"
                @change="handleSortingChange(item.sort)"
                hide-details
              ></v-checkbox>
              <v-spacer />
              <v-icon>{{ item.icon }}</v-icon>
            </div>
          </v-list-item>
        </v-list>
        <div class="filter-section ma-2">
          <h3><strong>CAR FILTER</strong></h3>
        </div>
        <v-divider thickness="2"></v-divider>
        <v-tooltip
          :disabled="!isCarFilteredDisabled"
          text="Car filter is disabled when there is a tyre or a service in your cart. Please remove them first."
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
                :readonly="isCarFilteredDisabled"
              >
              </v-select>
              <!-- {{ vehicleStore.selectedCar }} -->
            </div>
          </template>
        </v-tooltip>
      </v-col>
      <v-col cols="12" md="9" class="content-column px-10">
        <div ref="searchWrapper" class="search-wrapper">
          <div ref="searchContainer">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              hide-details
              single-line
              v-model="searchText"
              class="search-field"
            ></v-text-field>
          </div>
        </div>
        <div class="search-placeholder"></div>
        <v-row class="mt-9 items-container">
          <TyreItems
            :tyreItems="paginatedFilteredTyreItems"
            @flip-card="flipTyreCard"
          ></TyreItems>
        </v-row>
        <v-row justify="center" class="mt-4">
          <v-pagination
            v-model="page"
            :length="Math.ceil(filteredTyreItems.length / itemsPerPage)"
            :total-visible="7"
          ></v-pagination>
        </v-row>
        <v-row class="mt-9">
          <!-- <Service
              v-if="showService"
              :serviceItems="filteredServiceItems"
              @flip-card="flipServiceCard"
            >
            </Service> -->
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.filter-list {
  width: 100%;
  background-color: transparent;
}
.filter-btn {
  width: 100%;
  justify-content: flex-start;
}
.product-list {
  background-color: transparent;
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
  padding: 10px 0;
  transition: all 0.3s ease;
}

.search-container.sticky {
  position: fixed;
  top: 0;
  left: auto;
  right: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-placeholder {
  height: 56px; /* Adjust this to match your search field height */
}

.search-field {
  width: 100%;
}

.items-container {
  position: relative;
  z-index: 1;
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

<script>
import axios from "axios";
import TyreItems from "../components/TyreItems.vue";
import { useVehicleStore } from "../stores/vehicleStore";
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cartStore";

export default {
  components: {
    TyreItems,
  },
  setup() {
    const vehicleStore = useVehicleStore();
    const { cars, selectedCar } = storeToRefs(vehicleStore);
    const selectedCarId = ref(null);
    const tyreList = ref([]);
    const page = ref(1);
    const itemsPerPage = ref(12);
    const searchText = ref("");
    const selectedProducts = ref([]);
    const selectedBrands = ref([]);
    const selectedFilter = ref({
      priceAsc: false,
      priceDesc: false,
    });

    const cartStore = useCartStore();
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

    const filteredTyreItems = computed(() => {
      let filtered = tyreList.value.filter((tyre) => {
        const productMatch =
          selectedProducts.value.length === 0 ||
          selectedProducts.value.includes(tyre.productid);
        const brandMatch =
          selectedBrands.value.length === 0 ||
          selectedBrands.value.includes(tyre.brandid);
        const searchMatch =
          !searchText.value ||
          tyre.description
            .toLowerCase()
            .includes(searchText.value.toLowerCase());
        const carMatch =
          !selectedCar.value ||
          (selectedCar.value && selectedCar.value.tyresize === tyre.tyresize);
        return productMatch && brandMatch && searchMatch && carMatch;
      });

      if (selectedFilter.value.priceAsc) {
        filtered.sort((a, b) => a.unitprice - b.unitprice);
      } else if (selectedFilter.value.priceDesc) {
        filtered.sort((a, b) => b.unitprice - a.unitprice);
      }
      // If no sorting is selected, return the filtered list without sorting
      return filtered;
    });

    const paginatedFilteredTyreItems = computed(() => {
      const start = (page.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredTyreItems.value.slice(start, end);
    });

    const onCarSelect = (value) => {
      if (!isCarFilteredDisabled.value) {
        selectedCarId.value = value;
        vehicleStore.setSelectedCar(value);
      }
    };

    const fetchTyreList = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get(`${baseUrl}/get_all_tyres`);
        tyreList.value = response.data.map((tyre) => ({
          ...tyre,
          flipped: false,
        }));
      } catch (error) {
        console.error("Error fetching tyre brands:", error);
      }
    };

    // onMounted(() => {
    //   vehicleStore.fetchVehicles();
    //   fetchTyreList();
    // });

    watch(filteredTyreItems, () => {
      page.value = 1;
    });

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
          selectedCarId.value = null;
          vehicleStore.setSelectedCar(null);
        }
      },
      { deep: true }
    );
    const loading = ref(false);
    return {
      selectedCarText,
      selectedCarId,
      carOptionsWithAll,
      onCarSelect,
      page,
      itemsPerPage,
      paginatedFilteredTyreItems,
      filteredTyreItems,
      searchText,
      selectedProducts,
      selectedBrands,
      selectedFilter,
      tyreList,
      fetchTyreList,
      vehicleStore,
      loading,
      isCarFilteredDisabled,
    };
  },
  methods: {
    async fetchAllProduct() {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const ProductsResponse = await axios.get(`${baseUrl}/products`);
        const BrandsResponse = await axios.get(`${baseUrl}/brands`);
        this.ProductsList = ProductsResponse.data;
        this.BrandsList = BrandsResponse.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    getBrandsForProducts(productId) {
      return this.BrandsList.filter((brand) => brand.productid === productId);
    },
    toggleAllBrands(productId) {
      // ... (keep your existing method)
    },
    flipTyreCard(tyre) {
      const index = this.tyreList.findIndex(
        (item) => item.itemid === tyre.itemid
      );
      if (index !== -1) {
        this.tyreList[index].flipped = !this.tyreList[index].flipped;
      }
    },
    handleSortingChange(sort) {
      //console.log("sort: " + sort);
      // console.log( "Before: \n" +
      //   "selectedFilter.priceAsc: " + this.selectedFilter.priceAsc + 
      //   "\nselectedFilter.priceDesc: " + this.selectedFilter.priceDesc
      // );
      // if (sort === "priceAsc") {
      //   if (this.selectedFilter.priceAsc) {
      //     // If it's already selected, unselect it
      //     this.selectedFilter.priceAsc = false;
      //   } else {
      //     // If it's not selected, select it and unselect the other
      //     this.selectedFilter.priceDesc = false;
      //     this.selectedFilter.priceAsc = true;
      //   }
      // } else if (sort === "priceDesc") {
      //   if (this.selectedFilter.priceDesc) {
      //     // If it's already selected, unselect it
      //     this.selectedFilter.priceDesc = false;
      //   } else {
      //     // If it's not selected, select it and unselect the other
      //     this.selectedFilter.priceAsc = false;
      //     this.selectedFilter.priceDesc = true;
      //   }
      // }
      if (sort === "priceAsc") {
          // If it's not selected, select it and unselect the other
          this.selectedFilter.priceDesc = false;
          this.selectedFilter.priceAsc = true;
      } else if (sort === "priceDesc") {
          // If it's not selected, select it and unselect the other
          this.selectedFilter.priceAsc = false;
          this.selectedFilter.priceDesc = true;
      }
    },
    async initializeData() {
      this.loading = true; // Start the loader immediately

      const delay = new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        await Promise.all([
          this.fetchAllProduct(),
          this.fetchTyreList(),
          this.vehicleStore.fetchVehicles(),
          delay,
        ]); // Wait for both the data fetching and delay
      } catch (error) {
        console.error("Error during initialization: ", error);
      } finally {
        this.loading = false; // Hide the loader after the delay and data fetching
      }
    },
  },
  mounted() {
    // this.fetchAllProduct();
    // this.fetchTyreList();
    this.initializeData();
    document.title = "Tyres";
  },
  data() {
    return {
      filterMenu: [
        {
          title: "Price: Low to High",
          icon: "mdi-arrow-up-bold",
          sort: "priceAsc",
        },
        {
          title: "Price: High to Low",
          icon: "mdi-arrow-down-bold",
          sort: "priceDesc",
        },
      ],
      ProductsList: [],
      BrandsList: [],
    };
  },
};
</script>
