<template>
  <v-row>
    <v-col cols="3" v-for="service in serviceItems" :key="service.serviceid">
      <v-card
        height="400"
        class="container"
        :class="{ flipped: service.flipped }"
        @click="$emit('flip-card', service)"
      >
        <div class="card">
          <div class="front">
            <v-img
              height="200"
              :src="service.image"
              contain
              class="border-lg"
            ></v-img>
            <div class="pl-3 mt-2" style="font-size: 1.2rem">
              <span>{{ service.description }}</span>
            </div>
            <v-card-text>
              <div>RM {{ service.price.toFixed(2) }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="border-thin"
                color="primary"
                @click.stop="goToServiceDetails(service.serviceid)"
                >View Details</v-btn
              >
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    serviceItems: {
      type: Array,
      required: true,
    },
  },
};
</script>
