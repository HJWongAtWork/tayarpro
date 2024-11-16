<template>
  <v-container>
    <h1>Test Schedule and Toast-Notification</h1>
    <v-btn @click="showSuccessToast">Show Success Toast</v-btn>
    <v-btn @click="showErrorToast">Show Error Toast</v-btn>
    <v-btn @click="showWarningToast">Show Warning Toast</v-btn>
    <Schedule />
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

export default {
  components: {
    ToastNotification,
  },
  methods: {
    showSuccessToast() {
      this.$refs.toast.addToast("This is a success message!");
    },
    showErrorToast() {
      this.$refs.toast.addToast("This is an error message!", "error", 5000);
    },
    showWarningToast() {
      this.$refs.toast.addToast("This is a warning message!", "warning", 3000);
    },
  },
};
</script>

