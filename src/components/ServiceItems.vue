<template>
  <v-row>
    <v-col cols="12"
      sm="6"
      md="4"
      lg="3" v-for="service in serviceItems" :key="service.serviceid">
      <v-card height="400" class="container">
        <div class="card">
          <div class="front">
            <div class="image-container">
              <v-img
                height="200"
                src="@/assets/change-brake-fluid.webp"
                cover
              ></v-img>
            </div>
            <div class="content-container">
              <div class="description text-wrap">{{ service.description }}</div>
              <div class="details">
                <span v-if="service.minPrice === service.maxPrice">
                  RM {{ service.minPrice.toFixed(2) }}
                </span>
                <span v-else>
                  RM {{ service.minPrice.toFixed(2) }} - RM
                  {{ service.maxPrice.toFixed(2) }}
                </span>
              </div>
              <div class="button-container ma-auto">
                <v-btn
                  class="border-thin view-details-button"
                  @click.stop="goToServiceDetails(service)"
                  >View Details</v-btn
                >
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.v-pagination {
  justify-content: center;
}
.card {
  width: 100%;
  height: 100%;
  position: relative;
}
.front {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
}

.front {
  z-index: 2;
  background-color: white;
}
.description {
  font-size: 1.2rem;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
}
/* .button-container {
  position: absolute;
  bottom: 16px;
  left: 16px;
  size: 20px;
} */
.view-details-button {
  background-color: white;
  color: red;
  width: 120px;
  height: 40px;
  font-size: 0.875rem;
  text-transform: none;
}
.content-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: relative;
}
</style>

<script>
export default {
  props: {
    serviceItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  methods: {
    goToServiceDetails(service) {
      localStorage.setItem("serviceDescription", service.description);
      this.$router.push({
        name: "services-description",
        params: { description: service.description },
      });
    },
  },
};
</script>
