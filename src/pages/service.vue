<template>
    <div class="title-page">
      <div class="line"></div>
      <h2 class="no-background text-center">
        <span>SERVICES</span>
      </h2>
      <div class="line"></div>
    </div>
  
    <v-container class="mt-2" max-width="1200">
      <v-row>
        <v-col cols="3">
          <div class="ma-2 pa-0">
            <h3><strong>SERVICES CATEGORIES</strong></h3>
          </div>
          <v-divider thickness="2"></v-divider>
          <v-list class="service-list">
            <v-list-item
              v-for="serviceType in ServiceTypeList"
              :key="serviceType.typeid"
            >
              <v-checkbox
                v-model="selectedServiceTypes"
                :label="serviceType.description"
                :value="serviceType.typeid"
              >
              </v-checkbox>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="9" class="content-column">
          <div class="sticky-container">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  hide-details
                  single-line
                  v-model="searchText"
                  class="search-field"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
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
  .search-field {
    width: 100%;
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
  
  <script>
  import { userStore } from "@/stores/userStore";
  import axios from "axios";
  import ServiceItems from "@/components/ServiceItems.vue";
  
  export default {
    components: {
      ServiceItems,
    },
    data() {
      return {
        ServiceList: [],
        ServiceTypeList: [],
        selectedServiceTypes: [],
        searchText: "",
        currentPage: 1,
        itemsPerPage: 12,
      };
    },
    methods: {
      async fetchServiceTypeList() {
        try {
          const response = await axios.get("http://localhost:8000/servicetype");
          this.ServiceTypeList = response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async fetchServiceList() {
        try {
          const response = await axios.get("http://localhost:8000/service");
  
          const groupedServices = response.data.reduce((acc, service) => {
            if (!acc[service.description]) {
              acc[service.description] = {
                ...service,
                minPrice: service.price,
                maxPrice: service.price,
              };
            } else {
              acc[service.description].minPrice = Math.min(
                acc[service.description].minPrice,
                service.price
              );
              acc[service.description].maxPrice = Math.max(
                acc[service.description].maxPrice,
                service.price
              );
            }
            return acc;
          }, {});
          this.ServiceList = Object.values(groupedServices);
        } catch (error) {
          console.log(error);
        }
      },
    },
    computed: {
      filteredServiceList() {
        return this.ServiceList.filter((service) => {
          const typeMatch =
            this.selectedServiceTypes.length === 0 ||
            this.selectedServiceTypes.includes(service.typeid);
          const searchMatch =
            !this.searchText ||
            service.description
              .toLowerCase()
              .includes(this.searchText.toLowerCase());
          return typeMatch && searchMatch;
        });
      },
      pageCount() {
        return Math.ceil(this.filteredServiceList.length / this.itemsPerPage);
      },
      paginatedServiceList() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredServiceList.slice(start, end);
      },
    },
    mounted() {
      this.fetchServiceList();
      this.fetchServiceTypeList();
    },
  };
  </script>
  