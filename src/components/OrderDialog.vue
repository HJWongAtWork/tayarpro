<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title>Order Summary</v-card-title>
      <v-card-text></v-card-text>
      <!-- <v-btn @click="$emit('cancel')">Close</v-btn> -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: false,
  },
  data() {
    return {
      dialog: this.value,
    };
  },
};
</script>
