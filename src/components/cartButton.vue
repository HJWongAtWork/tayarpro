<template>
  <v-btn
    :style="{ height, width }"
    :density="density"
    :elevation="elevation"
    :color="color"
    :min-width="min"
    :v-bind="attrs"
    @click="$emit('click', $event)"
  >
    <v-icon v-if="icon" :color="iconColor">{{ icon }}</v-icon>
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "15px",
    },
    width: {
      type: String,
      default: "10px ",
    },
    density: {
      type: String,
      default: "compact",
    },
    elevation: {
      type: String,
      default: "4",
    },
    color: {
      type: String,
      default: "white",
    },
    attrs: {
      type: Object,
      default: () => ({}),
      /*************  ✨ Codeium Command 🌟  *************/
    },
    min: {
      type: String,
      default: "24px",
    },
    /******  b069c9a1-6aa0-4a7d-8e6f-80c8597c5e61  *******/
    icon: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: "#FF6875",
    },
  },
};
</script>

<style scoped>
/* You can add specific styles here if needed */
</style>
