<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <v-select v-model="selectedCarStr" :items="formattedCarText" label="Select Car" outlined dense :rules="[rules.required]"></v-select>
    </v-col>
  </v-row>
</template>

<script>
  import { vehicleComposable } from "@/composables/vehicleComposable";
  import axios from "axios";

  export default {
    data() {
      return {
        rules: {
          required: (v) => !!v || "This field is required",
        },
      };
    },
    setup() {
      const { vehicles, selectedCar, fetchVehicles } = vehicleComposable();
      const selectedCarStr = ref("");

      onMounted( async () => {
        await fetchVehicles();
      });

      const plateNumberOfSelectedCar = (str) => {
        let match = str.match(/\(([^)]+)\)/); // Match content inside the parentheses
        if (match) {
          return match[1]; // Return the first captured group (content inside parentheses)
        } else {
          return "";
        }
      };

      return {
        vehicles,
        fetchVehicles,
        selectedCarStr,
        selectedCar,
        plateNumberOfSelectedCar,
      };
    },
    watch: {
      selectedCarStr() {
        let car = null;
        car = this.vehicles.find((vehicle) => vehicle.plateNumber === this.plateNumberOfSelectedCar(this.selectedCarStr));
        this.selectedCar.carid = car.id || null;
        this.selectedCar.platenumber = car.plateNumber;
        this.selectedCar.carbrand = car.brand;
        this.selectedCar.carmodel = car.model;
        this.selectedCar.caryear = car.year;
        this.selectedCar.tyresize = car.tyreSize;
        this.selectedCar.cartype = car.type;
      },
    },
    computed: {
      formattedCarText() {
        const vehicleTexts = this.vehicles.map((vehicle) => `${vehicle.brand} ${vehicle.model} ${vehicle.year} (${vehicle.plateNumber})`);
        return [...vehicleTexts];
      },
    },
  };
</script>

<style scoped>
  .v-select .v-label {
    margin-top: 0;
    margin-left: 10px;
  }
</style>
