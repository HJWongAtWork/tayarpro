<template>
  <v-container>
    <h1>Test add car in schedule</h1>
    <AddCarInSchedule />
    <h1>Test schedule</h1>
    <Schedule />
    <h1>Test vehicle in profile</h1>
    <VehicleInProfile />
    <h1>Test cars</h1>
    {{ cars }}
    <h1>Test loader</h1>
    <Loader 
      height="300px" width="300px"
    />
    <Loader />
    <h1>Test Toast-Notification</h1>
    <v-btn @click="showSuccessToast">Show Success Toast</v-btn>
    <v-btn @click="showErrorToast">Show Error Toast</v-btn>
    <v-btn @click="showWarningToast">Show Warning Toast</v-btn>
  </v-container>
  <ToastNotification
    ref="toast"
    :default-color="'info'"
    :default-timeout="-1"
    :max-toasts="5"
  />
</template>

<script>
import ToastNotification from "@/components/ToastNotification.vue"; 
import { vehicleComposable } from '@/composables/vehicleComposable';

export default {
  setup() {
    const {
        cars,
        fetchVehicles,
      } = vehicleComposable();

    return {
      cars,
      fetchVehicles,
    };
  },
  mounted() {
    document.title = "Amar Test Page";
  },
  components: {
    ToastNotification,
  },
  methods: {
    showSuccessToast() {
      this.$refs.toast.addToast("This is a success message!");
    },
    showErrorToast() {
      this.$refs.toast.addToast("This is an error message!", 2000);
    },
    showWarningToast() {
      this.$refs.toast.addToast("This is a warning message!", 3000, "warning");
    },
  },
};
</script>

