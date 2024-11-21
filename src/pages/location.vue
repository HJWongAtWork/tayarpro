<template>
  <v-container max-width="1200">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-4">Our Locations</h1>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div id="map" class="map"></div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card v-for="location in locations" :key="location.title" class="pa-4 custom-card" style="margin: 15px;">
          <v-card-title class="d-flex">
            <v-icon color="black" size="40" icon="mdi-map-marker"/>
            <h3>{{ location.title }}</h3>
          </v-card-title>
          <v-card-text>
            <p class="d-flex">
              {{ location.address.unitNO }}, {{ location.address.street }},
            </p>
            <p>
              {{ location.address.city }}, 
            </p>
            <p>
              {{ location.address.postcode }}, {{ location.address.state }},
            </p>
            <p>
              {{ location.address.country }}  
            </p>
            <br>
            <p>Shop Tel. No.:{{ location.phone }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import L from 'leaflet';

export default {
  data() {
    return {
      locations: [
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
          phone: '0198765432'
        },
        {
          title: 'TayarPro Kuchai Business Park (Opening Soon)',
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
          phone: '0123456789'
        }
      ]
    };
  },
  mounted() {
    document.title = 'Our Locations';

    // Initialize Leaflet map 2.9584062308969363, 101.79832500174417
    const map = L.map('map').setView([this.locations[0].latt, this.locations[0].lng], 13);
    // const map = L.map('map').setView([3.1312055293816248, 101.67504766711534], 14);

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker1 = L.marker([this.locations[0].latt, this.locations[0].lng]).addTo(map);
    let marker2 = L.marker([this.locations[1].latt, this.locations[1].lng]).addTo(map);

    marker1.bindPopup("<b>TayarPro Tiara Villa</b>", {closeOnClick: false, autoClose: false}).openPopup();
    marker2.bindPopup("<b>TayarPro Kuchai Business Park</b>", {closeOnClick: false, autoClose: false}).openPopup();

  }
};
</script>

<style>
.map {
  height: 0; 
  width: 100%; 
  padding-bottom: 100%; 
  position: relative; 
  object-fit: cover;
}

.custom-card .v-card-title {
  white-space: normal; /* Allow text to wrap */
  word-wrap: break-word; /* Break words if necessary */
  overflow-wrap: break-word; /* Prevent overflow for long words */
}
</style>