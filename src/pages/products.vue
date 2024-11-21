<template>
  <div class="title-page">
    <div class="line"></div>
    <h2 class="no-background text-center">
      <span><strong>TYRES</strong></span>
    </h2>
    <div class="line"></div>
  </div>

  <v-container class="mt-2" max-width="1200" min-width="350">
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
          <TyreItems
            :tyreItems="paginatedTyreItems"
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
import { ref, onMounted, onUnmounted } from "vue";

export default {
  components: {
    TyreItems,
  },
  setup() {
    const searchWrapper = ref(null);
    const searchContainer = ref(null);
    const isSticky = ref(false);

    const handleScroll = () => {
      if (searchWrapper.value && searchContainer.value) {
        const rect = searchWrapper.value.getBoundingClientRect();
        isSticky.value = rect.top <= 0;
        if (isSticky.value) {
          searchContainer.value.style.width = `${rect.width}px`;
        } else {
          searchContainer.value.style.width = "100%";
        }
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    });

    return {
      searchWrapper,
      searchContainer,
      isSticky,
    };
  },
  watch: {
    selectedFilter() {
      this.sortTyreItems();
    },
  },

  mounted() {
    this.fetchTyreList();
    this.fetchAllProduct();
    document.title = "Tyres";
  },
  data() {
    return {
      searchText: "", // added here
      page: 1,
      itemsPerPage: 12,
      filterMenu: [
        {
          title: "Price Ascending",
          icon: "mdi-arrow-up-bold",
          sort: "priceAsc",
        },
        {
          title: "Price Descending",
          icon: "mdi-arrow-down-bold",
          sort: "priceDesc",
        },
      ],
      selectedFilter: {
        priceAsc: false,
        priceDesc: false,
      },
      tyreList: [],
      // products List
      ProductsList: [],
      // brands List
      BrandsList: [],
      selectedProducts: [],
      selectedBrands: [],
    };
  },

  methods: {
    // for tyre
    toggleAllTyreItems() {
      if (this.isTyreChecked) {
        this.selectedTyreBrands = this.TyreBrandList.map(
          (brand) => brand.value
        );
      } else {
        this.selectedTyreBrands = [];
      }
    },

    //for service
    toggleAllServiceItems() {
      if (this.isServiceChecked) {
        this.selectedService = this.ServiceTypeList.map(
          (service) => service.value
        );
      } else {
        this.selectedService = [];
      }
    },

    handleSortingChange(sort) {
      if (sort === "priceAsc") {
        this.selectedFilter.priceDesc = false;
      } else if (sort === "priceDesc") {
        this.selectedFilter.priceAsc = false;
      }
      this.sortTyreItems();
    },

    sortTyreItems() {
      if (this.selectedFilter.priceAsc) {
        this.tyreList.sort((a, b) => a.unitprice - b.unitprice);
      } else if (this.selectedFilter.priceDesc) {
        this.tyreList.sort((a, b) => b.unitprice - a.unitprice);
      }
    },

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
      const isProductSelected = this.selectedProducts.includes(productId);
      const brandsForProduct = this.getBrandsForProducts(productId);
      if (isProductSelected) {
        brandsForProduct.forEach((brand) => {
          if (!this.selectedBrands.includes(brand.brandid)) {
            this.selectedBrands.push(brand.brandid);
          }
        });
      } else {
        this.selectedBrands = this.selectedBrands.filter(
          (brandId) =>
            !brandsForProduct.some((brand) => brand.brandid === brandId)
        );
      }
    },
    async fetchTyreList() {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get(`${baseUrl}/get_all_tyres`);
        this.tyreList = response.data.map((tyre) => ({
          ...tyre,
          flipped: false,
        }));
      } catch (error) {
        console.error("Error fetching tyre brands:", error);
      }
    },
    flipTyreCard(tyre) {
      const index = this.tyreList.findIndex(
        (item) => item.itemid === tyre.itemid
      );
      if (index !== -1) {
        this.tyreList[index].flipped = !this.tyreList[index].flipped;
      }
    },
  },
  computed: {
    paginatedTyreItems() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTyreItems.slice(start, end);
    },
    filteredTyreItems() {
      let filtered = this.tyreList.filter((tyre) => {
        const productMatch =
          this.selectedProducts.length === 0 ||
          this.selectedProducts.includes(tyre.productid);
        const brandMatch =
          this.selectedBrands.length === 0 ||
          this.selectedBrands.includes(tyre.brandid);
        const searchMatch =
          !this.searchText ||
          tyre.description
            .toLowerCase()
            .includes(this.searchText.toLowerCase());

        return productMatch && brandMatch && searchMatch;
      });

      // Apply sorting
      if (this.selectedFilter.priceAsc) {
        filtered.sort((a, b) => a.unitprice - b.unitprice);
      } else if (this.selectedFilter.priceDesc) {
        filtered.sort((a, b) => b.unitprice - a.unitprice);
      }

      return filtered;
    },
  },
};
</script>
