<template>
  <v-container class="py-16" max-width="1200">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold text-center mb-8">
          <v-icon icon="mdi-map-marker-multiple" color="red" size="large" class="ml-2"></v-icon>
          Our Locations
        </h1>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="elevation-3 map-container"> <!-- Added map-container class -->
          <v-card-text class="pa-0 h-100"> <!-- Added h-100 -->
            <div id="map" class="map"></div>

          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="d-flex flex-column"> <!-- Added d-flex and flex-column -->
        <v-slide-y-transition group>
          <v-card v-for="location in locations" :key="location.title" class="mb-4 elevation-3"
            :class="{ 'opening-soon': location.isOpeningSoon }">
            <v-card-item>
              <template v-slot:prepend>
                <v-icon color="red" size="32" icon="mdi-map-marker" class="mr-4"></v-icon>
              </template>
              <v-card-title>
                <div class="d-flex flex-column">
                  <span class="text-h5 font-weight-bold">{{ location.title }}</span>
                  <v-chip v-if="location.isOpeningSoon" color="amber" class="mt-2" size="small">
                    Opening Soon
                  </v-chip>
                </div>
              </v-card-title>
            </v-card-item>

            <v-card-text class="pt-4">
              <v-row no-gutters>
                <v-col cols="12">
                  <div class="d-flex align-center mb-2">
                    <v-icon icon="mdi-office-building-marker" color="grey" class="mr-2"></v-icon>
                    <span class="text-body-1">
                      {{ location.address.unitNO }}, {{ location.address.street }}
                    </span>
                  </div>
                  <div class="d-flex align-center mb-2 ml-8">
                    <span class="text-body-1">
                      {{ location.address.city }},
                      {{ location.address.postcode }}, {{ location.address.state }},
                      {{ location.address.country }}
                    </span>
                  </div>
                </v-col>

                <v-col cols="12" class="mt-4">
                  <div class="d-flex align-center">
                    <v-icon icon="mdi-phone" color="grey" class="mr-2"></v-icon>
                    <span class="text-body-1">{{ location.phone }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-btn variant="text" color="red" :href="`https://www.google.com/maps?q=${location.latt},${location.lng}`"
                target="_blank" prepend-icon="mdi-directions">
                Get Directions
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'

const locations = ref([
  {
    title: 'TayarPro Tiara Villa',
    address: {
      unitNO: '1',
      street: 'Jalan Saya Tak Tahu',
      city: 'Tiara Villa',
      postcode: '58200',
      state: 'Kuala Lumpur',
      country: 'Malaysia'
    },
    latt: 3.1312055293816248,
    lng: 101.67504766711534,
    phone: '0198765432',
    isOpeningSoon: false
  },
  {
    title: 'TayarPro Kuchai Business Park',
    address: {
      unitNO: '38',
      street: 'Jalan lagi Tak Tahu',
      city: 'Kuchai Business Park',
      postcode: '58200',
      state: 'Kuala Lumpur',
      country: 'Malaysia'
    },
    latt: 3.0993248741097914,
    lng: 101.62959694909192,
    phone: '0123456789',
    isOpeningSoon: true
  }
])


onMounted(() => {
  document.title = 'Our Locations'

  const map = L.map('map').setView([locations.value[0].latt, locations.value[0].lng], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  locations.value.forEach(location => {
    const marker = L.marker([location.latt, location.lng]).addTo(map)
    marker.bindPopup(`<b>${location.title}</b>`, {
      closeOnClick: false,
      autoClose: false
    }).openPopup()
  })
})

</script>

<style scoped>
.map-container {
  height: 100%;
  min-height: 400px;
  /* Minimum height for the map */
}

.map {

  height: 100%;
  width: 100%;
  min-height: 400px;
  border-radius: 4px;
}

.opening-soon {
  border: 2px solid #FFC107;
}

/* Add these styles to your existing Leaflet styles */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
  padding: 8px;
}

:deep(.leaflet-popup-content) {
  margin: 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}

/* Make the map column stick to viewport on larger screens */
@media (min-width: 960px) {
  .map-container {
    position: sticky;
    top: 24px;
  }
}
</style>
