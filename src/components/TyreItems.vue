<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="3" v-for="tyre in tyreItems" :key="tyre.tyreid">
      <v-card
        height="400"
        class="container"
        :class="{ flipped: tyre.flipped }"
        @click="$emit('flip-card', tyre)"
      >
        <div class="card">
          <div class="front">
            <div class="image-container">
              <v-img height="200" src="../assets/tyre.jpg" contain></v-img>
            </div>
            <div class="content-container">
              <div class="description">{{ tyre.description }}</div>
              <div class="details">
                <span>RM {{ tyre.unitprice.toFixed(2) }}</span>
                <span class="ml-2 car-type">{{ tyre.cartype }}</span>
              </div>
              <v-spacer></v-spacer>
              <v-card-actions align="center" justify="center" class="text-center bg-white">
                <div class="button-container ma-auto">
                  <v-btn
                    class="border-thin view-details-button"
                    color="#FF3131"
                    @click.stop="goToTyreDetails(tyre)"
                    >View Details</v-btn
                  >
                </div>
              </v-card-actions>
            </div>
          </div>
          <div class="back">
            <div class="info-grid">
              <div class="label">Car Type:</div>
              <div class="value">{{ tyre.cartype }}</div>

              <div class="label">Size:</div>
              <div class="value">{{ tyre.tyresize }}</div>

              <div class="label">Speed Index:</div>
              <div class="value">{{ tyre.speedindex }}</div>

              <div class="label">Load Index:</div>
              <div class="value">{{ tyre.loadindex }}</div>
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.v-row {
  position: relative;
  z-index: 1;
}
.container {
  perspective: 800px;
}
/* .button-container {
  position: absolute;
  bottom: 16px;
  left: 16px;
  size: 20px;
} */
.car-type {
  text-align: right;
}
.view-details-button {
  width: 120px;
  height: 40px;
  font-size: 0.875rem;
  text-transform: none;
}
.card {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.container.flipped .card {
  transform: rotateY(180deg);
}

.back,
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

.image-container {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.content-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: relative;
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

.details {
  font-size: 0.8rem;
  display: flex;

  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.back {
  transform: rotateY(180deg);
  background-color: rgba(240, 240, 240, 0.9);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/tyre.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  z-index: -1;
}

.info-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 16px;
  align-items: center;
  width: 100%;
}

.label {
  font-weight: bold;
  text-align: right;
}

.value {
  text-align: left;
}
</style>

<script>
export default {
  props: {
    tyreItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 12,
    };
  },
  watch: {
    tyreItems() {
      this.page = 1;
    },
  },
  computed: {
    paginatedTyreList() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.tyreItems.slice(start, end);
    },
  },
  emits: ["flip-card"],
  methods: {
    goToTyreDetails(tyre) {
      localStorage.setItem("currentTyreItemId", tyre.itemid);
      this.$router.push({
        name: "SpecificTyre",
        params: { description: tyre.description }, // Only pass description in the URL
      });
    },
  },
};
</script>
