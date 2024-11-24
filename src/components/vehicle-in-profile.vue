<template>
  <Loader v-if="loading" height="300px" width="300px"/>
  <v-card v-else class="pa-4">
    <v-col cols="12" sm="12" md="12">
      <h1>Vehicles</h1>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <v-btn class="save-btn" @click="handleVehicleDialog(newCar, 'add', null)">
        + Add Vehicle
      </v-btn>
    </v-col>
    <v-col v-for="car in displayedVehicles" :key="car.id" cols="12" sm="12" md="12">
      <v-card class="pa-4">
        <v-card-title>{{ car.plateNumber }}</v-card-title>
        <v-card-subtitle>{{ car.brand }} {{ car.model }} ({{ car.year }})</v-card-subtitle>
        <v-card-actions class="d-flex justify-end" style="padding-top: 20px;">
          <v-icon class="small-icon text-green glow-on-hover" style="margin-right: 20px;" @click="handleVehicleDialog(car, 'edit', car.id)">
            mdi-pencil
          </v-icon>
          <v-icon class="small-icon text-red glow-on-hover" @click="handleVehicleDialog(car, 'delete', car.id)">mdi-delete</v-icon>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col v-if="vehicles.length > 2" cols="12" class="text-center mt-4">
      <v-btn text @click="this.showAll = !this.showAll">
        {{ showAll ? 'Hide some...' : 'Show more...' }}
      </v-btn>
    </v-col>
  </v-card>

  <v-dialog v-model="vehicleDialog" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">
        <span class="headline">
          <span v-if="vehicleDialogAction === 'add'">Add Vehicle</span>
          <span v-if="vehicleDialogAction === 'edit'">Edit Vehicle</span>
          <span v-if="vehicleDialogAction === 'delete'">Delete Vehicle</span>
        </span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValidAddVehicle">
          <v-text-field label="Plate Number" v-model="plateNumberInput" :rules="[rules.required]" required :disabled="vehicleDialogAction === 'delete' || vehicleDialogAction === 'edit'"></v-text-field>
          <v-select v-model="brandInput" :items="brandSelections" label="Select Brand" outlined dense :rules="[rules.required]" required :disabled="vehicleDialogAction === 'delete'"></v-select>
          <v-select v-model="modelInput" :items="modelSelections" label="Select Model" outlined dense :rules="[rules.required]" required :disabled="vehicleDialogAction === 'delete' || brandInput === ''"></v-select>
          <v-select v-model="yearInput" :items="yearSelections" label="Select Car Year" outlined dense :rules="[rules.required, rules.year]" required :disabled="vehicleDialogAction === 'delete'"></v-select>
          <v-select v-model="tyreSizeInput" :items="tyreSizeSelections" label="Select Tyre Size" outlined dense :rules="[rules.required]" required :disabled="vehicleDialogAction === 'delete'"></v-select>
          <v-select v-model="typeInput" :items="typeSelections" label="Select Car Type" outlined dense :rules="[rules.required]" required :disabled="vehicleDialogAction === 'delete'"></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="vehicleDialog = false">Cancel</v-btn>
        <v-btn v-if="vehicleDialogAction === 'add'" class="save-btn" style="margin-right: 0px;" :disabled="!isValidAddVehicle" @click="handleAddVehicleBtn">Add</v-btn>
        <v-btn v-if="vehicleDialogAction === 'edit'" class="save-btn" style="margin-right: 0px;" :disabled="!isValidAddVehicle" @click="handleEditVehicleBtn">Save</v-btn>
        <v-btn v-if="vehicleDialogAction === 'delete'" class="save-btn" style="margin-right: 0px;" @click="handleDeleteVehicleBtn">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { onMounted } from "vue";
  import { vehicleComposable } from "@/composables/vehicleComposable";
  import axios from "axios";

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  export default {
    data() {
      return {
        rules: {
          required: (v) => !!v || "This field is required", // Required rule
          year: (value) => (value >= 1900 && value <= new Date().getFullYear()) || "Invalid year. Year must be more than 1900.",
        },
        showAll: false,
        vehicleDialog: false,
        isValidAddVehicle: false,
        vehicleDialogAction: "",
        selectedVehicleId: null,
        brandSelections: [],
        modelSelections: [],
        //yearSelections: [],
        tyreSizeSelections: [],
        typeSelections: ["Unsure", "SUV", "Passenger"],
        loading: false
      };
    },
    setup() {
      const { vehicles, plateNumberInput, brandInput, modelInput, yearInput, tyreSizeInput, typeInput, fetchVehicles, getLatestVehicleId, addVehicle, editVehicle, deleteVehicle } = vehicleComposable();

      // onMounted(async () => {
      //   loading = true;
      //   await fetchVehicles();
      // });

      return {
        vehicles,
        plateNumberInput,
        brandInput,
        modelInput,
        yearInput,
        tyreSizeInput,
        typeInput,
        fetchVehicles,
        getLatestVehicleId,
        addVehicle,
        editVehicle,
        deleteVehicle,
      };
    },
    methods: {
      async initializeData() {
        this.loading = true; // Start the loader immediately

        const delay = new Promise((resolve) => setTimeout(resolve, 1000)); 
        try {
          await Promise.all([
            this.fetchVehicles(),
            this.getBrandSelections(),
            this.getTyreSizeSelections(), 
            delay
          ]); // Wait for both the data fetching and delay
        } catch (error) {
          console.error("Error during initialization: ", error);
        } finally {
          this.loading = false; // Hide the loader after the delay and data fetching
        }
      },
      handleVehicleDialog(car, action, id) {
        this.vehicleDialog = true;
        this.vehicleDialogAction = action;
        this.selectedVehicleId = id;
        if (action === "add") {
          this.plateNumberInput = "";
          this.brandInput = "";
          this.modelInput = "";
          this.yearInput = "";
          this.tyreSizeInput = "";
          this.typeInput = "";
        } else {
          this.plateNumberInput = car.plateNumber;
          this.brandInput = car.brand;
          this.modelInput = car.model;
          this.yearInput = car.year;
          this.tyreSizeInput = car.tyreSize;
          this.typeInput = car.type;
        }
      },
      async handleAddVehicleBtn() {
        if (this.isValidAddVehicle) {
          this.addVehicle();
          this.vehicleDialog = false;
          this.vehicleDialogAction = "";
          await this.initializeData();
        }
      },
      async handleEditVehicleBtn() {
        if (this.isValidAddVehicle) {
          this.editVehicle(this.selectedVehicleId);
          this.vehicleDialog = false;
          this.vehicleDialogAction = "";
          this.selectedVehicleId = null;
          await this.initializeData();
        }
      },
      async handleDeleteVehicleBtn() {
        this.deleteVehicle(this.selectedVehicleId);
        this.vehicleDialog = false;
        this.vehicleDialogAction = "";
        this.selectedVehicleId = null;
        await this.initializeData();
      },
      async getBrandSelections() {
        try {
          const response = await axios.get(`${baseUrl}/car_brands`, {
            headers: {
              Accept: "application/json",
            },
          });
          this.brandSelections = response.data.car_brands;
          this.brandSelections = this.brandSelections.map((brand) => brand.toUpperCase());
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios-specific error
            console.error("Axios error:", error.message);
            console.error("Response data:", error.response?.data); // Log the server's response if available
            console.error("Status code:", error.response?.status); // Log HTTP status code
          } else {
            // Non-Axios error
            console.error("Unknown error occurred:", error);
          }
        } 
      },
      async getModelSelections() {
        try {
          const response = await axios.get(`${baseUrl}/car_models/${this.brandInput.toLowerCase()}`, {
            headers: {
              Accept: "application/json",
            },
          });
          this.modelSelections = response.data.car_models;
          this.modelSelections = this.modelSelections.map((brand) => brand.toUpperCase());
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios-specific error
            console.error("Axios error:", error.message);
            console.error("Response data:", error.response?.data); // Log the server's response if available
            console.error("Status code:", error.response?.status); // Log HTTP status code
          } else {
            // Non-Axios error
            console.error("Unknown error occurred:", error);
          }
        }
      },
      async getTyreSizeSelections() {
        try {
          const response = await axios.get(`${baseUrl}/tyre_sizes`, {
            headers: {
              Accept: "application/json",
            },
          });
          this.tyreSizeSelections = response.data.tyre_sizes;
          this.tyreSizeSelections = ["Unsure", ...this.tyreSizeSelections];
          //this.tyreSizeSelections = this.tyreSizeSelections.map((brand) => brand.toUpperCase());
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios-specific error
            console.error("Axios error:", error.message);
            console.error("Response data:", error.response?.data); // Log the server's response if available
            console.error("Status code:", error.response?.status); // Log HTTP status code
          } else {
            // Non-Axios error
            console.error("Unknown error occurred:", error);
          }
        }
      },
    },
    mounted() {
      (async () => {
        await this.initializeData();
      })();
    },
    watch: {
      brandInput() {
        this.getModelSelections();
      },
    },
    computed: {
      displayedVehicles() {
        return this.showAll ? this.vehicles : this.vehicles.slice(0, 2);
      },
      yearSelections() {
        const startYear = 1990;
        const currentYear = new Date().getFullYear();
        const yearSelections = [];
        for (let year = startYear; year <= currentYear; year++) {
          yearSelections.push(year);
        }
        return yearSelections;
      },
    },
  };
</script>

<style scoped>
  .save-btn {
    margin-right: 50px;
    background-color: red;
    color: white;
  }

  .small-icon {
    font-size: 1.25rem; /* Adjust the size to 50% smaller (about 1.25rem) */
  }

  .glow-on-hover:hover {
    box-shadow: 0 0 15px grey, 0 0 30px grey;
  }
</style>
